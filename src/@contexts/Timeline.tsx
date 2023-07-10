import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { Interval } from "luxon";

import { Resource } from "../@utils/resources";
import { filterOutOfInterval, TaskData } from "../@utils/tasks";
import { toInterval } from "../@utils/time-range";
import { getResolutionData, Resolution, ResolutionData } from "../@utils/time-resolution";
import { TimelineInput } from "../@utils/timeline";

type TimelineProviderProps = PropsWithChildren<TimelineInput> & {
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
  hideResources = false,
  tasks: externalTasks,
  taskTooltipContent,
  range,
  resolution: externalResolution = "1hrs",
  resources: externalResources,
}: TimelineProviderProps) => {
  const [resolutionKey, setResolutionKey] = useState(externalResolution);

  const interval = useMemo(() => toInterval(range), [range]);

  const resolution = useMemo(() => getResolutionData(resolutionKey), [resolutionKey]);

  useEffect(() => {
    setResolutionKey(externalResolution);
  }, [externalResolution]);

  const resources = useMemo(
    (): Resource[] => [{ color: "transparent", id: "-1", label: "Header" }, ...externalResources],
    [externalResources]
  );

  const tasks = useMemo(() => filterOutOfInterval(externalTasks, interval), [externalTasks, interval]);

  const wrapperHeight = useMemo(() => resources.length * 50, [resources]);

  const timeBlocks = useMemo(() => {
    return interval.splitBy({ [resolution.unit]: resolution.size });
  }, [interval, resolution]);

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
