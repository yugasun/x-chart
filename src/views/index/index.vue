<template>
  <div class="wrapper index-page">
    <!-- <img src="~@/assets/logo.png" alt="" class="logo"> -->
    <h1>x-chart</h1>
    <div class="wrapper select-wrapper">
      <!-- 主题选择 -->
      <el-select v-model="themeIndex">
        <el-option
          v-for="(t, index) in themes"
          :key="index"
          :value="index"
          :label="t.name"></el-option>
      </el-select>
    </div>
    <dashboard
      :colorStart="themes[themeIndex].colorStart"
      :colorEnd="themes[themeIndex].colorEnd"
      />

    <footer>
      <a href="//github.com/yugasun">@yugasun</a>|
      <a href="//github.com/yugasun/x-chart/blob/master/LICENSE">MIT License</a>|
      <a href="//github.com/yugasun/x-chart">View on GitHub</a>
    </footer>
  </div>
</template>
<script>
import Dashboard from '@/views/index/dashboard';
import themes from '@/config/themes';

export default {
  name: 'Index',
  data() {
    return {
      themes,
      themeIndex: 0,
    };
  },
  components: {
    Dashboard,
  },
};
</script>
<style lang="scss" scoped>
.logo {
  width: 100px;
}
.select-wrapper {
  width: 1140px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}
footer {
  margin: 5em 0 3em;
  font-size: .5em;
  vertical-align: middle;

  a {
    display: inline-block;
    margin: 0 5px;
    padding: 3px 0 6px;
    color: #7f8c8d;
    font-size: 2em;
    text-decoration: none;

    &:hover {
      border-bottom: 2px solid #ccc;
    }
  }
}
</style>

