<p align="center">
  <img width="80" src="./logo.png">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.17-brightgreen.svg" alt="vue">
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

[简体中文](./README.zh-CN.md) | English

## Introduction

`x-chart` is a draggable & resizable data visualization dashboard. Based on [Vue.js](https://github.com/vuejs/vue), [vue-echarts](https://github.com/ecomfe/vue-echarts) and [vue-grid-layout](https://github.com/yugasun/vue-grid-layout/tree/pro/compass).

> **Notice** This version is rewrote by `typescript`, if you want the old version by `javascript`, you can checkout tag `v0.1.2`.

## Develop

``` bash
# clone the project
git clone https://github.com/yugasun/x-chart.git

# install dependency
npm install

# develop
npm run dev

# build
npm run build

# deploy for Github page
npm run deploy

# build docker image
npm run docker:build

# run docker image in container, after this you can visit demo by: http://localhost:8080
npm run docker:run
```

## Feature

- [x] Customized scaffold based on [vue-cli@3.0](https://github.com/vuejs/vue-cli)
- [x] Configurable dashboard: all modules render depend on the api.
- [x] Chart modules are draggable and resizable.
- [x] _**Cache build js and css files in localStorage**_ using [bowl.js](https://github.com/ElemeFE/bowl).
- [x] Customized and beautify charts using echarts.
- [x] Frontend data mock demo using [mockjs](https://github.com/nuysoft/Mock).
- [x] Docker deploy.
- [x] _**Refactor with Typescript**_.
- [ ] Integrated with [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) for pre-render.

## Demo

![x-chart](./demo/1.png)

[Online Preview](http://yugasun.github.io/x-chart/).

## Notice

For Chinese if you `npm install` slowly, you can create `.npmrc` file with below content:

```shell
registry=https://registry.npm.taobao.org/
phantomjs_cdnurl=http://cnpmjs.org/downloads
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

## License

[MIT](./LICENSE)

Copyright (c) 2018-present yugasun
