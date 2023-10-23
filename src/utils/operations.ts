type Entity = "interval" | "task" | "timeline";

type Level = "error" | "warn";

export interface KonvaTimelineError {
  entity: Entity;
  level: Level;
  message: string;
  refId?: string;
}

export type Operation<T> = {
  items: T[];
  errors: KonvaTimelineError[];
};
