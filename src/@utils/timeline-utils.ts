export interface Category {
  id: string;
  label: string;
  color: string;
}

export type Resolution = "1hrs" | "2hrs" | "6hrs" | "12hrs";
// | "1day"
// | "1week"
// | "2weeks"
// | "1month"
// | "2months"
// | "3months"
// | "6months"
// | "1year";

export interface TimeRange {
  start: number;
  end: number;
}

export interface TaskData {
  categoryId: string;
  label: string;
  time: TimeRange;
}

export type TimelineInput = {
  categories: Category[];
  columnWidth?: number;
  resolution?: Resolution;
  tasks: TaskData[];
  range: TimeRange;
};
