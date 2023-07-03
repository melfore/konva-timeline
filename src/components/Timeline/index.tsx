import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Group, Layer, Line, Stage, Text } from "react-konva";

import Grid, { Category } from "../Grid";

const COLUMN_WIDTH = 60;

type Resolution = "1hrs" | "2hrs" | "4hrs" | "8hrs" | "12hrs";
// | "1day"
// | "1week"
// | "2weeks"
// | "1month"
// | "2months"
// | "3months"
// | "6months"
// | "1year";

type Scale = "hour" | "day" | "week" | "month" | "year";

export type ResolutionSetup = {
  columnSize: number;
  size: number;
  unit: Scale;
  scale: Scale;
  scaleUnits: number;
};

type ResolutionsSetup = {
  [key in Resolution]: ResolutionSetup;
};

const RESOLUTIONS_SETUP: ResolutionsSetup = {
  "1hrs": { columnSize: COLUMN_WIDTH, size: 1, unit: "hour", scale: "day", scaleUnits: 24 },
  "2hrs": { columnSize: COLUMN_WIDTH, size: 2, unit: "hour", scale: "day", scaleUnits: 24 },
  "4hrs": { columnSize: COLUMN_WIDTH, size: 4, unit: "hour", scale: "day", scaleUnits: 24 },
  "8hrs": { columnSize: COLUMN_WIDTH * 2, size: 8, unit: "hour", scale: "day", scaleUnits: 24 },
  "12hrs": { columnSize: COLUMN_WIDTH * 3, size: 12, unit: "hour", scale: "day", scaleUnits: 24 },
};

interface TimeRange {
  begin: number;
  end: number;
}

interface TimelineProps {
  categories: Category[];
  columnWidth?: number;
  resolution?: Resolution;
  timeRange: TimeRange;
}

interface StageSize {
  height: number;
  width: number;
}

const CATEGORIES_COLUMN_WIDTH = 200;

const DEFAULT_STAGE_SIZE: StageSize = { height: 0, width: 0 };

const Timeline: FC<TimelineProps> = ({
  categories,
  columnWidth: externalColumnWidth,
  resolution: externalResolution = "1hrs",
  timeRange,
}) => {
  const [size, setSize] = useState<StageSize>(DEFAULT_STAGE_SIZE);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapper.current) {
      return;
    }

    const { clientHeight: height, clientWidth: width } = wrapper.current;
    setSize({ height, width });
  }, []);

  const resolution = useMemo(() => RESOLUTIONS_SETUP[externalResolution].size, [externalResolution]);

  const columnWidth = useMemo(() => {
    const resolutionColumnWidth = RESOLUTIONS_SETUP[externalResolution].columnSize;
    return !externalColumnWidth || externalColumnWidth < COLUMN_WIDTH ? resolutionColumnWidth : externalColumnWidth;
  }, [externalColumnWidth, externalResolution]);

  const timeRangeDurationAsHours = useMemo(() => {
    const timeRangeDuration = timeRange.end - timeRange.begin;
    return Math.ceil(timeRangeDuration / (1000 * 60 * 60 * resolution));
  }, [resolution, timeRange]);

  const stageWidth = useMemo(() => {
    return columnWidth * timeRangeDurationAsHours;
  }, [columnWidth, timeRangeDurationAsHours]);

  return (
    <div
      style={{
        backgroundColor: "black",
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
          minHeight: "300px",
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
                <Line y={50 * (index + 1)} points={[0, 0, CATEGORIES_COLUMN_WIDTH, 0]} stroke="black" />
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
          minHeight: "300px",
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
              resolution={RESOLUTIONS_SETUP[externalResolution]}
              width={stageWidth}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Timeline;
