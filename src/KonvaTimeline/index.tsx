import React, { FC } from "react";

import Timeline from "../@components/Timeline";
import { TimelineProvider } from "../@contexts/Timeline";
import { TimelineInput } from "../@utils/timeline";

interface KonvaTimelineProps extends TimelineInput {
  /**
   * Flag to enable debug mode logging
   */
  debug?: boolean;
}

const KonvaTimeline: FC<KonvaTimelineProps> = (props) => {
  return (
    <TimelineProvider {...props}>
      <Timeline {...props} />
    </TimelineProvider>
  );
};

export default KonvaTimeline;
