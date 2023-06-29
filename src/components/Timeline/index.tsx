import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Group, Layer, Line, Stage, Text } from "react-konva";

import Grid, { Category } from "../Grid";

interface TimeRange {
  begin: number;
  end: number;
}

interface TimelineProps {
  categories: Category[];
  columnWidth?: number;
  hoursResolution?: number;
  timeRange: TimeRange;
}

interface StageSize {
  height: number;
  width: number;
}

const CATEGORIES_COLUMN_WIDTH = 200;

const COLUMN_WIDTH = 60;

const DEFAULT_STAGE_SIZE: StageSize = { height: 0, width: 0 };

const Timeline: FC<TimelineProps> = ({
  categories,
  columnWidth: externalColumnWidth = COLUMN_WIDTH,
  hoursResolution = 1,
  timeRange,
}) => {
  const [size, setSize] = useState<StageSize>(DEFAULT_STAGE_SIZE);
  const wrapper = useRef<HTMLDivElement>(null);

  const columnWidth = useMemo(
    () => (externalColumnWidth < COLUMN_WIDTH ? COLUMN_WIDTH : externalColumnWidth),
    [externalColumnWidth]
  );

  useEffect(() => {
    if (!wrapper.current) {
      return;
    }

    const { clientHeight: height, clientWidth: width } = wrapper.current;
    setSize({ height, width });
  }, []);

  const timeRangeDurationAsHours = useMemo(() => {
    const timeRangeDuration = timeRange.end - timeRange.begin;
    return Math.ceil(timeRangeDuration / (1000 * 60 * 60 * hoursResolution));
  }, [hoursResolution, timeRange]);

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
              hoursResolution={hoursResolution}
              width={stageWidth}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Timeline;
