import React, { memo, useMemo } from "react";

import { KonvaGroup, KonvaLine, KonvaText } from "../../../@konva";
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
 * This component renders a Resource header with text and delimiter line. It uses as text the `resource.label` attribute
 *
 * The playground has a simulated canvas with height: 200px and width: 100%
 */
const ResourceHeader = ({ index, isLast = false, resource }: ResourceHeaderProps) => {
  const {
    rowHeight,
    theme: { color: themeColor },
  } = useTimelineContext();

  const rowPoints = useMemo(() => [0, rowHeight, RESOURCE_HEADER_WIDTH, rowHeight], [rowHeight]);

  const yCoordinate = useMemo(() => rowHeight * index, [index, rowHeight]);

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
      {!isLast && <KonvaLine points={rowPoints} stroke={themeColor} strokeWidth={DEFAULT_STROKE_WIDTH} />}
    </KonvaGroup>
  );
};

export const ResourceHeaderDocs = ResourceHeader;

export default memo(ResourceHeader);
