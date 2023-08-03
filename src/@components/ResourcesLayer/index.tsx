import React, { FC } from "react";
import { Layer } from "react-konva";

import { useTimelineContext } from "../../@contexts/Timeline";
import ResourceHeader from "../ResourceHeader";

interface ResourcesLayerProps {}

/**
 * This component renders the complete list of resource headers
 */
const ResourcesLayer: FC<ResourcesLayerProps> = () => {
  const { resources } = useTimelineContext();

  return (
    <Layer listening={false}>
      {resources.map((resource, index) => (
        <ResourceHeader {...resource} index={index} />
      ))}
    </Layer>
  );
};

export default ResourcesLayer;
