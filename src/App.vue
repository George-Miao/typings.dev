<template>
  <Nav />
  <Config><router-view v-if="isRouterAlive" /></Config>
  <Footer />
</template>

<script lang="ts">
  import { defineComponent, provide, reactive, ref } from 'vue'
  import Config from '@/components/Config.vue'
  import Nav from '@/components/Nav.vue'
  import Footer from '@/components/Footer.vue'

  export default defineComponent({
    components: {
      Config,
      Nav,
      Footer,
    },
    provide() {
      return {
        reload: this.reload,
      }
    },
    methods: {
      reload() {
        console.log('Reloading')
        this.isRouterAlive = false
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      },
    },
    data() {
      return {
        isRouterAlive: true,
      }
    },
  })
</script>
