import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { DateTime, Interval } from "luxon";

import { addHeaderResource } from "../resources/utils/resources";
import { filterTasks, TaskData, validateTasks } from "../tasks/utils/tasks";
import { DEFAULT_GRID_COLUMN_WIDTH, DEFAULT_GRID_ROW_HEIGHT, MINIMUM_GRID_ROW_HEIGHT } from "../utils/dimensions";
import { logDebug, logWarn } from "../utils/logger";
import { getValidTime, InternalTimeRange } from "../utils/time";
import { getIntervalFromInternalTimeRange } from "../utils/time";
import { getResolutionData, Resolution, ResolutionData } from "../utils/time-resolution";
import { TimelineInput } from "../utils/timeline";
import { executeWithPerfomanceCheck } from "../utils/utils";
import { KonvaTimelineError } from "..";

declare global {
  interface Window {
    __MELFORE_KONVA_TIMELINE_DEBUG__?: boolean;
  }
}

type TimelineThemeMode = "dark" | "light";

export type TimelineProviderProps = PropsWithChildren<TimelineInput> & {
  /**
   * Enables debug logging in browser console
   */
  debug?: boolean;
  /**
   * Enables drag&drop operation on tasks
   */
  enableDrag?: boolean;
  /**
   * Enables resize operation on tasks
   */
  enableResize?: boolean;
  /**
   * Label to display in header column
   */
  headerLabel?: string;
  /**
   * Initial date time to scroll to
   */
  initialDateTime?: number | string;
  /**
   * Callback invoked when errors are thrown
   */
  onErrors?: (errors: KonvaTimelineError[]) => void;
  /**
   * Event handler for task click
   */
  onTaskClick?: (task: TaskData) => void;
  /**
   * Event handler for task change event (drag and resize)
   */
  onTaskChange?: (task: TaskData) => void;
  /**
   * Timezone used for display (defaults to UTC)
   */
  timezone?: string;
  /**
   * Theme color in use
   */
  theme?: TimelineThemeMode;
};

type TimelineTheme = {
  color: string;
};

type TimelineContextType = Required<
  Pick<TimelineInput, "columnWidth" | "displayTasksLabel" | "hideResources" | "resources" | "rowHeight">
