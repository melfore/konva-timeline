import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { Decorator } from "@storybook/react-webpack5";

import { KonvaTimelineError, TaskData } from "../../..";
import { TimelineProviderProps } from "../../../timeline/TimelineContext";

const TimelineDecorator: Decorator<TimelineProviderProps> = (Story, context) => {
  const { args } = context;
  const [tasks, setTasks] = useState<TaskData[]>(args.tasks || []);

  const prevTasksRef = useRef<TaskData[]>(args.tasks || []);

  useEffect(() => {
    const tasksChanged = JSON.stringify(args.tasks) !== JSON.stringify(prevTasksRef.current);

    if (tasksChanged && args.tasks) {
      prevTasksRef.current = args.tasks;
      setTasks(args.tasks);
    }
  }, [args.tasks]);

  const onTaskChange = useCallback(
    (task: TaskData) => {
      if (args.onTaskChange) {
        args.onTaskChange(task);
      }

      setTasks((prevTasks) => {
        const newTasks = prevTasks.map((currentTask) => (currentTask.id === task.id ? { ...task } : currentTask));
        prevTasksRef.current = newTasks;
        return newTasks;
      });
    },
    [args]
  );

  const onErrors = useCallback(
    (errors: KonvaTimelineError[]) => {
      if (!errors?.length) {
        return;
      }

      if (args.onErrors) {
        args.onErrors(errors);
      }

      // eslint-disable-next-line no-console
      errors.forEach((error) => console[error.level]({ ...error }));
    },
    [args]
  );

  const updatedArgs = {
    ...args,
    tasks,
    onTaskChange,
    onErrors,
  };

  return <Story args={updatedArgs} />;
};

export default TimelineDecorator;
