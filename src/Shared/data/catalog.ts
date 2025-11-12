type ComponentCatalogItem = {
  id: string;
  label: string;
  price: number;
  color: string;
};

const COMPONENT_CATALOG: ComponentCatalogItem[] = [
  {
    id: "feature-buttons",
    label: "Button",
    price: 200,
    color: "#6F87B0",
  },
  {
    id: "feature-inputs",
    label: "Form Input",
    price: 200,
    color: "#7FA6A9",
  },
  {
    id: "Checkbox",
    label: "Checkbox",
    price: 200,
    color: "#9270A3",
  },
  {
    id: "toggle button",
    label: "Toggle button",
    price: 300,
    color: "#988962",
  },
  {
    id: "Stepper",
    label: "Stepper",
    price: 300,
    color: "#6E9B8A",
  },
  {
    id: "Slider",
    label: "Slider",
    price: 300,
    color: "#8C7DA8",
  },
  {
    id: "Modal",
    label: "Modal",
    price: 400,
    color: "#6F988D",
  },
  {
    id: "circular-chart-card",
    label: "Circular chart card",
    price: 500,
    color: "#805AFF",
  },
  {
    id: "metric-card",
    label: "Metric card",
    price: 300,
    color: "#5D85FF",
  },
];

const COMPONENT_COLOR_MAP = COMPONENT_CATALOG.reduce<Record<string, string>>(
  (acc, item) => {
    acc[item.id] = item.color;
    return acc;
  },
  {}
);

export { COMPONENT_CATALOG, COMPONENT_COLOR_MAP };
export type { ComponentCatalogItem };
