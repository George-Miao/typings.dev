<template>
  <div class="kv">
    <pre class="k">{{ k }}</pre>
    <pre class="v">{{ v }}</pre>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    k: { type: String, required: true },
    v: { type: String, required: true }
  },
  setup({ k: key, v: value }) {
    return {
      key,
      value
    }
  }
})
</script>
<style lang="less" scoped>
.kv {
  display: flex;
}
</style>
