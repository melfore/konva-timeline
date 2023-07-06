import React, { FC, useCallback, useState } from "react";
import { Label, Layer, Tag, Text } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import { Resource } from "../../@utils/resources";
import { TaskData } from "../../@utils/tasks";
import { TimeRange } from "../../@utils/time-range";
import { ResolutionData } from "../../@utils/time-resolution";
import Task from "../Task";

interface TasksProps {
  resolution: ResolutionData;
  resources: Resource[];
  tasks: TaskData[];
  timeRange: TimeRange;
}

const Tasks: FC<TasksProps> = ({ resolution, resources, tasks, timeRange }) => {
  const [task, setTask] = useState<{ x: number; y: number; id: string } | null>(null);

  const getResourceById = useCallback(
    (resourceId: string) => resources.findIndex(({ id }) => resourceId === id),
    [resources]
  );

  const onTaskOver = useCallback((e: KonvaEventObject<MouseEvent>) => {
    const task = e.target;
    if (!task) {
      return setTask(null);
    }

    const mousePosition = task.getStage()?.getPointerPosition();
    if (!mousePosition) {
      return setTask(null);
    }

    const { x, y } = mousePosition;
    setTask({ x, y, id: task.id() });
  }, []);

  function tooltip() {
    if (!task) {
      return null;
    }

    return (
      <Label x={task.x} y={task.y} opacity={0.75}>
        <Tag
          fill={"black"}
          pointerDirection={"down"}
          pointerWidth={10}
          pointerHeight={10}
          lineJoin={"round"}
          shadowColor={"black"}
          shadowBlur={10}
          shadowOffsetX={10}
          shadowOffsetY={10}
          shadowOpacity={0.2}
        />
        <Text text={task.id} fill={"white"} fontSize={18} padding={5} />
      </Label>
    );
  }

  return (
    <Layer onMouseOver={onTaskOver} onMouseMove={onTaskOver} onMouseLeave={() => setTask(null)}>
      {tasks.map(({ id, label, resourceId, time }, index) => {
        const resourceIndex = getResourceById(resourceId);
        if (resourceIndex < 0) {
          return null;
        }

        const { color: resourceColor } = resources[resourceIndex];
        const xBegin = ((time.start - timeRange.start) / (1000 * 60 * 60 * resolution.size)) * resolution.columnSize;
        const width = ((time.end - time.start) / (1000 * 60 * 60 * resolution.size)) * resolution.columnSize;
        return (
          <Task
            key={`task-${index}`}
            id={id}
            color={resourceColor}
            label={label}
            x={xBegin}
            y={50 * (resourceIndex + 1) + 5}
            width={width}
          />
        );
      })}
      {tooltip()}
    </Layer>
  );
};

export default Tasks;
