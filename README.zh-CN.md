# x-chart

<p align="center">
  <img width="80" src="./logo.png">
</p>

<p align="center">
    <a href="https://vuejs.org/">
        <img src="https://img.shields.io/badge/Vue-3.2.25-42b883" alt="Vue3" />
    </a>
    <a href="https://echarts.apache.org/">
        <img src="https://img.shields.io/badge/ECharts-5.3.3-brightgreen" alt="ECharts" />
    </a>
    <a href="https://vitejs.dev">
        <img src="https://img.shields.io/badge/Vite-2.9.7-747bff" alt="Vite" />
    </a>
    <a href="https://pinia.vuejs.org">
        <img src="https://img.shields.io/badge/Pinia-2.0.14-f7d336" alt="Pinia" />
    </a>
    <a href="https://www.typescriptlang.org/">
        <img src="https://img.shields.io/badge/TypeScript-4.6.4-blue" alt="TypeScript" />
    </a>
</p>

简体中文 | [English](./README.md)

## 简介

`x-chart` 是一个可拖拽/放大缩小的数据可视化系统。基于 [Vue.js](https://github.com/vuejs/vue), [vue-echarts](https://github.com/ecomfe/vue-echarts) 和 [vue-grid-layout](https://github.com/yugasun/vue-grid-layout/tree/pro/compass) 开发。

> **Notice** 此版本是用 `typescript` 进行了重构, 如果你需要 `javascript` 编写的老版本, 你可以 `checkout` tag 号为 `v0.1.2` 的版本。

## 开发

```bash
# 克隆项目
git clone https://github.com/yugasun/x-chart.git

# 安装依赖
pnpm install

# 启动服务
# 浏览器访问 http://localhost:8080
pnpm run dev

# 构建
pnpm run build

# 发布到 Github 页面
pnpm run deploy

# 构建 docker 镜像
pnpm run docker:build

# 运行 docker 镜像，运行后，dome可以直接访问 http://localhost:8080
pnpm run docker:run

# 进入当前运行的 docker 镜像
pnpm run docker:exec
```

## 功能

-   [x] 基于 Vue3 + Vite + TypeScript 模板研发 [vue-ts-starter](https://github.com/yugasun/vue-ts-starter)
-   [x] 可配置的展示板: 所有模块均基于接口渲染。
-   [x] 可拖拽和放大缩小的图形模块。
-   [x] 自定义和美化的 echarts 图形。
-   [x] 使用 [msw](https://mswjs.io/docs/) 进行前端数据模拟.
-   [x] Docker 部署方案.

## Demo

![x-chart](./demo/1.png)

[Online Preview](https://x-chart.vercel.app/).

## 注意

对于大陆用户如果你运行 `npm install` 太慢，你可以在项目根目录创建 `.npmrc` 文件，文件内容如下：

```shell
registry=https://registry.npm.taobao.org/
phantomjs_cdnurl=http://cnpmjs.org/downloads
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

## License

[MIT](./LICENSE)

Copyright (c) 2018-present yugasun
