type DataEntity = "interval" | "task";

type ErrorLevel = "error" | "warn";

export interface KonvaTimelineError {
  entity: DataEntity;
  level: ErrorLevel;
  message: string;
  refId?: string;
}

export type Operation<T> = {
  items: T[];
  errors: KonvaTimelineError[];
};
