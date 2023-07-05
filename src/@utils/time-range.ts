import { DateTime, Interval } from "luxon";

export interface TimeRange {
  start: number;
  end: number;
}

/**
 * Converts a TimeRange to a luxon Interval
 * @param range TimeRange to convert
 */
export const toInterval = ({ start, end }: TimeRange): Interval => {
  return Interval.fromDateTimes(DateTime.fromMillis(start), DateTime.fromMillis(end));
};
