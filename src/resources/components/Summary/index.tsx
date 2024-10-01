import React, { FC } from "react";
import { Layer } from "react-konva";

import { useTimelineContext } from "../../../timeline/TimelineContext";
import SummaryHeader from "../SummaryHeader";

interface ResourcesLayerProps {}

/**
 * This component renders a Konva layer containing one header for each resource (`Summary`).
 */
const SummaryLayer: FC<ResourcesLayerProps> = () => {
  const { resources } = useTimelineContext();

  return (
    <Layer>
      {resources.map((data, index) => {
        const isLast = index === resources.length - 1;

        return <SummaryHeader key={`summary-${data.id}`} index={index} isLast={isLast} id={data.id} />;
      })}
    </Layer>
  );
};

export default SummaryLayer;
