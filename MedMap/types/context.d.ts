// @types/context.d.ts or src/types/context.d.ts

import { ChartConfig } from './chart'

export type ChartContextProps = {
  config: ChartConfig;
}

export type ChartContainerProps = {
  id?: string;
  className?: string;
  config: ChartConfig;
  children: React.ReactNode;
}
