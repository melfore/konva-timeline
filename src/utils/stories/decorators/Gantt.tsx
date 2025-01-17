import { cloneElement, ReactElement, useCallback, useEffect, useState } from "react";
import React from "react";
import { Decorator } from "@storybook/react";

import { TaskData } from "../../..";
import { TimelineProviderProps } from "../../../timeline/TimelineContext";

const FormMock = ({
  children,
  onTaskChange: externalOnTaskChange,
  tasks: externalTasks,
  ...props
}: TimelineProviderProps) => {
  const [tasks, setTasks] = useState<TaskData[]>(externalTasks || []);

  useEffect(() => {
    if (externalTasks !== tasks) {
      setTasks(externalTasks || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalTasks]);

  const onTaskChange = useCallback(
    (task: TaskData, opts?: { tasksId: string[]; addTime: number }) => {
      externalOnTaskChange && externalOnTaskChange(task, opts);
      const newTasks = tasks.map((i) => {
        if (opts && opts.tasksId.includes(i.id)) {
          const start = i.time.start;
          return { ...i, time: { start: Number(start) + opts.addTime, end: Number(i.time.end) + opts.addTime } };
        }

        if (i.id === task.id) {
          return task;
        }

        return i;
      });

      setTasks(newTasks);
    },
    [externalOnTaskChange, tasks]
  );

  return <>{cloneElement(children as ReactElement, { onTaskChange, tasks, ...props })}</>;
};

const GanttDecorator: Decorator<TimelineProviderProps> = (Story, { args }) => <FormMock {...args}>{Story()}</FormMock>;

export default GanttDecorator;