> & {
  blocksOffset: number;
  dragResolution: ResolutionData;
  drawRange: InternalTimeRange;
  enableDrag: boolean;
  enableResize: boolean;
  headerLabel?: string;
  initialDateTime?: number;
  interval: Interval;
  onErrors?: (errors: KonvaTimelineError[]) => void;
  onTaskClick?: (task: TaskData) => void;
  onTaskChange?: (task: TaskData) => void;
  resolution: ResolutionData;
  resolutionKey: Resolution;
  resourcesContentHeight: number;
  setDrawRange: (range: InternalTimeRange) => void;
  tasks: TaskData<InternalTimeRange>[];
  theme: TimelineTheme;
  timeBlocks: Interval[];
  timezone: string;
  visibleTimeBlocks: Interval[];
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

// TODO#lb: this should be another data type, specific to drawing
const DEFAULT_DRAW_RANGE: InternalTimeRange = { start: 0, end: 0 };

const TIME_BLOCKS_PRELOAD = 5;

export const TimelineProvider = ({
  children,
  columnWidth: externalColumnWidth,
  debug = false,
  displayTasksLabel = false,
  dragResolution: externalDragResolution,
  enableDrag = true,
  enableResize = true,
  headerLabel,
  hideResources = false,
  initialDateTime: externalInitialDateTime,
  onErrors,
  onTaskClick,
  onTaskChange,
  tasks: externalTasks,
  range: externalRange,
  resolution: externalResolution,
  resources: externalResources,
  rowHeight: externalRowHeight,
  timezone: externalTimezone,
  theme: externalTheme = "light",
}: TimelineProviderProps) => {
  const timezone = useMemo(() => {
    if (!externalTimezone) {
      return "system";
    }

    const dateCheck = DateTime.fromMillis(0, { zone: externalTimezone });
    if (!dateCheck.isValid) {
      return "system";
    }

    return externalTimezone;
  }, [externalTimezone]);

  const [drawRange, setDrawRange] = useState(DEFAULT_DRAW_RANGE);

  useEffect(() => {
    logWarn("TimelineProvider", `Debug ${debug ? "ON" : "OFF"}`);
    window.__MELFORE_KONVA_TIMELINE_DEBUG__ = debug;
  }, [debug]);

  const range = useMemo((): InternalTimeRange => {
    const { start: externalStart, end: externalEnd } = externalRange;
    const start = getValidTime(externalStart, timezone);
    const end = getValidTime(externalEnd, timezone);

    return { start, end };
  }, [externalRange, timezone]);

  const resolution = useMemo(
    () => executeWithPerfomanceCheck("TimelineProvider", "resolution", () => getResolutionData(externalResolution)),
    [externalResolution]
  );

  const interval = useMemo(
    () =>
      executeWithPerfomanceCheck("TimelineProvider", "interval", () =>
        getIntervalFromInternalTimeRange(range, resolution, timezone)
      ),
    [range, resolution, timezone]
  );

  const initialDateTime = useMemo(() => {
    let initial = !externalInitialDateTime
      ? DateTime.now().toMillis()
      : getValidTime(externalInitialDateTime, timezone);
    if (initial < range.start || initial > range.end) {
      return;
    }

    return initial;
  }, [externalInitialDateTime, range, timezone]);

  const validTasks = useMemo(
    () =>
      executeWithPerfomanceCheck("TimelineProvider", "validateTasks", () =>
        validateTasks(externalTasks, range, timezone)
      ),
    [externalTasks, range, timezone]
  );

  const timeBlocks = useMemo(
    () =>
      executeWithPerfomanceCheck("TimelineProvider", "timeBlocks", () =>
        interval.splitBy({ [resolution.unit]: resolution.sizeInUnits })
      ),
    [interval, resolution]
  );

  const columnWidth = useMemo(() => {
    logDebug("TimelineProvider", "Calculating columnWidth...");
    return !externalColumnWidth || externalColumnWidth < DEFAULT_GRID_COLUMN_WIDTH
      ? resolution.columnSize
      : externalColumnWidth;
  }, [externalColumnWidth, resolution]);

  const timeblocksOffset = useMemo(() => Math.floor(drawRange.start / columnWidth), [drawRange, columnWidth]);

  const visibleTimeBlocks = useMemo(() => {
    logDebug("TimelineProvider", "Calculating visible time blocks...");
    const start = DateTime.now().toMillis();
    const rangeLength = drawRange.end - drawRange.start;
    if (rangeLength <= 0) {
      return [];
    }

    let startIndex = timeblocksOffset;
    if (startIndex > TIME_BLOCKS_PRELOAD) {
      startIndex = timeblocksOffset - TIME_BLOCKS_PRELOAD;
    }

    let endIndex = Math.ceil(drawRange.end / columnWidth);
    if (endIndex < timeBlocks.length - TIME_BLOCKS_PRELOAD) {
      endIndex = endIndex + TIME_BLOCKS_PRELOAD;
    }

    const vtbs = [...timeBlocks].slice(timeblocksOffset, endIndex);
    const end = DateTime.now().toMillis();
    logDebug("TimelineProvider", `Visible time blocks calculation took ${end - start} ms`);
    return vtbs;
  }, [timeblocksOffset, columnWidth, drawRange, timeBlocks]);

  const visibleRange = useMemo(() => {
    let range = null;
    if (visibleTimeBlocks && visibleTimeBlocks.length) {
      range = {
        start: visibleTimeBlocks[0].start!.toMillis(),
        end: visibleTimeBlocks[visibleTimeBlocks.length - 1].end!.toMillis(),
      };
    }

    return range;
  }, [visibleTimeBlocks]);

  const tasks = useMemo(
    () =>
      executeWithPerfomanceCheck("TimelineProvider", "filterTasks", () => filterTasks(validTasks.items, visibleRange)),
    [validTasks, visibleRange]
  );

  const dragResolution = useMemo(() => {
    logDebug("TimelineProvider", "Calculating drag resolution...");
    const start = DateTime.now().toMillis();
    const resData = getResolutionData(externalDragResolution || externalResolution);
    const end = DateTime.now().toMillis();
    logDebug("TimelineProvider", `Drag resolution calculation took ${end - start} ms`);
    return resData;
  }, [externalDragResolution, externalResolution]);

  const resources = useMemo(() => addHeaderResource(externalResources, headerLabel), [externalResources, headerLabel]);

  const rowHeight = useMemo(() => {
    logDebug("TimelineProvider", "Calculating rowHeight...");
    const rowHeight = externalRowHeight || DEFAULT_GRID_ROW_HEIGHT;
    return rowHeight < MINIMUM_GRID_ROW_HEIGHT ? MINIMUM_GRID_ROW_HEIGHT : rowHeight;
  }, [externalRowHeight]);

  const resourcesContentHeight = useMemo(() => {
    logDebug("TimelineProvider", "Calculating resources content height...");
    return rowHeight * resources.length;
  }, [resources, rowHeight]);

  const theme = useMemo((): TimelineTheme => {
    return {
      color: externalTheme === "dark" ? "white" : "black",
    };
  }, [externalTheme]);

  useEffect(() => {
    if (onErrors) {
      onErrors(validTasks.errors);
    }
  }, [onErrors, validTasks]);

  return (
    <TimelineContext.Provider
      value={{
        columnWidth,
        displayTasksLabel,
        dragResolution,
        drawRange,
        enableDrag,
        enableResize,
        hideResources,
        initialDateTime,
        interval,
        onErrors,
        onTaskClick,
        onTaskChange,
        resolution,
        resolutionKey: externalResolution,
        resources,
        resourcesContentHeight,
        rowHeight,
        setDrawRange,
        tasks,
        theme,
        timeBlocks,
        timezone: timezone || "system",
        visibleTimeBlocks,
        blocksOffset: timeblocksOffset,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error("useTimelineContext must be used within a TimelineProvider");
  }

  return context;
};
