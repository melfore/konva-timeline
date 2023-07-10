import { Resource } from "./resources";
import { TaskData } from "./tasks";
import { TimeRange } from "./time-range";
import { Resolution } from "./time-resolution";

export type TimelineInput = {
  columnWidth?: number;
  hideResources?: boolean;
  resolution?: Resolution;
  tasks: TaskData[];
  range: TimeRange;
  resources: Resource[];
};
