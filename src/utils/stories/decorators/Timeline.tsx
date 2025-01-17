import { cloneElement, ReactElement, useCallback, useEffect, useState } from "react";
import React from "react";
import { Decorator } from "@storybook/react";

import { KonvaTimelineError, TaskData } from "../../..";
import { TimelineProviderProps } from "../../../timeline/TimelineContext";

const FormMock = ({
  children,
  onErrors: externalOnErrors,
  onTaskChange: externalOnTaskChange,
  tasks: externalTasks,
  ...props
}: TimelineProviderProps) => {
  const [tasks, setTasks] = useState<TaskData[]>(externalTasks || []);

  useEffect(() => {
    if (JSON.stringify(externalTasks) !== JSON.stringify(tasks)) {
      setTasks(externalTasks || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalTasks]);

  const onTaskChange = useCallback(
    (task: TaskData) => {
      externalOnTaskChange && externalOnTaskChange(task);
      setTasks((prevTasks) => prevTasks.map((currentTask) => (currentTask.id === task.id ? task : currentTask)));
    },
    [externalOnTaskChange]
  );

  const onErrors = useCallback(
    (errors: KonvaTimelineError[]) => {
      if (!errors || !errors.length) {
        return;
      }

      externalOnErrors && externalOnErrors(errors);
      // eslint-disable-next-line no-console
      errors.forEach((error) => console[error.level]({ ...error }));
    },
    [externalOnErrors]
  );

  return <>{cloneElement(children as ReactElement, { onErrors, onTaskChange, tasks, ...props })}</>;
};

//export default TimelineDecorator;
const TimelineDecorator: Decorator<TimelineProviderProps> = (Story, { args }) => (
  <FormMock {...args}>{Story()}</FormMock>
);

export default TimelineDecorator;
