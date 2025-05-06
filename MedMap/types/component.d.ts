// @types/components.d.ts

import { ChartConfig } from './chart'

// Define the props for the ChartTooltipContent component
export type ChartTooltipContentProps = {
  label: string; // The label displayed in the tooltip
  config: ChartConfig; // The chart configuration passed from context
}

// Define the props for the ChartLegendContent component
export type ChartLegendContentProps = {
  payload: any[]; // Payload is an array of items, customize as needed
  verticalAlign?: 'top' | 'bottom'; // Optional property for vertical alignment
  hideIcon?: boolean; // Flag to hide the icon in the legend
}

// Define the props for the ChartLine component
export type ChartLineProps = {
  data: number[]; // The data for the line chart
}

// Define the props for the ChartTooltip component
export type ChartTooltipProps = {
  payload: any[]; // The data for the tooltip, customize as needed
}
