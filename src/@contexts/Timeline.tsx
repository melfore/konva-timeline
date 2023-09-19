import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { DateTime, Interval } from "luxon";

import { logDebug, logWarn } from "../@utils/logger";
import { RESOURCE_HEADER, RESOURCE_HEADER_HEIGHT } from "../@utils/resources";
import { filterOutOfInterval, TaskData } from "../@utils/tasks";
import { TimeRange, toInterval } from "../@utils/time-range";
import { DEFAULT_COLUMN_WIDTH, getResolutionData, Resolution, ResolutionData } from "../@utils/time-resolution";
import { TimelineInput } from "../@utils/timeline";

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

type TimelineContextType = Required<Pick<TimelineInput, "columnWidth" | "hideResources" | "resources" | "tasks">> & {
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
  columnWidth: externalColumnWidth = DEFAULT_COLUMN_WIDTH,
  debug = false,
  dragResolution: externalDragResolution,
  hideResources = false,
  onTaskClick,
  onTaskDrag,
  tasks: externalTasks,
  range,
  resolution: externalResolution,
  resources: externalResources,
  theme: externalTheme = "light",
}: TimelineProviderProps) => {
  logWarn("TimelineProvider", `Debug ${debug ? "ON" : "OFF"}`);
  window.__MELFORE_KONVA_TIMELINE_DEBUG__ = debug;

  const [drawRange, setDrawRange] = useState(DEFAULT_DRAW_RANGE);

  // useEffect(() => {
  //   logWarn("TimelineProvider", `Debug ${debug ? "ON" : "OFF"}`);
  //   window.__MELFORE_KONVA_TIMELINE_DEBUG__ = debug;
  // }, [debug]);

  const interval = useMemo(() => {
    logDebug("TimelineProvider", "Calculating interval...");
    const start = DateTime.now().toMillis();
    const itv = toInterval(range);
    const end = DateTime.now().toMillis();
    logDebug("TimelineProvider", `Interval calculation took ${end - start} ms`);
    return itv;
  }, [range]);

  const resolution = useMemo(() => {
    logDebug("TimelineProvider", "Calculating resolution...");
    const start = DateTime.now().toMillis();
    const resData = getResolutionData(externalResolution);
    const end = DateTime.now().toMillis();
    logDebug("TimelineProvider", `Resolution calculation took ${end - start} ms`);
    return resData;
  }, [externalResolution]);

  const dragResolution = useMemo(() => {
    logDebug("TimelineProvider", "Calculating drag resolution...");
    const start = DateTime.now().toMillis();
    const resData = getResolutionData(externalDragResolution || externalResolution);
    const end = DateTime.now().toMillis();
    logDebug("TimelineProvider", `Drag resolution calculation took ${end - start} ms`);
    return resData;
  }, [externalDragResolution, externalResolution]);

  const columnWidth = useMemo(() => {
    logDebug("TimelineProvider", "Calculating columnWidth...");
    return !externalColumnWidth || externalColumnWidth < DEFAULT_COLUMN_WIDTH
      ? resolution.columnSize
      : externalColumnWidth;
  }, [externalColumnWidth, resolution]);

  const resources = useMemo(() => {
    logDebug("TimelineProvider", "Preparing resources...");
    return [RESOURCE_HEADER, ...externalResources];
  }, [externalResources]);

  const resourcesContentHeight = useMemo(() => {
    logDebug("TimelineProvider", "Calculating resources content height...");
    return RESOURCE_HEADER_HEIGHT * resources.length;
  }, [resources]);

  const timeBlocks = useMemo(() => {
    logDebug("TimelineProvider", "Calculating time blocks...");
    const start = DateTime.now().toMillis();
    const itvs = interval.splitBy({ [resolution.unit]: resolution.sizeInUnits });
    const end = DateTime.now().toMillis();
    logDebug("TimelineProvider", `Time blocks calculation took ${end - start} ms`);
    return itvs;
  }, [interval, resolution]);

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

  const tasks = useMemo(() => {
    logDebug("TimelineProvider", "Preparing tasks...");
    if (!visibleTimeBlocks || !visibleTimeBlocks.length) {
      return [];
    }

    const start = DateTime.now().toMillis();
    const interval = Interval.fromDateTimes(
      DateTime.fromMillis(visibleTimeBlocks[0].start!.toMillis()),
      DateTime.fromMillis(visibleTimeBlocks[visibleTimeBlocks.length - 1].start!.toMillis())
    );

    const ts = filterOutOfInterval(externalTasks, interval);
    const end = DateTime.now().toMillis();
    logDebug("TimelineProvider", `Tasks preparation took ${end - start} ms`);
    return ts;
  }, [externalTasks, visibleTimeBlocks]);

  const theme = useMemo((): TimelineTheme => {
    return {
      color: externalTheme === "dark" ? "white" : "black",
    };
  }, [externalTheme]);

  return (
    <TimelineContext.Provider
      value={{
        columnWidth,
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
