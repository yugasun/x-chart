<template>
  <div class="wrapper index-page">
    <!-- <img src="~@/assets/logo.png" alt="" class="logo"> -->
    <h1>x-chart</h1>
    <div class="select-wrapper">
      <!-- Theme select -->
      <el-select v-model="themeIndex">
        <el-option
          v-for="(t, index) in themes"
          :key="index"
          :value="index"
          :label="t.name"></el-option>
      </el-select>
    </div>
    <Dashboard
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
<script lang="ts">
import Dashboard from '@/views/index/dashboard.vue';
import themes from '@/config/themes';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    Dashboard,
  },
})
export default class Index extends Vue {
  themes: object[] = themes;

  themeIndex: number = 0;
}
</script>
<style lang="scss" scoped>
.logo {
  width: 100px;
}
.select-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
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
