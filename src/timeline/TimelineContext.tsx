import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { DateTime, Interval } from "luxon";

import { addHeaderResource, Resource } from "../resources/utils/resources";
import { AreaSelect, filterTasks, TaskData, validateTasks } from "../tasks/utils/tasks";
import { DEFAULT_GRID_ROW_HEIGHT, MIN_GRID_COLUMN_WIDTH, MINIMUM_GRID_ROW_HEIGHT } from "../utils/dimensions";
import { logDebug, logWarn } from "../utils/logger";
import {
  getValidRangeTime,
  getValidTime,
  getXCoordinateFromTime,
  InternalTimeRange,
  isValidRangeTime,
} from "../utils/time";
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

export type Localized = {
  start: string;
  end: string;
  duration: string;
  completed: string;
};

export type CustomToolTipData = TaskData & {
  start: string;
  end: string;
};

export type LineData = {
  id: string;
  startId: string;
  endId: string;
  startResId: string;
  endResId: string;
  start: number;
  end: number;
};

export type CustomRes = {
  resource: Resource;
  dimension: {
    width: number;
    height: number;
  };
};

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
  onTaskChange?: (task: TaskData, opts?: { tasksId: string[]; addTime: number }) => void;
  /**
   * Timezone used for display (defaults to 'system')
   */
  timezone?: string;
  /**
   * Theme color in use
   */
  theme?: TimelineThemeMode;
  /**
   * ToolTips Labels
   */
  localized?: Localized;
  /**
   * Language used for date format
   */
  dateLocale?: string;
  /**
   * Event handler for task add event
   */
  onAreaSelect?: (task: AreaSelect) => void;
  /**
   * ToolTip display
   */
  toolTip?: boolean;
  /**
   * Callback that return a personalized tooltip( 200x100 is max possible size)
   */
  customToolTip?: (taskData: CustomToolTipData) => React.JSX.Element;
  /**
   * Enables pattern for incomplete part of the task (default true)
   */
  enableTaskPattern?: boolean;
  /**
   * Enables connection between tasks (if kLine is set in taskData)
   */
  enableLines?: boolean;
  /**
   * Event handler for resource click
   */
  onResourceClick?: (task: Resource) => void;
  /**
   * Summary data
   */
  summary?: { id: string; label: string }[];
  /**
   * Enable summary
   */
  showSummary?: boolean;
  /**
   * Header label to display in summary column, default is Summary
   */
  summaryHeader?: string;
  /**
   * Callback that return a personalized resources(this func return also the dimension of a single resourse)
   */
  customResources?: (resourceData: CustomRes) => React.JSX.Element;
};

type TimelineTheme = {
  color: string;
};

type TimelineContextType = Required<
  Pick<TimelineInput, "columnWidth" | "displayTasksLabel" | "hideResources" | "resources" | "rowHeight">
