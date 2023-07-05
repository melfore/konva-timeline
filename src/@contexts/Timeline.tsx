import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { DateTime, Interval } from "luxon";

import { TimelineInput } from "../@utils/timeline-utils";

type TimelineProviderProps = PropsWithChildren<TimelineInput>;

type TimelineContextType = {
  interval: any;
};

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export const TimelineProvider = ({ children, range }: TimelineProviderProps) => {
  const interval = useMemo(() => {
    const dateStart = DateTime.fromMillis(range.start);
    const dateEnd = DateTime.fromMillis(range.end);

    return Interval.fromDateTimes(dateStart, dateEnd);
  }, [range]);

  console.log("interval", interval);

  return <TimelineContext.Provider value={{ interval }}>{children}</TimelineContext.Provider>;
};

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error("useTimelineContext must be used within a TimelineProvider");
  }

  return context;
};
