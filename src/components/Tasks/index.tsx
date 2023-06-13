import React, { FC, Fragment } from "react";
import { Rect } from "react-konva";

import { User } from "../Grid";

export interface Task {
  userId: number;
  start: string;
  end: string;
  label: string;
}

interface TasksProps {
  resolutionFactor: number;
  tasks: Task[];
  users: User[];
  width: number;
}

const Tasks: FC<TasksProps> = ({ resolutionFactor, tasks, users, width }) => {
  const userRowHeight = 50;
  const headerRowWidth = 200;

  const slotSize = (width - headerRowWidth) / resolutionFactor;
  console.log({ slotSize });

  return (
    <Fragment>
      {users.map((user, index) => {
        const userTasks = tasks.filter((task) => task.userId === user.id);
        if (!userTasks || !userTasks.length) {
          console.log("=> no user tasks found");
          return null;
        }

        console.log(`=> found ${userTasks.length} user tasks`);

        return userTasks.map((task) => {
          const { start, end, label } = task;
          const [hourStart] = start.split(":");
          const [hourEnd] = end.split(":");

          const hourStartNum = parseInt(hourStart, 10);
          const hourEndNum = parseInt(hourEnd, 10);

          console.log({ hourStartNum, hourEndNum });

          const x = headerRowWidth + slotSize * hourStartNum;
          const y = userRowHeight * (index + 1);
          const height = userRowHeight;
          const width = (hourEndNum - hourStartNum) * slotSize;

          console.log({ x, y, height, width });

          return <Rect key={label} fill={user.color} x={x} y={y} height={height} width={width} />;
        });
      })}
    </Fragment>
  );
};

export default Tasks;
