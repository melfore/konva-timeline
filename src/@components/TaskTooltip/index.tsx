import React, { FC } from "react";
import { Label, Tag, Text } from "react-konva";

import { useTimelineContext } from "../../@contexts/Timeline";
import { TaskTooltipData } from "../../@utils/tasks";

const TaskTooltip: FC<TaskTooltipData> = ({ task, x, y }) => {
  const {
    drawRange: { start: drawRangeStart },
  } = useTimelineContext();

  if (!task) {
    return null;
  }

  return (
    <Label x={x + drawRangeStart} y={y} opacity={0.75}>
      <Tag
        fill={"black"}
        lineJoin={"round"}
        pointerDirection={"down"}
        pointerHeight={10}
        pointerWidth={10}
        shadowBlur={10}
        shadowColor={"black"}
        shadowOffsetX={10}
        shadowOffsetY={10}
        shadowOpacity={0.2}
      />
      <Text text={task.label} fill={"white"} fontSize={18} padding={5} />
    </Label>
  );
};

export default TaskTooltip;
