import React, { memo, useMemo } from "react";

import { KonvaGroup, KonvaLine, KonvaRect } from "../../@konva";
import { useTimelineContext } from "../../timeline/TimelineContext";

interface GridRowProps {
  index: number;
}

const GridRow = ({ index }: GridRowProps) => {
  const {
    drawRange: { start: drawRangeStart, end: drawRangeEnd },
    rowHeight,
    theme: { color: themeColor },
  } = useTimelineContext();

  const yPos = useMemo(() => rowHeight * (index + 1), [index, rowHeight]);

  const fill = useMemo(() => (index % 2 === 0 ? "#F0F0F0" : "rgb(255,255,255)"), [index]);

  return (
    <KonvaGroup>
      <KonvaLine points={[drawRangeStart, yPos, drawRangeEnd, yPos]} stroke={themeColor} />
      <KonvaRect x={drawRangeStart} y={yPos} width={drawRangeEnd - drawRangeStart} height={rowHeight} fill={fill} />
    </KonvaGroup>
  );
};

export default memo(GridRow);
