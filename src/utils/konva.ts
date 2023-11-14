import { KonvaEventObject } from "konva/lib/Node";

export interface KonvaDrawable {
  /**
   * The fill color of a canvas item
   */
  fill?: string;
  /**
   * The fill color of a canvas item
   */
  fillToComplete?: string;
  /**
   * The stroke color of a canvas item
   */
  stroke?: string;
}

type KonvaMouseEvent = KonvaEventObject<MouseEvent>;

export type KonvaMouseEventCallback = (e: KonvaMouseEvent) => void;

export interface KonvaMouseEvents {
  /**
   * On mouse click event handler
   */
  onClick?: KonvaMouseEventCallback;
  /**
   * On mouse leave event handler
   */
  onMouseLeave?: KonvaMouseEventCallback;
  /**
   * On mouse over event handler
   */
  onMouseOver?: KonvaMouseEventCallback;
}

export interface KonvaPoint {
  /**
   * The x coordinate of a point on canvas
   */
  x: number;
  /**
   * The y coordinate of a point on canvas
   */
  y: number;
}
