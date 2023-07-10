export type Resolution = "1hrs" | "2hrs" | "6hrs" | "12hrs" | "1day" | "1week" | "2weeks";
// | "1month"
// | "2months"
// | "3months"
// | "6months"
// | "1year";

type Scale = "hour" | "day" | "week" | "month" | "year";

export type ResolutionData = {
  columnSize: number;
  label: string;
  size: number;
  unit: Scale;
};

type ResolutionsData = {
  [key in Resolution]: ResolutionData;
};

const COLUMN_WIDTH = 60;

export const RESOLUTIONS: Resolution[] = ["1hrs", "2hrs", "6hrs", "12hrs", "1day", "1week", "2weeks"];

const RESOLUTIONS_DATA: ResolutionsData = {
  "1hrs": { columnSize: COLUMN_WIDTH, label: "1 Hour", size: 1, unit: "hour" },
  "2hrs": { columnSize: COLUMN_WIDTH, label: "2 Hours", size: 2, unit: "hour" },
  "6hrs": { columnSize: COLUMN_WIDTH * 2, label: "1/4 of Day", size: 6, unit: "hour" },
  "12hrs": { columnSize: COLUMN_WIDTH * 3, label: "1/2 of Day", size: 12, unit: "hour" },
  "1day": { columnSize: COLUMN_WIDTH * 3, label: "1 Day", size: 1, unit: "day" },
  "1week": { columnSize: COLUMN_WIDTH * 10, label: "1 Week", size: 1, unit: "week" },
  "2weeks": { columnSize: COLUMN_WIDTH * 10, label: "2 Weeks", size: 2, unit: "week" },
};

/**
 * Gets the resolution data for the given key
 * @param key key of the resolution to get
 */
export const getResolutionData = (key: Resolution): ResolutionData => RESOLUTIONS_DATA[key];
