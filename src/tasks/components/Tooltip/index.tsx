import React, { FC, useMemo } from "react";
import { Label, Tag, Text } from "react-konva";
import { DateTime } from "luxon";

import { useTimelineContext } from "../../../timeline/TimelineContext";
import { KonvaPoint } from "../../../utils/konva";
import { TaskData } from "../../utils/tasks";

export interface TaskTooltipProps extends KonvaPoint {
  task: TaskData;
}

const TASK_TOOLTIP_BACKGROUND = "black";
const TASK_TOOLTIP_COLOR = "black";
const TASK_TOOLTIP_POINTER_SIZE = 15;
const TASK_TOOLTIP_SHADOW_SIZE = 10;

/**
 * This component renders a task tooltip inside a canvas.
 */
const TaskTooltip: FC<TaskTooltipProps> = ({
  task: {
    label: taskLabel,
    resourceId,
    completedPercentage,
    time: { start, end },
  },
  x,
  y,
}) => {
  const {
    drawRange: { start: drawStart, end: drawEnd },
  } = useTimelineContext();
  const txt = useMemo(() => {
    const label = "LABEL: " + taskLabel + "\n";
    const resources = "RESID: " + resourceId + "\n";
    const startDuration = "START: " + DateTime.fromMillis(Number(start)).toISO() + "\n";
    const endDuration = "END:    " + DateTime.fromMillis(Number(end)).toISO();
    const complete = completedPercentage ? "\n" + "COMPLETED: " + completedPercentage + "%" : "";
    return label + resources + startDuration + endDuration + complete;
  }, [taskLabel, resourceId, completedPercentage, start, end]);

  const pointerDir = useMemo(() => {
    const part = (drawEnd - drawStart) / 5;
    if (x < drawStart + part) {
      return "left";
    }
    if (x > drawEnd - part) {
      return "right";
    }
    if (resourceId === "1") {
      return "up";
    }
    return "down";
  }, [resourceId, drawEnd, drawStart, x]);
  return (
    <Label x={x} y={y} opacity={1}>
      <Tag
        fill="white"
        lineJoin="round"
        stroke="black"
        strokeWidth={1}
        pointerDirection={pointerDir}
        pointerHeight={TASK_TOOLTIP_POINTER_SIZE}
        pointerWidth={TASK_TOOLTIP_POINTER_SIZE}
        shadowBlur={TASK_TOOLTIP_SHADOW_SIZE}
        shadowColor={TASK_TOOLTIP_BACKGROUND}
        shadowOffsetX={TASK_TOOLTIP_SHADOW_SIZE}
        shadowOffsetY={TASK_TOOLTIP_SHADOW_SIZE}
        shadowOpacity={0.2}
      />
      <Text text={txt} fill={TASK_TOOLTIP_COLOR} fontSize={15} padding={6} />
    </Label>
  );
};

export default TaskTooltip;
