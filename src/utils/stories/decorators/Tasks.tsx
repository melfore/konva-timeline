import React, { useEffect, useMemo, useRef } from "react";
import { Layer, Stage } from "react-konva";
import { Decorator } from "@storybook/react";

import { TimelineProvider, useTimelineContext } from "../../../timeline/TimelineContext";
import { generateStoryData } from "../utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const COLOR_ARG_TYPE: any = {
  control: {
    type: "color",
  },
};

export const STORY_DATA = generateStoryData({
  averageTaskDurationInMinutes: 180,
  resourcesCount: 3,
  tasksCount: 10,
  timeRangeInDays: 1,
});

export const LayerDecorator: Decorator = (Story) => {
  return <Layer>{Story()}</Layer>;
};

export const TaskDecorator: Decorator = (Story) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const { width } = wrapperRef.current.getBoundingClientRect();
    setWidth(width);
  }, []);

  return (
    <TimelineProvider
      {...STORY_DATA}
      onTaskClick={(task) => alert(`OnTaskClick event handler - TaskId: ${task.id}`)}
      onTaskChange={(task) => alert(`OnTaskChange event handler - TaskId: ${task.id}`)}
      resolution="1hrs"
    >
      <div ref={wrapperRef}>
        <Stage height={200} width={width}>
          <Layer>{Story()}</Layer>
        </Stage>
      </div>
    </TimelineProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TasksLayerInternalDecorator = ({ storyFn }: any) => {
  const { setDrawRange } = useTimelineContext();

  const stageWidth = useMemo(() => 60 * 24, []);

  useEffect(() => {
    setDrawRange({ start: 0, end: stageWidth + 200 });
  }, [setDrawRange, stageWidth]);

  return (
    <div>
      <Stage height={200} width={60 * 24}>
        {storyFn()}
      </Stage>
    </div>
  );
};

export const TasksLayerDecorator: Decorator = (Story) => {
  return (
    <TimelineProvider
      {...STORY_DATA}
      onTaskClick={(task) => alert(`OnTaskClick event handler - TaskId: ${task.id}`)}
      onTaskChange={(task) => alert(`OnTaskChange event handler - TaskId: ${task.id}`)}
      resolution="1hrs"
    >
      <TasksLayerInternalDecorator storyFn={Story} />
    </TimelineProvider>
  );
};
