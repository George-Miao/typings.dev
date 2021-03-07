<template>
  <div class="home view">
    <Panel />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Panel from '@/components/Panel.vue' // @ is an alias to /src

  export default defineComponent({
    name: 'Home',
    components: {
      Panel,
    },
  })
</script>
