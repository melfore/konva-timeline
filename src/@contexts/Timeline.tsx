import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { Interval } from "luxon";

import { Resource } from "../@utils/resources";
import { filterOutOfInterval, TaskData } from "../@utils/tasks";
import { toInterval } from "../@utils/time-range";
import { TimelineInput } from "../@utils/timeline";

type TimelineProviderProps = PropsWithChildren<TimelineInput> & {
  taskTooltipContent?: (task: any) => React.ReactNode;
};

type TimelineContextType = {
  hideResources?: boolean;
  interval: Interval;
  resources: Resource[];
  tasks: TaskData[];
  taskTooltipContent?: (task: any) => React.ReactNode;
  wrapperHeight: number;
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export const TimelineProvider = ({
  children,
  hideResources = false,
  tasks: externalTasks,
  taskTooltipContent,
  range,
  resources: externalResources,
}: TimelineProviderProps) => {
  const interval = useMemo(() => toInterval(range), [range]);

  const resources = useMemo(
    (): Resource[] => [{ color: "transparent", id: "-1", label: "Header" }, ...externalResources],
    [externalResources]
  );

  const tasks = useMemo(() => filterOutOfInterval(externalTasks, interval), [externalTasks, interval]);

  const wrapperHeight = useMemo(() => resources.length * 50, [resources]);

  return (
    <TimelineContext.Provider value={{ hideResources, interval, resources, tasks, taskTooltipContent, wrapperHeight }}>
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
