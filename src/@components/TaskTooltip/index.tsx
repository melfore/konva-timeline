import React, { FC, useMemo } from "react";
import { Label, Tag, Text } from "react-konva";

import { useTimelineContext } from "../../@contexts/Timeline";
import { KonvaPoint } from "../../@utils/konva";
import { TaskData } from "../../@utils/tasks";

export interface TaskTooltipProps extends KonvaPoint {
  task: TaskData;
}

const TASK_TOOLTIP_BACKGROUND = "black";
const TASK_TOOLTIP_COLOR = "white";
const TASK_TOOLTIP_POINTER_SIZE = 10;
const TASK_TOOLTIP_SHADOW_SIZE = 10;

/**
 * This component renders a task tooltip inside a canvas.
 */
const TaskTooltip: FC<TaskTooltipProps> = ({ task: { label: taskLabel }, x, y }) => {
  const {
    drawRange: { start: drawRangeStart },
  } = useTimelineContext();

  const adjustedX = useMemo(() => x + drawRangeStart, [drawRangeStart, x]);

  return (
    <Label x={adjustedX} y={y} opacity={0.75}>
      <Tag
        fill={TASK_TOOLTIP_BACKGROUND}
        lineJoin="round"
        pointerDirection="down"
        pointerHeight={TASK_TOOLTIP_POINTER_SIZE}
        pointerWidth={TASK_TOOLTIP_POINTER_SIZE}
        shadowBlur={TASK_TOOLTIP_SHADOW_SIZE}
        shadowColor={TASK_TOOLTIP_BACKGROUND}
        shadowOffsetX={TASK_TOOLTIP_SHADOW_SIZE}
        shadowOffsetY={TASK_TOOLTIP_SHADOW_SIZE}
        shadowOpacity={0.2}
      />
      <Text text={taskLabel} fill={TASK_TOOLTIP_COLOR} fontSize={18} padding={5} />
    </Label>
  );
};

export default TaskTooltip;
