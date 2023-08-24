import React, { FC, useMemo } from "react";
import { Label, Tag, Text } from "react-konva";

import { useTimelineContext } from "../../@contexts/Timeline";
import { KonvaPoint } from "../../@utils/konva";
import { TaskData } from "../../@utils/tasks";

export interface TaskTooltipProps extends KonvaPoint {
  task: TaskData;
}

const TaskTooltip: FC<TaskTooltipProps> = ({ task, x, y }) => {
  const {
    drawRange: { start: drawRangeStart },
  } = useTimelineContext();

  const adjustedX = useMemo(() => x + drawRangeStart, [drawRangeStart, x]);

  return (
    <Label x={adjustedX} y={y} opacity={0.75}>
      <Tag
        fill="black"
        lineJoin="round"
        pointerDirection="down"
        pointerHeight={10}
        pointerWidth={10}
        shadowBlur={10}
        shadowColor="black"
        shadowOffsetX={10}
        shadowOffsetY={10}
        shadowOpacity={0.2}
      />
      <Text text={task.label} fill="white" fontSize={18} padding={5} />
    </Label>
  );
};

// return taskTooltipContent ? (
//   <Html
//     transform={false}
//     divProps={{
//       style: {
//         border: "1px solid black",
//         backgroundColor: "white",
//         padding: "16px",
//         position: "fixed",
//         top: 200,
//         left: 200,
//         zIndex: 100,
//       },
//     }}
//   >
//     {taskTooltipContent(taskTooltip.task)}
//   </Html>
// ) : (
//   <TaskTooltip {...taskTooltip} />
// );

export default TaskTooltip;
