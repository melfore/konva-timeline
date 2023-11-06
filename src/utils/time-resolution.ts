import { DateTime, Interval } from "luxon";

import { DEFAULT_GRID_COLUMN_WIDTH } from "./dimensions";

export type Scale = "minute" | "hour" | "day" | "week" | "month" | "year";

export type Resolution =
  | "1min"
  | "5min"
  | "10min"
  | "15min"
  | "30min"
  | "1hrs"
  | "2hrs"
  | "6hrs"
  | "12hrs"
  | "1day"
  | "1week"
  | "2weeks";

export type ResolutionData = {
  columnSize: number;
  label: string;
  sizeInUnits: number;
  unit: Scale;
  unitAbove: Scale;
};

type ResolutionsData = {
  [key in Resolution]: ResolutionData;
};

const RESOLUTIONS_DATA: ResolutionsData = {
  "1min": {
    columnSize: DEFAULT_GRID_COLUMN_WIDTH / 2,
    label: "1 Minute",
    sizeInUnits: 1,
    unit: "minute",
    unitAbove: "hour",
  },
  "5min": {
    columnSize: DEFAULT_GRID_COLUMN_WIDTH / 2,
    label: "5 Minutes",
    sizeInUnits: 5,
    unit: "minute",
    unitAbove: "hour",
  },
  "10min": {
    columnSize: DEFAULT_GRID_COLUMN_WIDTH / 2,
    label: "10 Minutes",
    sizeInUnits: 10,
    unit: "minute",
    unitAbove: "hour",
  },
  "15min": {
    columnSize: DEFAULT_GRID_COLUMN_WIDTH,
    label: "15 Minutes",
    sizeInUnits: 15,
    unit: "minute",
    unitAbove: "hour",
  },
  "30min": {
    columnSize: DEFAULT_GRID_COLUMN_WIDTH,
    label: "30 Minutes",
    sizeInUnits: 30,
    unit: "minute",
    unitAbove: "hour",
  },
  "1hrs": {
    columnSize: DEFAULT_GRID_COLUMN_WIDTH,
    label: "1 Hour",
    sizeInUnits: 1,
    unit: "hour",
    unitAbove: "day",
  },
  "2hrs": {
    columnSize: DEFAULT_GRID_COLUMN_WIDTH,
    label: "2 Hours",
    sizeInUnits: 2,
    unit: "hour",
    unitAbove: "day",
  },
  "6hrs": {
    columnSize: DEFAULT_GRID_COLUMN_WIDTH * 2,
    label: "1/4 of Day",
    sizeInUnits: 6,
    unit: "hour",
    unitAbove: "day",
  },
  "12hrs": {
    columnSize: DEFAULT_GRID_COLUMN_WIDTH * 3,
    label: "1/2 of Day",
    sizeInUnits: 12,
    unit: "hour",
    unitAbove: "day",
  },
  "1day": {
    columnSize: DEFAULT_GRID_COLUMN_WIDTH * 3,
    label: "1 Day",
    sizeInUnits: 1,
    unit: "day",
    unitAbove: "week",
  },
  "1week": {
    columnSize: DEFAULT_GRID_COLUMN_WIDTH * 10,
    label: "1 Week",
    sizeInUnits: 1,
    unit: "week",
    unitAbove: "month",
  },
  "2weeks": {
    columnSize: DEFAULT_GRID_COLUMN_WIDTH * 10,
    label: "2 Weeks",
    sizeInUnits: 2,
    unit: "week",
    unitAbove: "month",
  },
};

export const RESOLUTIONS: Resolution[] = [
  "1min",
  "5min",
  "10min",
  "15min",
  "30min",
  "1hrs",
  "2hrs",
  "6hrs",
  "12hrs",
  "1day",
  "1week",
  "2weeks",
];

/**
 * Util to display an interval in a human readable format
 * @param interval the interval to display
 * @param unit the unit in which to display the interval
 */
export const displayAboveInterval = (interval: Interval, unit: Scale): string => {
  const { start } = interval;
  if (!start) {
    return "-";
  }

  switch (unit) {
    case "minute":
    case "hour":
      return start.toFormat("dd/MM/yy HH:mm");
    case "day":
      return start.toFormat("ccc dd yyyy");
    case "week":
      return `${start.toFormat("MMM yyyy")} CW ${start.toFormat("WW")}`;
    case "month":
      return start.toFormat("MMM yyyy");
    default:
      return "N/A";
  }
};

export const getMonth = (interval: Interval): string => {
  const { start } = interval;
  if (!start) {
    return "-";
  }

  return start.toFormat("M");
};
export const getYear = (interval: Interval): string => {
  const { start } = interval;
  if (!start) {
    return "-";
  }

  return start.toFormat("yyyy");
};

export const getStartMonthsDay = (start: DateTime): string => {
  if (!start) {
    return "-";
  }

  return start.toFormat("d");
};

export const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

/**
 * Util to display an interval in a human readable format
 * @param interval the interval to display
 * @param unit the unit in which to display the interval
 */
export const displayInterval = (interval: Interval, unit: Scale): string => {
  const { start } = interval;
  if (!start) {
    return "-";
  }

  switch (unit) {
    case "minute":
      return start.toFormat("mm");
    case "hour":
      return start.toFormat("HH:mm");
    case "day":
      return start.toFormat("ccc dd");
    case "week":
      return `CW ${start.toFormat("WW")}`;
    case "month":
      return start.toFormat("MMM yyyy");
    default:
      return "N/A";
  }
};

/**
 * Gets the resolution data for the given key
 * @param key key of the resolution to get
 */
export const getResolutionData = (key: Resolution): ResolutionData => RESOLUTIONS_DATA[key];
