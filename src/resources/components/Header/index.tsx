import React, { memo, useMemo } from "react";

import { KonvaGroup, KonvaLine, KonvaText } from "../../../@konva";
import { useTimelineContext } from "../../../timeline/TimelineContext";
import { Resource, RESOURCE_HEADER_WIDTH } from "../../utils/resources";

interface ResourceHeaderProps extends Resource {
  index: number;
}

/**
 * This component renders a Resource header with text and delimiter line
 *
 * The playground has a simulated canvas with height: 200px and width: 100%
 */
const ResourceHeader = ({ index, label }: ResourceHeaderProps) => {
  const {
    rowHeight,
    theme: { color: themeColor },
  } = useTimelineContext();

  const yCoordinate = useMemo(() => rowHeight * (index + 1), [index, rowHeight]);

  const textOffset = useMemo(() => rowHeight * 0.35, [rowHeight]);

  const textYCoordinate = useMemo(() => rowHeight * index, [index, rowHeight]);

  return (
    <KonvaGroup x={0} y={0}>
      <KonvaGroup x={textOffset} y={textOffset}>
        <KonvaText fill={themeColor} text={label} y={textYCoordinate} />
      </KonvaGroup>
      <KonvaLine points={[0, 0, RESOURCE_HEADER_WIDTH, 0]} stroke={themeColor} y={yCoordinate} />
    </KonvaGroup>
  );
};

export const ResourceHeaderDocs = ResourceHeader;

export default memo(ResourceHeader);
