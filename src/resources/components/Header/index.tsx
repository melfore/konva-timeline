import React, { memo, useMemo } from "react";

import { KonvaGroup, KonvaLine, KonvaRect, KonvaText } from "../../../@konva";
import { useTimelineContext } from "../../../timeline/TimelineContext";
import { DEFAULT_STROKE_WIDTH, DEFAULT_TEXT_SIZE } from "../../../utils/dimensions";
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
}

/**
 * This component renders a resource header. It displays a text (`resource.label`) and a delimiter line.
 */
const ResourceHeader = ({ index, isLast = false, resource }: ResourceHeaderProps) => {
  const {
    rowHeight,
    theme: { color: themeColor },
  } = useTimelineContext();

  const rowPoints = useMemo(() => [0, rowHeight, RESOURCE_HEADER_WIDTH, rowHeight], [rowHeight]);

  const yCoordinate = useMemo(() => rowHeight * index, [index, rowHeight]);

  const fill = useMemo(() => (index % 2 === 0 ? "#F0F0F0" : "rgb(255,255,255)"), [index]);

  return (
    <KonvaGroup y={yCoordinate}>
      <KonvaText
        fill={themeColor}
        fontSize={DEFAULT_TEXT_SIZE}
        height={rowHeight}
        text={resource.label}
        verticalAlign="middle"
        x={RESOURCE_TEXT_OFFSET}
      />
      {!isLast && (
        <KonvaGroup>
          <KonvaLine points={rowPoints} stroke={themeColor} strokeWidth={DEFAULT_STROKE_WIDTH} />
          <KonvaRect x={0} y={rowHeight} width={RESOURCE_HEADER_WIDTH} height={rowHeight} fill={fill} />
        </KonvaGroup>
      )}
    </KonvaGroup>
  );
};

export const ResourceHeaderDocs = ResourceHeader;

export default memo(ResourceHeader);
