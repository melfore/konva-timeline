import React from "react";
import { Group, Line, Text } from "react-konva";
import Konva from "konva";

export const KonvaGroup = (props: Konva.GroupConfig) => {
  return <Group {...props} listening={false} perfectDrawEnabled={false} />;
};

export const KonvaLine = (props: Konva.LineConfig) => {
  return <Line {...props} listening={false} perfectDrawEnabled={false} />;
};

export const KonvaText = (props: Konva.TextConfig) => {
  return <Text {...props} listening={false} perfectDrawEnabled={false} />;
};
