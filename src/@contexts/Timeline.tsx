import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { Interval } from "luxon";

import { logDebug } from "../@utils/logger";
import { Resource, RESOURCE_HEADER, RESOURCE_HEADER_HEIGHT } from "../@utils/resources";
import { filterOutOfInterval, TaskData } from "../@utils/tasks";
import { TimeRange, toInterval } from "../@utils/time-range";
import { getResolutionData, Resolution, ResolutionData } from "../@utils/time-resolution";
import { TimelineInput } from "../@utils/timeline";

declare global {
  interface Window {
    __MELFORE_KONVA_TIMELINE_DEBUG__?: boolean;
  }
}

type TimelineProviderProps = PropsWithChildren<TimelineInput> & {
  debug?: boolean;
  taskTooltipContent?: (task: any) => React.ReactNode;
};

type TimelineContextType = {
  drawRange: TimeRange;
  hideResources?: boolean;
  interval: Interval;
  resolution: ResolutionData;
  resolutionKey: Resolution;
  resources: Resource[];
  resourcesContentHeight: number;
  setDrawRange: (range: TimeRange) => void;
  setResolutionKey: (resolution: Resolution) => void;
  tasks: TaskData[];
  taskTooltipContent?: (task: any) => React.ReactNode;
  timeBlocks: Interval[];
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

const DEFAULT_DRAW_RANGE: TimeRange = { start: 0, end: 0 };

export const TimelineProvider = ({
  children,
  debug = false,
  hideResources = false,
  tasks: externalTasks,
  taskTooltipContent,
  range,
  resolution: externalResolution = "1hrs",
  resources: externalResources,
}: TimelineProviderProps) => {
  const [drawRange, setDrawRange] = useState(DEFAULT_DRAW_RANGE);
  const [resolutionKey, setResolutionKey] = useState(externalResolution);

  useEffect(() => {
    console.log("=> TimelineProvider.useEffect.debug", debug);
    window.__MELFORE_KONVA_TIMELINE_DEBUG__ = debug;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        taskTooltipContent,
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
