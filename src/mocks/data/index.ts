import { default as Dashboard } from './dashboard.json';
import { default as Bar } from './x-bar.json';
import { default as Circle } from './x-circle.json';
import { default as Hbar } from './x-hbar.json';
import { default as LineArea } from './x-line-area.json';
import { default as Line } from './x-line.json';
import { default as Number } from './x-number.json';
import { default as Pie } from './x-pie.json';

const Charts: Record<string, any> = {
    'x-bar': Bar,
    'x-circle': Circle,
    'x-hbar': Hbar,
    'x-line-area': LineArea,
    'x-line': Line,
    'x-number': Number,
    'x-pie': Pie,
};

export { Dashboard, Charts };
