import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { Interval } from "luxon";

import { logDebug } from "../@utils/logger";
import { Resource, RESOURCE_HEADER, RESOURCE_ROW_HEIGHT } from "../@utils/resources";
import { filterOutOfInterval, TaskData } from "../@utils/tasks";
import { toInterval } from "../@utils/time-range";
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
  hideResources?: boolean;
  interval: Interval;
  resolution: ResolutionData;
  resolutionKey: Resolution;
  resources: Resource[];
  setResolutionKey: (resolution: Resolution) => void;
  tasks: TaskData[];
  taskTooltipContent?: (task: any) => React.ReactNode;
  timeBlocks: Interval[];
  wrapperHeight: number;
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

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

    logDebug("TimelineProvider", "useEffect.resolutionKey");
    setResolutionKey(externalResolution);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalResolution]);

  const interval = useMemo(() => {
    logDebug("TimelineProvider", "useMemo.interval");
    return toInterval(range);
  }, [range]);

  const resolution = useMemo(() => {
    logDebug("TimelineProvider", "useMemo.resolution");
    return getResolutionData(resolutionKey);
  }, [resolutionKey]);

  const resources = useMemo(() => {
    logDebug("TimelineProvider", "useMemo.resources");
    return [RESOURCE_HEADER, ...externalResources];
  }, [externalResources]);

  const tasks = useMemo(() => {
    logDebug("TimelineProvider", "useMemo.tasks");
    return filterOutOfInterval(externalTasks, interval);
  }, [externalTasks, interval]);

  const timeBlocks = useMemo(() => {
    logDebug("TimelineProvider", "useMemo.timeBlocks");
    return interval.splitBy({ [resolution.unit]: resolution.sizeInUnits });
  }, [interval, resolution]);

  const wrapperHeight = useMemo(() => {
    logDebug("TimelineProvider", "useMemo.wrapperHeight");
    return resources.length * RESOURCE_ROW_HEIGHT;
  }, [resources]);

  return (
    <TimelineContext.Provider
      value={{
        hideResources,
        interval,
        resolution,
        resolutionKey,
        resources,
        setResolutionKey,
        tasks,
        taskTooltipContent,
        timeBlocks,
        wrapperHeight,
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
