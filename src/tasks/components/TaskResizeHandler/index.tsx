import React, { useMemo } from "react";
import { Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

interface TaskResizeHandlerProps {
  height: number;
  onResizeStart: (e: KonvaEventObject<DragEvent>) => void;
  onResizeMove: (e: KonvaEventObject<DragEvent>, position: "lx" | "rx") => void;
  onResizeEnd: (e: KonvaEventObject<DragEvent>) => void;
  opacity: number;
  position: "lx" | "rx";
  taskId: string;
  xCoordinate: number;
}

const TASK_BORDER_RADIUS = 4;

const TaskResizeHandler = ({
  height,
  onResizeEnd,
  onResizeMove,
  onResizeStart,
  opacity,
  position,
  taskId,
  xCoordinate,
}: TaskResizeHandlerProps) => {
  const overCursor = useMemo(() => `${position === "lx" ? "w" : "e"}-resize`, [position]);

  return (
    <Rect
      id={`${taskId}-resize-${position}`}
      draggable
      fill="transparent"
      height={height}
      onDragStart={onResizeStart}
      onDragMove={(e) => onResizeMove(e, position)}
      onDragEnd={onResizeEnd}
      onMouseOver={(e) => {
        e.cancelBubble = true;
        const stage = e.target.getStage();
        if (!stage) {
          return;
        }

        stage.container().style.cursor = overCursor;
      }}
      onMouseLeave={(e) => {
        e.cancelBubble = true;
        const stage = e.target.getStage();
        if (!stage) {
          return;
        }

        stage.container().style.cursor = "default";
      }}
      opacity={opacity}
      width={TASK_BORDER_RADIUS}
      x={xCoordinate}
      y={0}
    />
  );
};

export default TaskResizeHandler;
