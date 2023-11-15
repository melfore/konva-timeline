import React, { memo, useMemo } from "react";

import { KonvaGroup, KonvaLine, KonvaRect } from "../../@konva";
import { useTimelineContext } from "../../timeline/TimelineContext";
import {
  ALTERNATIVE_ROW,
  DEFAULT_ROW_DARK_MODE,
  DEFAULT_ROW_LIGHT_MODE,
  DEFAULT_STROKE_DARK_MODE,
  DEFAULT_STROKE_LIGHT_MODE,
} from "../../utils/theme";

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

  const fill = useMemo(() => {
    if (themeColor === "black") {
      return index % 2 === 0 ? DEFAULT_ROW_LIGHT_MODE : ALTERNATIVE_ROW;
    }
    return index % 2 === 0 ? DEFAULT_ROW_DARK_MODE : ALTERNATIVE_ROW;
  }, [index, themeColor]);

  const stroke = useMemo(() => {
    if (themeColor === "black") {
      return DEFAULT_STROKE_LIGHT_MODE;
    }
    return DEFAULT_STROKE_DARK_MODE;
  }, [themeColor]);

  return (
    <KonvaGroup>
      <KonvaLine points={[drawRangeStart, yPos, drawRangeEnd, yPos]} stroke={stroke} />
      <KonvaRect x={drawRangeStart} y={yPos} width={drawRangeEnd - drawRangeStart} height={rowHeight} fill={fill} />
    </KonvaGroup>
  );
};

export default memo(GridRow);
