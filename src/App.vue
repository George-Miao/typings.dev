<template>
  <Config><router-view /></Config>
</template>

<script lang="ts">
  import { defineComponent, provide, reactive, ref } from 'vue'
  import Config from '@/components/Config.vue'

  export default defineComponent({
    components: {
      Config,
    },
    setup() {
      provide('config', reactive({}))
    },
  })
</script>

<style lang="less">
  html,
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100vh;
    width: 100vw;
  }
  .hide {
    display: none;
  }
</style>
