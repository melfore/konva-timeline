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

/**
 * Returns valid date based on input, otherwise now
 * @param date the input date (number or string formats)
 */
export const getValidTime = (date: number | string, timezone: string | undefined): number => {
  const dateInMillis = typeof date === "number" ? date : DateTime.fromISO(date, { zone: timezone }).toMillis();
  if (Number.isNaN(dateInMillis)) {
    return new Date().getTime();
  }

  return dateInMillis;
};

/**
 * Converts a TimeRange to a luxon Interval
 * @param range TimeRange to convert
 */
export const getIntervalFromInternalTimeRange = (
  { start, end }: InternalTimeRange,
  timezone: string | undefined
): Interval => {
  return Interval.fromDateTimes(
    DateTime.fromMillis(start, { zone: timezone }),
    DateTime.fromMillis(end, { zone: timezone })
  );
};
