export interface Resource {
  id: string;
  label: string;
  color: string;
}

export const RESOURCE_ROW_HEIGHT = 50;

export const RESOURCE_HEADER: Resource = {
  color: "transparent",
  id: "-1",
  label: "Header",
};
