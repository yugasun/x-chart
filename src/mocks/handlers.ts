import { rest } from 'msw';
import dashboard from './dashboard';

async function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    });
}

export const handlers = [
    rest.get('/api/dashboard', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                code: 0,
                success: true,
                data: dashboard.getConfig(),
            }),
        );
    }),
    rest.get('/api/chart_data', async (req, res, ctx) => {
        const chartType = req.url.searchParams.get('chartType') || 'x-line';
        const data = await dashboard.getChartData({
            chartType,
        });
        await sleep(Math.random() * 500);
        return res(
            ctx.status(200),
            ctx.json({
                code: 0,
                success: true,
                data,
            }),
        );
    }),
];
