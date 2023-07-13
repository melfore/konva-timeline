import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Group, Layer, Line, Stage, Text } from "react-konva";
import Konva from "konva";

import { useTimelineContext } from "../../@contexts/Timeline";
import { TimelineInput } from "../../@utils/timeline";
import Grid from "../Grid";
import Tasks from "../Tasks";

const COLUMN_WIDTH = 60;

interface StageSize {
  height: number;
  width: number;
}

const RESOURCES_COLUMN_WIDTH = 200;

const DEFAULT_STAGE_SIZE: StageSize = { height: 0, width: 0 };

const Timeline: FC<TimelineInput> = ({ columnWidth: externalColumnWidth }) => {
  const { hideResources, resolution, resources, timeBlocks, wrapperHeight } = useTimelineContext();

  const [size, setSize] = useState<StageSize>(DEFAULT_STAGE_SIZE);
  const stageRef = useRef<Konva.Stage>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const repositionStage = useCallback(() => {
    if (!wrapper.current || !stageRef.current) {
      return;
    }

    var dx = wrapper.current.scrollLeft;
    var dy = wrapper.current.scrollTop;
    console.log("=> repositionStage", { dx, dy });
    stageRef.current.container().style.transform = "translate(" + dx + "px, " + dy + "px)";
    stageRef.current.x(-dx);
    stageRef.current.y(-dy);
  }, []);

  useEffect(() => {
    if (!wrapper.current) {
      return;
    }

    const { clientHeight: height, clientWidth: width } = wrapper.current;
    wrapper.current.addEventListener("scroll", repositionStage);
    setSize({ height, width });
    repositionStage();
  }, [repositionStage]);

  const columnWidth = useMemo(() => {
    return !externalColumnWidth || externalColumnWidth < COLUMN_WIDTH ? resolution.columnSize : externalColumnWidth;
  }, [externalColumnWidth, resolution]);

  const stageWidth = useMemo(() => columnWidth * timeBlocks.length, [columnWidth, timeBlocks]);

  return (
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
          overflow: "auto",
          position: "absolute",
          top: 0,
          // width: stageWidth,
          width: "calc(100% - 200px)",
        }}
      >
        <div style={{ height: size.height, overflow: "hidden", width: stageWidth }}>
          <Stage ref={stageRef} height={size.height} width={size.width}>
            <Grid columnWidth={columnWidth} height={size.height} width={stageWidth} />
            <Tasks />
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
