import React, { FC } from "react";
import { Layer } from "react-konva";

import { useTimelineContext } from "../../../timeline/TimelineContext";
import ResourceHeader from "../Header";

export interface ResourcesLayerProps {}

/**
 * This component renders a Konva layer containing one header for each resource (`ResourceHeader`).
 */
const ResourcesLayer: FC<ResourcesLayerProps> = () => {
  const { resources } = useTimelineContext();

  return (
    <Layer>
      {resources.map((resource, index) => {
        const isLast = index === resources.length - 1;
        const header = index === 0 ? true : false;

        return (
          <ResourceHeader
            key={`resource-${resource.id}`}
            index={index}
            isLast={isLast}
            resource={resource}
            header={header}
          />
        );
      })}
    </Layer>
  );
};

export default ResourcesLayer;
