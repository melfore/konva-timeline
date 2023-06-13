import React, { CSSProperties, FC, useEffect, useMemo, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";

import Grid, { User } from "../Grid";
import Tasks, { Task } from "../Tasks";

interface TimelineProps {
  interval: "day";
  resolution: "hours";
  tasks: Task[];
  users: User[];
}

const Timeline: FC<TimelineProps> = ({ interval, resolution, tasks, users }) => {
  const [size, setSize] = useState({ height: 0, width: 0 });
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapper.current) {
      return;
    }

    const { clientHeight, clientWidth } = wrapper.current;

    setSize({ height: clientHeight, width: clientWidth });
  }, []);

  const wrapperStyle = useMemo(
    (): CSSProperties => ({
      backgroundColor: "aqua",
      minHeight: "300px",
      width: "100%",
    }),
    []
  );

  const resolutionFactor = useMemo(() => {
    if (interval === "day" && resolution === "hours") {
      return 24;
    }

    return 7;
  }, [interval, resolution]);

  return (
    <div ref={wrapper} style={wrapperStyle}>
      <Stage height={size.height} width={size.width} style={{ backgroundColor: "yellow" }}>
        <Layer>
          <Grid height={size.height} width={size.width} resolutionFactor={resolutionFactor} users={users} />
        </Layer>
        <Layer>
          <Tasks resolutionFactor={resolutionFactor} tasks={tasks} users={users} width={size.width} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Timeline;
