import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { Decorator } from "@storybook/react-webpack5";

import { TaskData } from "../../..";
import { TimelineProviderProps } from "../../../timeline/TimelineContext";

const GanttDecorator: Decorator<TimelineProviderProps> = (Story, context) => {
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
    (task: TaskData, opts?: { tasksId: string[]; addTime: number }) => {
      if (args.onTaskChange) {
        args.onTaskChange(task, opts);
      }

      setTasks((prevTasks) => {
        const newTasks = prevTasks.map((i) => {
          if (opts && opts.tasksId.includes(i.id)) {
            const start = i.time.start;
            return {
              ...i,
              time: {
                start: Number(start) + opts.addTime,
                end: Number(i.time.end) + opts.addTime,
              },
            };
          }

          if (i.id === task.id) {
            return { ...task };
          }

          return i;
        });

        prevTasksRef.current = newTasks;
        return newTasks;
      });
    },
    [args]
  );

  const updatedArgs = {
    ...args,
    tasks,
    onTaskChange,
  };

  return <Story args={updatedArgs} />;
};

export default GanttDecorator;
