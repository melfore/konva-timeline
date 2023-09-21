import React, { memo, useMemo } from "react";

import { useTimelineContext } from "../../@contexts/Timeline";
import { KonvaLine } from "../../@konva";

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

  return <KonvaLine points={[drawRangeStart, yPos, drawRangeEnd, yPos]} stroke={themeColor} />;
};

export default memo(GridRow);
