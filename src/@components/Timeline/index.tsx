import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Group, Layer, Line, Stage, Text } from "react-konva";

import { Resolution, TimelineInput } from "../../@utils/timeline-utils";
import Grid from "../Grid";
import Tasks from "../Tasks";

const COLUMN_WIDTH = 60;

type Scale = "hour" | "day" | "week" | "month" | "year";

export type ResolutionSetup = {
  columnSize: number;
  label: string;
  size: number;
  unit: Scale;
  scale: Scale;
  scaleUnits: number;
};

type ResolutionsSetup = {
  [key in Resolution]: ResolutionSetup;
};

const RESOLUTIONS_SETUP: ResolutionsSetup = {
  "1hrs": { columnSize: COLUMN_WIDTH, label: "1 Hour", size: 1, unit: "hour", scale: "day", scaleUnits: 24 },
  "2hrs": { columnSize: COLUMN_WIDTH, label: "2 Hours", size: 2, unit: "hour", scale: "day", scaleUnits: 24 },
  "6hrs": { columnSize: COLUMN_WIDTH * 2, label: "1/4 of Day", size: 6, unit: "hour", scale: "day", scaleUnits: 24 },
  "12hrs": { columnSize: COLUMN_WIDTH * 3, label: "1/2 of Day", size: 12, unit: "hour", scale: "day", scaleUnits: 24 },
};

interface StageSize {
  height: number;
  width: number;
}

const CATEGORIES_COLUMN_WIDTH = 200;

const DEFAULT_STAGE_SIZE: StageSize = { height: 0, width: 0 };

const Timeline: FC<TimelineInput> = ({
  categories,
  columnWidth: externalColumnWidth,
  resolution: externalResolution = "1hrs",
  tasks,
  range,
}) => {
  const [resolution, setResolution] = useState(externalResolution);
  const [size, setSize] = useState<StageSize>(DEFAULT_STAGE_SIZE);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapper.current) {
      return;
    }

    const { clientHeight: height, clientWidth: width } = wrapper.current;
    setSize({ height, width });
  }, []);

  useEffect(() => {
    setResolution(externalResolution);
  }, [externalResolution]);

  const resolutionSize = useMemo(() => RESOLUTIONS_SETUP[resolution].size, [resolution]);

  const columnWidth = useMemo(() => {
    const resolutionColumnWidth = RESOLUTIONS_SETUP[resolution].columnSize;
    return !externalColumnWidth || externalColumnWidth < COLUMN_WIDTH ? resolutionColumnWidth : externalColumnWidth;
  }, [externalColumnWidth, resolution]);

  const timeRangeDurationAsHours = useMemo(() => {
    const timeRangeDuration = range.end - range.start;
    return Math.ceil(timeRangeDuration / (1000 * 60 * 60 * resolutionSize));
  }, [range, resolutionSize]);

  const stageWidth = useMemo(() => {
    return columnWidth * timeRangeDurationAsHours;
  }, [columnWidth, timeRangeDurationAsHours]);

  const resolutions = Object.keys(RESOLUTIONS_SETUP) as Resolution[];

  return (
    <div>
      <div style={{ margin: `16px 0`, width: "100%" }}>
        <span>Select Resolution</span>:
        {resolutions.map((key) => (
          <button
            key={`button-resolution-${key}`}
            disabled={key === resolution}
            onClick={() => setResolution(key)}
            style={{ margin: "0 8px" }}
          >
            {RESOLUTIONS_SETUP[key].label}
          </button>
        ))}
      </div>
      <div
        style={{
          border: "1px solid black",
          display: "inline-block",
          overflow: "scroll",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "4px 4px 32px 1px #0000000f",
            left: 0,
            height: (categories.length + 1) * 50,
            position: "sticky",
            top: 0,
            width: "200px",
            zIndex: 1,
          }}
        >
          <Stage height={size.height} width={CATEGORIES_COLUMN_WIDTH}>
            <Layer>
              {[{ id: -1, label: "Header" }, ...categories].map((heading, index) => (
                <Group x={0} y={0} key={`heading-${heading.id}`}>
                  <Line y={50 * (index + 1)} points={[0, 0, CATEGORIES_COLUMN_WIDTH, 0]} stroke="blue" />
                  <Text y={20 + 50 * index} text={heading.label} />
                </Group>
              ))}
            </Layer>
          </Stage>
        </div>
        <div
          ref={wrapper}
          style={{
            backgroundColor: "white",
            left: "201px",
            height: (categories.length + 1) * 50,
            position: "absolute",
            top: 0,
            width: stageWidth,
          }}
        >
          <Stage height={size.height} width={stageWidth}>
            <Layer>
              <Grid
                categories={categories}
                columnsCount={timeRangeDurationAsHours}
                columnWidth={columnWidth}
                height={size.height}
                resolution={RESOLUTIONS_SETUP[resolution]}
                timeRange={range}
                width={stageWidth}
              />
            </Layer>
            <Tasks categories={categories} resolution={RESOLUTIONS_SETUP[resolution]} tasks={tasks} timeRange={range} />
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
