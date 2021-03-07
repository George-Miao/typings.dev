<template>
  <nav class="abs">
    <div class="left">123</div>
    <div class="placeholder"></div>
    <div class="right">123</div>
  </nav>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup() {},
  })
</script>

<style lang="less" scoped>
  nav {
    margin-top: 2rem;
    grid-template-areas: 'left right';
    line-height: 2.3rem;
    font-size: 2.3rem;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.5rem;
    .left {
      // position: fixed;
      // left: 1rem;
    }
  }
</style>