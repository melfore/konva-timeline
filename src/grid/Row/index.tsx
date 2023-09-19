import React, { memo, useMemo } from "react";

import { KonvaLine } from "../../@components/@konva";
import { useTimelineContext } from "../../@contexts/Timeline";
import { RESOURCE_HEADER_HEIGHT } from "../../@utils/resources";

interface GridRowProps {
  index: number;
}

const GridRow = ({ index }: GridRowProps) => {
  const {
    drawRange: { start: drawRangeStart, end: drawRangeEnd },
    theme: { color: themeColor },
  } = useTimelineContext();

  const yPos = useMemo(() => RESOURCE_HEADER_HEIGHT * (index + 1), [index]);

  return <KonvaLine points={[drawRangeStart, yPos, drawRangeEnd, yPos]} stroke={themeColor} />;
};

export default memo(GridRow);
