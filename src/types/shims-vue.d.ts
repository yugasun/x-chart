import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $http: any;
  }
}

declare module '*.vue' {
  export default Vue;
}
