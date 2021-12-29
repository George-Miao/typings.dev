<template>
  <div class="home view">
    <Panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Panel from '@/components/InputPanel.vue' // @ is an alias to /src
import { global } from '@/App.vue'
import { InputStatus } from '@/utils/constants'

export default defineComponent({
  beforeRouteEnter(_to: any, _from: any, next: () => void) {
    if (global.getState().status !== InputStatus.Init) {
      global.reload()
    }
    next()
  },

  components: {
    Panel
  }
})
</script>
