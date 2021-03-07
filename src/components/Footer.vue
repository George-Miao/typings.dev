<template>
  <footer class="abs"><a>1</a><a>2</a><a>3</a></footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup() {},
  })
</script>

<style lang="less">
  footer {
    bottom: 0;
    a {
      margin: 2rem;
    }
  }
</style>