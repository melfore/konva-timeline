import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { Interval } from "luxon";

import { filterOutOfInterval, TaskData } from "../@utils/tasks";
import { toInterval } from "../@utils/time-range";
import { TimelineInput } from "../@utils/timeline";

type TimelineProviderProps = PropsWithChildren<TimelineInput>;

type TimelineContextType = {
  interval: Interval;
  tasks: TaskData[];
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export const TimelineProvider = ({ children, tasks: externalTasks, range }: TimelineProviderProps) => {
  const interval = useMemo(() => toInterval(range), [range]);
  const tasks = useMemo(() => filterOutOfInterval(externalTasks, interval), [externalTasks, interval]);

  return <TimelineContext.Provider value={{ interval, tasks }}>{children}</TimelineContext.Provider>;
};

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error("useTimelineContext must be used within a TimelineProvider");
  }

  return context;
};
