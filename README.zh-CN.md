<p align="center">
  <img width="80" src="./logo.png">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.16-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/apache/incubator-echarts">
    <img src="https://img.shields.io/badge/echarts-4.1.0-brightgreen.svg" alt="echarts">
  </a>
  <a href="https://travis-ci.org/yugasun/x-chart" rel="nofollow">
    <img src="https://travis-ci.org/yugasun/x-chart.svg?branch=dev" alt="Build Status">
  </a>
  <a href="https://github.com/yugasun/x-chart/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
</p>

简体中文 | [English](./README.md)

## 简介

`x-chart` 是一个可拖拽/放大缩小的数据可视化系统。基于 [Vue.js](https://github.com/vuejs/vue), [vue-echarts](https://github.com/ecomfe/vue-echarts) 和 [vue-grid-layout](https://github.com/yugasun/vue-grid-layout/tree/pro/compass) 开发。

> **Notice** 此版本是用 `typescript` 进行了重构, 如果你需要 `javascript` 编写的老版本, 你可以 `checkout` tag 号为 `v0.1.2` 的版本。

## 开发

``` bash
# 克隆项目
git clone https://github.com/yugasun/x-chart.git

# 安装依赖
npm install

# 启动服务
# 浏览器访问 http://localhost:8080
npm run dev

# 构建
npm run build

# 发布到 Github 页面
npm run deploy

# 构建 docker 镜像
npm run docker:build

# 运行 docker 镜像
npm run docker:run
```

## 功能

- [x] 可配置的展示板: 所有模块均基于接口渲染。
- [x] 可拖拽和放大缩小的图形模块。
- [x] _**使用 [bowl.js](https://github.com/ElemeFE/bowl) 对前端静态文件（js，css）进行缓存，注入到 localStorage。**_
- [x] 自定义和美化的echarts图形。
- [x] 使用 [mockjs](https://github.com/nuysoft/Mock) 进行前端数据模拟。
- [x] Docker部署方案.
- [x] _**使用 Typescript 重构**_.

## Demo

![x-chart](./demo/1.png)

[Online Preview](http://yugasun.github.io/x-chart/).

## License

[MIT](./LICENSE)

Copyright (c) 2018-present yugasun
