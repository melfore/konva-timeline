import React, { FC } from "react";

import Timeline from "../@components/Timeline";
import { TimelineProvider } from "../@contexts/Timeline";
import { TimelineInput } from "../@utils/timeline-utils";

const KonvaTimeline: FC<TimelineInput> = (props) => {
  return (
    <TimelineProvider {...props}>
      <Timeline {...props} />
    </TimelineProvider>
  );
};

export default KonvaTimeline;