> & {
  aboveTimeBlocks: Interval[];
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
  onTaskChange?: (task: TaskData, opts?: { tasksId: string[]; addTime: number }) => void;
  resolution: ResolutionData;
  resolutionKey: Resolution;
  resourcesContentHeight: number;
  setDrawRange: (range: InternalTimeRange) => void;
  tasks: TaskData<InternalTimeRange>[];
  theme: TimelineTheme;
  timeBlocks: Interval[];
  timezone: string;
  visibleTimeBlocks: Interval[];
  localized: Localized;
  dateLocale?: string;
  onAreaSelect?: (task: AreaSelect) => void;
  toolTip?: boolean;
  customToolTip?: (taskData: CustomToolTipData) => React.JSX.Element;
  enableTaskPattern?: boolean;
  enableLines?: boolean;
  validLine?: LineData[];
  allValidTasks: TaskData<InternalTimeRange>[];
  externalRangeInMillis: InternalTimeRange;
  onResourceClick?: (resource: Resource) => void;
  summary?: { id: string; label: string }[];
  showSummary?: boolean;
  summaryWidth: number;
  summaryHeader?: string;
  customResources?: (resourceData: CustomRes) => React.JSX.Element;
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

// TODO#lb: this should be another data type, specific to drawing
const DEFAULT_DRAW_RANGE: InternalTimeRange = { start: 0, end: 0 };

export const TimelineProvider = ({
  children,
  columnWidth: externalColumnWidth,
  debug = false,
  displayTasksLabel = false,
  dragResolution: externalDragResolution = "1min",
  enableDrag = true,
  enableResize = true,
  headerLabel,
  hideResources = false,
  initialDateTime: externalInitialDateTime,
  onErrors,
  onTaskClick,
  onTaskChange,
  tasks: externalTasks = [],
  range: externalRange,
  resolution: externalResolution = "1hrs",
  resources: externalResources,
  rowHeight: externalRowHeight,
  timezone: externalTimezone,
  theme: externalTheme = "light",
  localized = {
    start: "Start",
    end: "End",
    duration: "Duration",
    completed: "Completed",
  },
  dateLocale = "en",
  onAreaSelect,
  toolTip = true,
  customToolTip,
  enableTaskPattern = true,
  enableLines,
  onResourceClick,
  summary: externalSummary,
  showSummary,
  summaryHeader,
  customResources,
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
    const isStart = isValidRangeTime(externalStart, "StartRenge");
    const isEnd = isValidRangeTime(externalEnd, "EndRange");
    const start = getValidRangeTime(externalStart, timezone);
    const end = getValidRangeTime(externalEnd, timezone);
    if (isStart) {
      if (start <= end) {
        return { start, end };
      }
      return { start: start, end: start };
    }
    if (isEnd) {
      return { start: end, end: end };
    }
    const now = DateTime.local().toMillis();
    return { start: now, end: now };
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

  const TIME_BLOCKS_PRELOAD = useMemo(() => {
    const { unit, sizeInUnits } = resolution;
    let timeBlocksPreload = 0;
    switch (unit) {
      case "minute":
        timeBlocksPreload = 60 / sizeInUnits;
        break;
      case "hour":
        timeBlocksPreload = 24 / sizeInUnits;
        break;
      case "day":
        timeBlocksPreload = 7 / sizeInUnits;
        break;
      case "week":
        timeBlocksPreload = 5 / sizeInUnits;
        break;
    }
    return timeBlocksPreload;
  }, [resolution]);

  const initialDateTime = useMemo(() => {
    let initial = DateTime.now().toMillis();
    if (externalInitialDateTime) {
      initial = getValidTime(externalInitialDateTime, timezone);
      if (Number.isNaN(initial)) {
        initial = new Date().getTime();
      }
    }

    if (initial < range.start || initial > range.end) {
      return range.start;
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

  const aboveTimeBlocks = useMemo(() => {
    const { unitAbove } = resolution;
    const blocks: Interval[] = [];
    const intervalStart = interval.start!;
    const intervalEnd = interval.end!;

    let blockStart = intervalStart;

    while (blockStart < intervalEnd) {
      let blockEnd = blockStart.endOf(unitAbove);

      if (blockEnd > intervalEnd) {
        blockEnd = intervalEnd;
      }

      blocks.push(Interval.fromDateTimes(blockStart, blockEnd));
      blockStart = blockEnd.startOf(unitAbove).plus({ [unitAbove]: 1 });
    }

    return blocks;
  }, [interval, resolution]);

  const columnWidth = useMemo(() => {
    logDebug("TimelineProvider", "Calculating columnWidth...");
    return !externalColumnWidth || externalColumnWidth < MIN_GRID_COLUMN_WIDTH
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
  }, [timeblocksOffset, columnWidth, drawRange, timeBlocks, TIME_BLOCKS_PRELOAD]);

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

  /*const lineTasks = useMemo(
    () => onLine && LineFilter(validTasks.items, visibleRange),
    [validTasks, visibleRange, onLine]
  );*/

  const allValidTasks = useMemo(() => validTasks.items, [validTasks]);

  const validLine = useMemo(() => {
    const arrLine: LineData[] = [];
    const startInMillis = getXCoordinateFromTime(drawRange.start, resolution, columnWidth, interval);
    const endInMillis = getXCoordinateFromTime(drawRange.end, resolution, columnWidth, interval);
    allValidTasks.forEach((item) => {
      if (item.relatedTasks) {
        item.relatedTasks.forEach((kLine) => {
          const lineEndId = allValidTasks.find((i) => kLine === i.id);
          if (lineEndId) {
            if (startInMillis > lineEndId.time.start && startInMillis > item.time.end) {
              return;
            }
            if (endInMillis < item.time.end && endInMillis < lineEndId.time.start) {
              return;
            }
            arrLine.push({
              id: item.id + lineEndId.id,
              startId: item.id,
              endId: lineEndId!.id,
              startResId: item.resourceId,
              endResId: lineEndId!.resourceId,
              start: item.time.end,
              end: lineEndId.time.start,
            });
          }
        });
      }
    });
    return arrLine;
  }, [allValidTasks, drawRange, columnWidth, resolution, interval]);

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

  const summaryWidth = useMemo(() => (columnWidth > 120 ? 120 : columnWidth < 60 ? 60 : columnWidth), [columnWidth]);

  useEffect(() => {
    if (onErrors) {
      onErrors(validTasks.errors);
    }
  }, [onErrors, validTasks]);

  const summary = useMemo(() => {
    return externalSummary ? [{ id: "0summary", label: "Summary" }, ...externalSummary] : [];
  }, [externalSummary]);

  return (
    <TimelineContext.Provider
      value={{
        aboveTimeBlocks,
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
        localized: localized,
        dateLocale,
        onAreaSelect,
        toolTip,
        customToolTip,
        enableTaskPattern,
        enableLines,
        validLine,
        allValidTasks,
        externalRangeInMillis: range,
        onResourceClick,
        summary,
        showSummary,
        summaryHeader,
        summaryWidth,
        customResources,
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
