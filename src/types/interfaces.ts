export interface ApiData {
  columns: any[];
  rows: any[];
}

export interface ExpandPayload {
  expand: boolean;
  targetRef: any;
}

export interface RequestParam {
  chartType: string;
}

export interface ChartInitPayload {
  chart: any;
  chartData: ApiData;
}

export interface State {
  app: AppState;
  logs: ErrorLogState;
}

export interface AppState {
  theme: number;
  pageId: number;
}

export interface ErrorLogState {
  logs: any[];
}

export interface ThemePayload {
  theme: number;
}

export interface SliceItem {
  sliceId: number;
  x: number;
  y: number;
  w: number;
  h: number;
  width: number;
  height: number;
  i: string;
  chartType: string;
  title: string;
}

// chart interface
export interface ChartInstance {
  setOption(o: any): void
  resize(): void
}
