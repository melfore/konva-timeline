import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Group, Layer, Line, Stage, Text } from "react-konva";

import { useTimelineContext } from "../../@contexts/Timeline";
import { getResolutionData } from "../../@utils/time-resolution";
import { TimelineInput } from "../../@utils/timeline";
import Grid from "../Grid";
import Resolutions from "../Resolutions";
import Tasks from "../Tasks";

const COLUMN_WIDTH = 60;

interface StageSize {
  height: number;
  width: number;
}

const RESOURCES_COLUMN_WIDTH = 200;

const DEFAULT_STAGE_SIZE: StageSize = { height: 0, width: 0 };

const Timeline: FC<TimelineInput> = ({
  columnWidth: externalColumnWidth,
  resolution: externalResolution = "1hrs",
  range,
}) => {
  const { hideResources, resources, wrapperHeight } = useTimelineContext();

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

  const resolutionData = useMemo(() => getResolutionData(resolution), [resolution]);
  const { columnSize: resolutionColumnSize, size: resolutionSize } = resolutionData;

  const columnWidth = useMemo(() => {
    return !externalColumnWidth || externalColumnWidth < COLUMN_WIDTH ? resolutionColumnSize : externalColumnWidth;
  }, [externalColumnWidth, resolutionColumnSize]);

  const timeRangeDurationAsHours = useMemo(() => {
    const timeRangeDuration = range.end - range.start;
    return Math.ceil(timeRangeDuration / (1000 * 60 * 60 * resolutionSize));
  }, [range, resolutionSize]);

  const stageWidth = useMemo(() => {
    return columnWidth * timeRangeDurationAsHours;
  }, [columnWidth, timeRangeDurationAsHours]);

  return (
    <div>
      <Resolutions resolution={resolution} onResolutionChange={setResolution} />
      <div
        style={{
          border: "1px solid black",
          display: "inline-block",
          height: wrapperHeight,
          overflow: "scroll",
          position: "relative",
          width: "100%",
        }}
      >
        {!hideResources && (
          <div
            style={{
              backgroundColor: "white",
              boxShadow: "4px 4px 32px 1px #0000000f",
              left: 0,
              height: wrapperHeight,
              position: "sticky",
              top: 0,
              width: RESOURCES_COLUMN_WIDTH,
              zIndex: 1,
            }}
          >
            <Stage height={size.height} width={RESOURCES_COLUMN_WIDTH}>
              <Layer>
                {resources.map(({ id, label }, index) => (
                  <Group x={0} y={0} key={`heading-${id}`}>
                    <Line y={50 * (index + 1)} points={[0, 0, RESOURCES_COLUMN_WIDTH, 0]} stroke="blue" />
                    <Text y={20 + 50 * index} text={label} />
                  </Group>
                ))}
              </Layer>
            </Stage>
          </div>
        )}
        <div
          ref={wrapper}
          style={{
            left: hideResources ? 0 : RESOURCES_COLUMN_WIDTH + 1,
            height: wrapperHeight,
            position: "absolute",
            top: 0,
            width: stageWidth,
          }}
        >
          <Stage height={size.height} width={stageWidth}>
            <Grid
              columnsCount={timeRangeDurationAsHours}
              columnWidth={columnWidth}
              height={size.height}
              resolution={resolutionData}
              timeRange={range}
              width={stageWidth}
            />
            <Tasks resolution={resolutionData} timeRange={range} />
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
