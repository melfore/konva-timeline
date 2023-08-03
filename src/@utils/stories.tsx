import React, { useEffect, useRef } from "react";
import { Layer, Stage } from "react-konva";

export const KonvaDecorator = (storyFn: any) => {
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
    <div ref={wrapperRef}>
      <Stage height={200} width={width}>
        <Layer>{storyFn()}</Layer>
      </Stage>
    </div>
  );
};
