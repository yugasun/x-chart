const palettes = {
    base: ['primary', 'success', 'warning', 'danger', 'error', 'info'],
    hasLight9: ['primary'],
    hasLight2: ['success', 'warning', 'danger', 'error', 'info'], // danger === error
};

const hasLight9 = function (group) {
    const colors = {};
    group.forEach((name) => {
        colors[`el-${name}-light`] = {};
        for (let index = 9; index > 0; index--) {
            colors[`el-${name}-light`][
                index * 100
            ] = `var(--el-color-${name}-light-${index})`;
        }
    });
    return colors;
};

const hasLight2 = function (group) {
    const colors = {};
    group.forEach((name) => {
        colors[`el-${name}-light`] = `var(--el-color-${name}-light)`;
        colors[`el-${name}-lighter`] = `var(--el-color-${name}-lighter)`;
    });
    return colors;
};

const baseColor = function (group) {
    const colors = {};
    group.forEach((name) => {
        colors[`el-${name}`] = `var(--el-color-${name})`;
    });
    return colors;
};

const getColors = function (palettes) {
    const colors = {};
    for (const key in palettes) {
        const group = palettes[key];
        if (key === 'base') {
            Object.assign(colors, baseColor(group));
        } else if (key === 'hasLight9') {
            Object.assign(colors, hasLight9(group));
        } else if (key === 'hasLight2') {
            Object.assign(colors, hasLight2(group));
        }
    }
    // console.log(colors);
    return colors;
};

module.exports = {
    theme: {
        extend: {
            colors: getColors(palettes),
        },
    },
};

// --el-color-white: #ffffff;
// --el-color-black: #000000;
// --el-color-primary: #409eff;
// --el-color-primary-light-1: #53a8ff;
// --el-color-primary-light-2: #66b1ff;
// --el-color-primary-light-3: #79bbff;
// --el-color-primary-light-4: #8cc5ff;
// --el-color-primary-light-5: #a0cfff;
// --el-color-primary-light-6: #b3d8ff;
// --el-color-primary-light-7: #c6e2ff;
// --el-color-primary-light-8: #d9ecff;
// --el-color-primary-light-9: #ecf5ff;
// --el-color-success: #67c23a;
// --el-color-success-light: #e1f3d8;
// --el-color-success-lighter: #f0f9eb;
// --el-color-warning: #e6a23c;
// --el-color-warning-light: #faecd8;
// --el-color-warning-lighter: #fdf6ec;
// --el-color-danger: #f56c6c;
// --el-color-danger-light: #fde2e2;
// --el-color-danger-lighter: #fef0f0;
// --el-color-error: #f56c6c;
// --el-color-error-light: #fde2e2;
// --el-color-error-lighter: #fef0f0;
// --el-color-info: #909399;
// --el-color-info-light: #e9e9eb;
// --el-color-info-lighter: #f4f4f5;
// --el-text-color-primary: #303133;
// --el-text-color-regular: #606266;
// --el-text-color-secondary: #909399;
// --el-text-color-placeholder: #c0c4cc;
// --el-border-color-base: #dcdfe6;
// --el-border-color-light: #e4e7ed;
// --el-border-color-lighter: #ebeef5;
// --el-border-color-extra-light: #f2f6fc;
// --el-background-color-base: #f5f7fa;
// --el-border-width-base: 1px;
// --el-border-style-base: solid;
// --el-border-color-hover: var(--el-text-color-placeholder);
// --el-border-base: var(--el-border-width-base) var(--el-border-style-base) var(--el-border-color-base);
// --el-border-radius-base: 4px;
// --el-border-radius-small: 2px;
// --el-border-radius-round: 20px;
// --el-border-radius-circle: 100%;
// --el-box-shadow-base: 0 2px 4px rgba(0, 0, 0, 0.12),0 0 6px rgba(0, 0, 0, 0.04);
// --el-box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
// --el-svg-monochrome-grey: #dcdde0;
// --el-fill-base: var(--el-color-white);
// --el-font-size-extra-large: 20px;
// --el-font-size-large: 18px;
