export interface Resource {
  /**
   * Unique identifier of the resource
   */
  id: string;
  /**
   * Label of the resource
   */
  label: string;
  /**
   * Color assigned to the resource
   */
  color: string;
}

export const RESOURCE_HEADER_HEIGHT = 50;
export const RESOURCE_HEADER_OFFSET = 5;
export const RESOURCE_HEADER_TEXT_OFFSET = 20;
export const RESOURCE_HEADER_WIDTH = 200;

export const RESOURCE_HEADER: Resource = {
  color: "transparent",
  id: "-1",
  label: "Header",
};
