<template>
  <Config>
    <Meta>
      <router-view v-slot="{ Component }" v-if="isRouterAlive">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </Meta>
  </Config>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Config from '@/components/Config.vue'
  import Meta from '@/components/Meta.vue'

  export default defineComponent({
    components: {
      Config,
      Meta,
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
<style>
  .fade-enter-active {
    animation: fade-in 0.5s;
  }
  .fade-leave-active {
    animation: fade-in 0.5s reverse;
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
</style>