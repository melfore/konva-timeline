import { Resource } from "./resources";
import { TaskData } from "./tasks";
import { TimeRange } from "./time-range";
import { Resolution } from "./time-resolution";

type TimelineThemeMode = "dark" | "light";

export type TimelineInput = {
  /**
   * Custom column width (defaults to 60px)
   */
  columnWidth?: number;
  /**
   * Flag to hide resource column (defaults to false)
   */
  hideResources?: boolean;
  /**
   * Resolution to display data in konva-timeline
   */
  resolution: Resolution;
  /**
   * List of tasks to be displayed
   */
  tasks: TaskData[];
  /**
   * Time range to be displayed
   */
  range: TimeRange;
  /**
   * List of resources to be displayed
   */
  resources: Resource[];
  /**
   * Theme color in use
   */
  theme?: TimelineThemeMode;
};
