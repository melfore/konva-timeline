import { DateTime, Interval } from "luxon";

export interface TimeRange {
  /**
   * Start of time range interval
   */
  start: number | string;
  /**
   * End of time range interval
   */
  end: number | string;
}

export interface InternalTimeRange {
  start: number;
  end: number;
}

export const getValidTime = (date: number | string): number => {
  const now = DateTime.now();
  let start;
  if (typeof date === "number") {
    start = DateTime.fromMillis(date);
  } else if (typeof date === "string") {
    start = DateTime.fromISO(date);
  }

  if (!start || !start.isValid) {
    start = now;
  }

  return start.toMillis();
};

/**
 * Converts a TimeRange to a luxon Interval
 * @param range TimeRange to convert
 */
export const getIntervalFromInternalTimeRange = ({ start, end }: InternalTimeRange): Interval => {
  return Interval.fromDateTimes(DateTime.fromMillis(start), DateTime.fromMillis(end));
};
