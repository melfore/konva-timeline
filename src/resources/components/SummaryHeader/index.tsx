import React, { memo, useMemo } from "react";
import { Group, Rect } from "react-konva";

import { KonvaLine, KonvaRect, KonvaText } from "../../../@konva";
import { useTimelineContext } from "../../../timeline/TimelineContext";
import { DEFAULT_TEXT_SIZE } from "../../../utils/dimensions";
import {
  ALTERNATIVE_ROW,
  DEFAULT_ROW_DARK_MODE,
  DEFAULT_ROW_LIGHT_MODE,
  DEFAULT_STROKE_DARK_MODE,
  DEFAULT_STROKE_LIGHT_MODE,
} from "../../../utils/theme";
//import { RESOURCE_HEADER_WIDTH } from "../../utils/resources";

interface SummaryHeaderProps {
  /**
   * The row index of current resource
   */
  index: number;
  /**
   * Flag to identify if resource is last to be shown
   */
  isLast?: boolean;
  /**
   * The resource object to handle
   */
  id: string;
}

/**
 * This component renders a resource header. It displays a text (`resource.label`) and a delimiter line.
 */
const SummaryHeader = ({ index, isLast = false, id }: SummaryHeaderProps) => {
  const {
    rowHeight,
    theme: { color: themeColor },
    summaryWidth,
    summary,
    summaryHeader,
    //onResourceClick,
  } = useTimelineContext();

  const rowPoints = useMemo(() => [0, rowHeight, summaryWidth, rowHeight], [rowHeight, summaryWidth]);

  const yCoordinate = useMemo(() => rowHeight * index, [index, rowHeight]);

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

  const konvaText = useMemo(() => {
    if (!summary) {
      return "🚫";
    }
    if (index === 0) {
      return summaryHeader ? summaryHeader : summary[0].label;
    }
    const data = summary.find((i) => i.id === id);
    if (!data) {
      return "🚫";
    }
    return data.label;
  }, [summary, id, index, summaryHeader]);

  /*const onClick = useCallback(
    () => onResourceClick && !header && onResourceClick(resource),
    [resource, header, onResourceClick]
  );*/
  return (
    <Group y={yCoordinate}>
      <Rect width={summaryWidth} height={rowHeight} />
      <KonvaText
        fill={themeColor}
        fontSize={DEFAULT_TEXT_SIZE}
        height={rowHeight}
        width={summaryWidth}
        text={konvaText}
        verticalAlign="middle"
        align="center"
        ellipsis={true}
        wrap="none"
      />
      {!isLast && (
        <Group>
          <KonvaLine points={rowPoints} stroke={stroke} />
          <KonvaRect x={0} y={rowHeight} width={summaryWidth} height={rowHeight} fill={fill} />
        </Group>
      )}
    </Group>
  );
};

export const SummaryHeaderDocs = SummaryHeader;

export default memo(SummaryHeader);
