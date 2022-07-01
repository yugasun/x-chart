import {
    XLine,
    XLineArea,
    XBar,
    XHbar,
    XPie,
    XCircle,
    XNumber,
} from '@/components/charts';

/**
 * chart component mapping
 */
const ChartComponentMap: Record<string, any> = {
    'x-line': XLine,
    'x-line-area': XLineArea,
    'x-bar': XBar,
    'x-hbar': XHbar,
    'x-pie': XPie,
    'x-circle': XCircle,
    'x-number': XNumber,
};

export default ChartComponentMap;
