export type Resolution = "1hrs" | "2hrs" | "6hrs" | "12hrs";
// | "1day"
// | "1week"
// | "2weeks"
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
  scale: Scale;
  scaleUnits: number;
};

type ResolutionsData = {
  [key in Resolution]: ResolutionData;
};

const COLUMN_WIDTH = 60;

export const RESOLUTIONS: Resolution[] = ["1hrs", "2hrs", "6hrs", "12hrs"];

const RESOLUTIONS_DATA: ResolutionsData = {
  "1hrs": { columnSize: COLUMN_WIDTH, label: "1 Hour", size: 1, unit: "hour", scale: "day", scaleUnits: 24 },
  "2hrs": { columnSize: COLUMN_WIDTH, label: "2 Hours", size: 2, unit: "hour", scale: "day", scaleUnits: 24 },
  "6hrs": { columnSize: COLUMN_WIDTH * 2, label: "1/4 of Day", size: 6, unit: "hour", scale: "day", scaleUnits: 24 },
  "12hrs": { columnSize: COLUMN_WIDTH * 3, label: "1/2 of Day", size: 12, unit: "hour", scale: "day", scaleUnits: 24 },
};

/**
 * Gets the resolution data for the given key
 * @param key key of the resolution to get
 */
export const getResolutionData = (key: Resolution): ResolutionData => RESOLUTIONS_DATA[key];
