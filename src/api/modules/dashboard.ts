import { ApiData, SliceItem } from '@/types/interfaces';
import request from '@/utils/axios';

export interface IResponseType<P = Record<string, any>> {
    code?: number;
    status: number;
    msg: string;
    data: P;
}

export type IChartData = {
    chartType: string;
} & ApiData;

export interface IConfig {
    slices: SliceItem[];
}

/**
 * get dashboard config
 *
 * @return {*}
 */
const getConfig = () => {
    return request.get<IConfig>('/api/dashboard');
};

/**
 * get chart data
 *
 * @return {*}
 */
const getChartData = ({
    sliceId,
    chartType,
}: {
    sliceId: string;
    chartType: string;
}) => {
    return request.get<IChartData>('/api/chart_data', {
        params: {
            sliceId,
            chartType,
        },
    });
};

export { getChartData, getConfig };
