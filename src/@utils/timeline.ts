import { Category } from "./categories";
import { TaskData } from "./tasks";
import { TimeRange } from "./time-range";
import { Resolution } from "./time-resolution";

export type TimelineInput = {
  categories: Category[];
  columnWidth?: number;
  resolution?: Resolution;
  tasks: TaskData[];
  range: TimeRange;
};
