<template>
  <nav class="abs">
    <div class="left-wing">Typings.dev</div>
    <div class="placeholder"></div>
    <div class="right-wing">
      <div class="button-group">
        <a class="text-button">Counted</a>
        <a class="text-button on">Timed</a>
        <a class="text-button">Programming</a>
      </div>
    </div>
  </nav>
  <slot />
  <footer class="abs">
    <a>1</a>
    <a>2</a>
    <a>3</a>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup() {},
  })
</script>

<style lang="less">
  nav {
    margin-top: 2rem;
    grid-template-areas: 'left right';
    line-height: 2.3rem;

    display: grid;
    grid-auto-flow: column;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.5rem;
    .left-wing {
      font-size: 2.3rem;
    }
  }
  footer {
    margin-top: 3rem;
    a {
      margin: 2rem;
    }
  }
  .button-group {
    display: flex;
    .text-button {
      font-size: 0.8rem;
      margin-right: 0.5rem;
      cursor: pointer;
      // display: inline-block;
      color: var(--sub);
      &.on {
        color: var(--major);
      }
      &:hover {
        color: var(--major);
        // font-weight: 600;
      }
    }
  }
</style>