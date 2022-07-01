export interface ApiData {
    chartType: string;
    columns: {
        type: string;
        field: string;
        name: string;
    }[];
    rows: Record<string, any>[];
}

export interface ExpandPayload {
    expand: boolean;
    targetId: number | string;
}

export interface RequestParam {
    chartType?: string;
}

export interface ChartInitPayload {
    chart: any;
    chartData: ApiData;
}
export interface SliceItem {
    sliceId: string;
    x: number;
    y: number;
    w: number;
    h: number;
    width: number;
    height: number;
    i: string;
    chartType: string;
    title: string;
    static: boolean;
    popup?: boolean;
}

// chart interface
export interface ChartInstance {
    setOption(o: any): void;
    resize(): void;
}
