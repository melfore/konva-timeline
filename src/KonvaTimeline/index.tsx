import React, { FC } from "react";

import Timeline from "../timeline";
import { TimelineProvider, TimelineProviderProps } from "../timeline/TimelineContext";

const KonvaTimeline: FC<TimelineProviderProps> = (props) => {
  return (
    <TimelineProvider {...props}>
      <Timeline />
    </TimelineProvider>
  );
};

export default KonvaTimeline;
