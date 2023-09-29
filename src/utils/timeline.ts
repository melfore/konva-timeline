import { Resource } from "../resources/utils/resources";
import { TaskData } from "../tasks/utils/tasks";

import { TimeRange } from "./time";
import { Resolution } from "./time-resolution";

export type TimelineInput = {
  /**
   * Custom column width (defaults to 60px)
   */
  columnWidth?: number;
  /**
   * Enables tasks label display
   */
  displayTasksLabel?: boolean;
  /**
   * Drag and drop resolution (if not passed, defaults to resolution)
   */
  dragResolution?: Resolution;
  /**
   * Flag to hide resource column (defaults to false)
   */
  hideResources?: boolean;
  /**
   * Resolution to display data in konva-timeline
   */
  resolution: Resolution;
  /**
   * Custom row height (defaults to 50px)
   */
  rowHeight?: number;
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
};
