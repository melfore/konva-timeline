import React from "react";
import { Circle, Group, Line } from "react-konva";

import {
  CIRCLE_POINT_COLOR,
  CIRCLE_POINT_OFFSET,
  CIRCLE_POINT_STROKE,
  LINE_COLOR,
  LINE_TENSION,
  LINE_WIDTH,
  LineType,
} from "../../utils/line";

const LineKonva = ({ points }: LineType) => {
  return (
    <Group>
      <Line strokeWidth={LINE_WIDTH} lineJoin="round" stroke={LINE_COLOR} points={points} tension={LINE_TENSION} />
      <Circle
        x={points[0] + CIRCLE_POINT_OFFSET}
        y={points[1]}
        radius={4}
        stroke={CIRCLE_POINT_STROKE}
        fill={CIRCLE_POINT_COLOR}
        strokeWidth={1}
      />
      <Circle
        x={points[6] - CIRCLE_POINT_OFFSET}
        y={points[7]}
        radius={4}
        stroke={CIRCLE_POINT_STROKE}
        fill={CIRCLE_POINT_COLOR}
        strokeWidth={1}
      />
    </Group>
  );
};

export default LineKonva;
