import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { Interval } from "luxon";

import { logDebug, logWarn } from "../@utils/logger";
import { RESOURCE_HEADER, RESOURCE_HEADER_HEIGHT } from "../@utils/resources";
import { filterOutOfInterval } from "../@utils/tasks";
import { TimeRange, toInterval } from "../@utils/time-range";
import { DEFAULT_COLUMN_WIDTH, getResolutionData, Resolution, ResolutionData } from "../@utils/time-resolution";
import { TimelineInput } from "../@utils/timeline";

declare global {
  interface Window {
    __MELFORE_KONVA_TIMELINE_DEBUG__?: boolean;
  }
}

export type TimelineProviderProps = PropsWithChildren<TimelineInput> & {
  debug?: boolean;
};

type TimelineContextType = Required<Pick<TimelineInput, "columnWidth" | "hideResources" | "resources" | "tasks">> & {
  drawRange: TimeRange;
  interval: Interval;
  resolution: ResolutionData;
  resolutionKey: Resolution;
  resourcesContentHeight: number;
  setDrawRange: (range: TimeRange) => void;
  setResolutionKey: (resolution: Resolution) => void;
  timeBlocks: Interval[];
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

const DEFAULT_DRAW_RANGE: TimeRange = { start: 0, end: 0 };

export const TimelineProvider = ({
  children,
  columnWidth: externalColumnWidth = DEFAULT_COLUMN_WIDTH,
  debug = false,
  hideResources = false,
  tasks: externalTasks,
  range,
  resolution: externalResolution,
  resources: externalResources,
}: TimelineProviderProps) => {
  const [drawRange, setDrawRange] = useState(DEFAULT_DRAW_RANGE);
  const [resolutionKey, setResolutionKey] = useState(externalResolution);

  useEffect(() => {
    logWarn("TimelineProvider", `Debug ${debug ? "ON" : "OFF"}`);
    window.__MELFORE_KONVA_TIMELINE_DEBUG__ = debug;
  }, [debug]);

  useEffect(() => {
    if (externalResolution === resolutionKey) {
      return;
    }

    logDebug("TimelineProvider", `Resolution changed to '${externalResolution}'`);
    setResolutionKey(externalResolution);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalResolution]);

  const interval = useMemo(() => {
    logDebug("TimelineProvider", "Calculating interval...");
    return toInterval(range);
  }, [range]);

  const resolution = useMemo(() => {
    logDebug("TimelineProvider", "Calculating resolution...");
    return getResolutionData(resolutionKey);
  }, [resolutionKey]);

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

  const tasks = useMemo(() => {
    logDebug("TimelineProvider", "Preparing tasks...");
    return filterOutOfInterval(externalTasks, interval);
  }, [externalTasks, interval]);

  const timeBlocks = useMemo(() => {
    logDebug("TimelineProvider", "Calculating time blocks...");
    return interval.splitBy({ [resolution.unit]: resolution.sizeInUnits });
  }, [interval, resolution]);

  return (
    <TimelineContext.Provider
      value={{
        columnWidth,
        drawRange,
        hideResources,
        interval,
        resolution,
        resolutionKey,
        resources,
        resourcesContentHeight,
        setDrawRange,
        setResolutionKey,
        tasks,
        timeBlocks,
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
