import React, { memo, useCallback, useMemo } from "react";
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
import { Resource, RESOURCE_HEADER_WIDTH, RESOURCE_TEXT_OFFSET } from "../../utils/resources";

interface ResourceHeaderProps {
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
  resource: Resource;
  /**
   * On click event
   */
  onClick?: () => void;
  /**
   * Prop that idicate if resource is header
   */
  header?: boolean;
}

/**
 * This component renders a resource header. It displays a text (`resource.label`) and a delimiter line.
 */
const ResourceHeader = ({ index, isLast = false, resource, header }: ResourceHeaderProps) => {
  const {
    rowHeight,
    theme: { color: themeColor },
    onResourceClick,
  } = useTimelineContext();

  const rowPoints = useMemo(() => [0, rowHeight, RESOURCE_HEADER_WIDTH, rowHeight], [rowHeight]);

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

  const onClick = useCallback(
    () => onResourceClick && !header && onResourceClick(resource),
    [resource, header, onResourceClick]
  );

  return (
    <Group y={yCoordinate}>
      <Rect onClick={onClick} width={RESOURCE_HEADER_WIDTH} height={rowHeight} />
      <KonvaText
        fill={themeColor}
        fontSize={DEFAULT_TEXT_SIZE}
        height={rowHeight}
        text={resource.label}
        verticalAlign="middle"
        x={RESOURCE_TEXT_OFFSET}
      />
      {!isLast && (
        <Group>
          <KonvaLine points={rowPoints} stroke={stroke} />
          <KonvaRect x={0} y={rowHeight} width={RESOURCE_HEADER_WIDTH} height={rowHeight} fill={fill} />
        </Group>
      )}
    </Group>
  );
};

export const ResourceHeaderDocs = ResourceHeader;

export default memo(ResourceHeader);
