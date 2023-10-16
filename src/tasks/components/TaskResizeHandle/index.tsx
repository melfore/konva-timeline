import React, { useCallback, useMemo } from "react";
import { Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import { useTimelineContext } from "../../../timeline/TimelineContext";
import { TASK_BORDER_RADIUS } from "../../utils/tasks";

interface TaskResizeHandleProps {
  height: number;
  onResizeStart: (e: KonvaEventObject<DragEvent>) => void;
  onResizeMove: (e: KonvaEventObject<DragEvent>, position: "lx" | "rx") => void;
  onResizeEnd: (e: KonvaEventObject<DragEvent>) => void;
  opacity: number;
  position: "lx" | "rx";
  taskId: string;
  xCoordinate: number;
}

const TaskResizeHandle = ({
  height,
  onResizeEnd,
  onResizeMove,
  onResizeStart,
  opacity,
  position,
  taskId,
  xCoordinate,
}: TaskResizeHandleProps) => {
  const { enableResize } = useTimelineContext();

  const onDragMove = useCallback(
    (e: KonvaEventObject<DragEvent>) => onResizeMove(e, position),
    [onResizeMove, position]
  );

  const onMouseLeave = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      e.cancelBubble = true;
      const stage = e.target.getStage();
      if (!stage || !enableResize) {
        return;
      }

      stage.container().style.cursor = "default";
    },
    [enableResize]
  );

  const onMouseOver = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      e.cancelBubble = true;
      const stage = e.target.getStage();
      if (!stage || !enableResize) {
        return;
      }

      const mouseCursor = `${position === "lx" ? "w" : "e"}-resize`;
      stage.container().style.cursor = mouseCursor;
    },
    [enableResize, position]
  );

  const handleId = useMemo(() => `${taskId}-resize-${position}`, [position, taskId]);

  return (
    <Rect
      id={handleId}
      draggable={enableResize}
      fill="transparent"
      height={height}
      onDragStart={onResizeStart}
      onDragMove={onDragMove}
      onDragEnd={onResizeEnd}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      opacity={opacity}
      width={TASK_BORDER_RADIUS}
      x={xCoordinate}
      y={0}
    />
  );
};

export default TaskResizeHandle;
