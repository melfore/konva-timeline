import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { DateTime, Interval } from "luxon";

import { addHeaderResource } from "../resources/utils/resources";
import { filterTasks, TaskData, validateTasks } from "../tasks/utils/tasks";
import { DEFAULT_GRID_COLUMN_WIDTH, DEFAULT_GRID_ROW_HEIGHT, MINIMUM_GRID_ROW_HEIGHT } from "../utils/dimensions";
import { logDebug, logError, logWarn } from "../utils/logger";
import { TimeRange, toInterval } from "../utils/time-range";
import { getResolutionData, Resolution, ResolutionData } from "../utils/time-resolution";
import { TimelineInput } from "../utils/timeline";
import { executeWithPerfomanceCheck } from "../utils/utils";

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
   * Event handler for task click
   */
  onTaskClick?: (task: TaskData) => void;
  /**
   * Event handler for task click
   */
  onTaskDrag?: (task: TaskData) => void;
  /**
   * Theme color in use
   */
  theme?: TimelineThemeMode;
};

type TimelineTheme = {
  color: string;
};

type TimelineContextType = Required<
  Pick<TimelineInput, "columnWidth" | "displayTasksLabel" | "hideResources" | "resources" | "rowHeight" | "tasks">
> & {
  blocksOffset: number;
  dragResolution: ResolutionData;
  drawRange: TimeRange;
  interval: Interval;
  onTaskClick?: (task: TaskData) => void;
  onTaskDrag?: (task: TaskData) => void;
  resolution: ResolutionData;
  resolutionKey: Resolution;
  resourcesContentHeight: number;
  setDrawRange: (range: TimeRange) => void;
  theme: TimelineTheme;
  timeBlocks: Interval[];
  visibleTimeBlocks: Interval[];
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

const DEFAULT_DRAW_RANGE: TimeRange = { start: 0, end: 0 };

const TIME_BLOCKS_PRELOAD = 5;

export const TimelineProvider = ({
  children,
  columnWidth: externalColumnWidth,
  debug = false,
  displayTasksLabel = false,
  dragResolution: externalDragResolution,
  hideResources = false,
  onTaskClick,
  onTaskDrag,
  tasks: externalTasks,
  range,
  resolution: externalResolution,
  resources: externalResources,
  rowHeight: externalRowHeight,
  theme: externalTheme = "light",
}: TimelineProviderProps) => {
  // logWarn("TimelineProvider", `Debug ${debug ? "ON" : "OFF"}`);
  // window.__MELFORE_KONVA_TIMELINE_DEBUG__ = debug;

  const [drawRange, setDrawRange] = useState(DEFAULT_DRAW_RANGE);

  useEffect(() => {
    logWarn("TimelineProvider", `Debug ${debug ? "ON" : "OFF"}`);
    window.__MELFORE_KONVA_TIMELINE_DEBUG__ = debug;
  }, [debug]);

  const validTasks = useMemo(() => validateTasks(externalTasks, range), [externalTasks, range]);

  const interval = useMemo(
    () => executeWithPerfomanceCheck("TimelineProvider", "interval", () => toInterval(range)),
    [range]
  );

  const resolution = useMemo(
    () => executeWithPerfomanceCheck("TimelineProvider", "resolution", () => getResolutionData(externalResolution)),
    [externalResolution]
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
    () => executeWithPerfomanceCheck("TimelineProvider", "tasks", () => filterTasks(validTasks.items, visibleRange)),
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

  const resources = useMemo(() => addHeaderResource(externalResources), [externalResources]);

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
    // const realErrors = validTasks.errors.filter((error) => error.level === "error");
    logError("TimelineProvider", `Thrown ${validTasks.errors.length} task errors`);
  }, [validTasks]);

  return (
    <TimelineContext.Provider
      value={{
        columnWidth,
        displayTasksLabel,
        dragResolution,
        drawRange,
        hideResources,
        interval,
        onTaskClick,
        onTaskDrag,
        resolution,
        resolutionKey: externalResolution,
        resources,
        resourcesContentHeight,
        rowHeight,
        setDrawRange,
        tasks,
        theme,
        timeBlocks,
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
