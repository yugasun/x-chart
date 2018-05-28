<p align="center">
  <img width="80" src="./logo.png">
</p>

[简体中文](./README.zh-CN.md) | English

## Introduction

`x-chart` is a draggable & resizable data visualization dashboard. Based on [Vue.js](https://github.com/vuejs/vue), [vue-echarts](https://github.com/ecomfe/vue-echarts) and [vue-grid-layout](https://github.com/yugasun/vue-grid-layout/tree/pro/compass).

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

# build docker image
npm run docker:build

# run docker image in container
npm run docker:run
```

## Feature

- [x] Configurable dashboard: all modules render depend on the api.
- [x] Chart modules are draggable and resizable.
- [x] _**Cache build js and css files in localStorage**_ using [bowl.js](https://github.com/ElemeFE/bowl).
- [x] Customized and beautify charts using echarts.
- [x] Frontend data mock demo using [mockjs](https://github.com/nuysoft/Mock).
- [x] Docker deploy.

## Demo

![x-chart](./demo/1.png)

[Online Preview](http://yugasun.github.io/x-chart).

## License

[MIT](https://github.com/yugasun/x-chart/blob/master/LICENSE)

Copyright (c) 2018-present yugasun
