<template>
  <div id="root" @click="onClickBackground">
    <PageMargins ref="margin" @restart="reload">
      <router-view v-slot="{ Component }" v-if="isRouterAlive">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </PageMargins>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, provide, watch } from 'vue'
import PageMargins from '@/components/PageMargins.vue'
import router from './router'

import ConfigStore from '@/utils/configStore'
import GlobalStore from '@/utils/globalStore'
import { onThemeUpdate } from './utils'

declare const window: {
  config: ConfigStore
  help: () => void
}

export type { ConfigStore, GlobalStore }

const isRouterAlive = ref(true)

const reload = () => {
  router.push('/')
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}

export const global = new GlobalStore(reload)
export const config = new ConfigStore(global)

export default defineComponent({
  components: {
    PageMargins
  },
  setup() {
    global.reload()
    const reload = () => global.reload()

    window.config = config
    window.help = () => {
      console.log('== Typings.dev help message ==')
      console.log('Config: use config.methodName to change settings')
      console.log(
        'Configs will be stored in localStorage, use config.reset() to reset'
      )
      config.printTable()
    }

    provide('config', config)

    const margin = ref<{ closeAll: () => void } | null>(null)

    const onClickBackground = (e: MouseEvent) => {
      const target = e.target as Element
      if (target && target.id === 'root' || target.id === 'content' || target.className?.indexOf?.('view') !== -1)
        margin.value?.closeAll()
    }

    onThemeUpdate(config.activeTheme.value)

    watch(config.activeTheme, onThemeUpdate)

    return {
      reload,
      margin,
      isRouterAlive,
      onClickBackground,
      theme: config.activeTheme
    }
  }
})
</script>

<style lang="less">
/* jetbrains-mono-regular - latin */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts/jetbrains-mono-v3-latin-regular.eot'); /* IE9 Compat Modes */
  src: local(''),
    url('/fonts/jetbrains-mono-v3-latin-regular.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('/fonts/jetbrains-mono-v3-latin-regular.woff2')
      format('woff2'),
    /* Super Modern Browsers */
      url('/fonts/jetbrains-mono-v3-latin-regular.woff') format('woff'),
    /* Modern Browsers */ url('/fonts/jetbrains-mono-v3-latin-regular.ttf')
      format('truetype'),
    /* Safari, Android, iOS */
      url('/fonts/jetbrains-mono-v3-latin-regular.svg#JetBrainsMono')
      format('svg'); /* Legacy iOS */
}

* {
  transition: all 0.5s cubic-bezier(0.17, 0.84, 0.44, 1) 0s;
}

html,
body {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

#root {
  --background: v-bind('theme.background');
  --major: v-bind('theme.major');
  --minor: v-bind('theme.minor');
  --highlight: v-bind('theme.highlight');

  font-family: 'Jetbrains Mono', 'Nimbus Roman No9 L', '\5b8b\4f53',
    'PingFang SC', 'Hiragino Sans GB', 'Noto Serif SC', 'Microsoft Yahei',
    'WenQuanYi Micro Hei', 'ST Heiti', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: center;

  background: var(--background);

  .view {
    margin: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .pointer {
    cursor: pointer;
  }

  .no-select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .blur {
    filter: blur(4px);
  }

  .transparent {
    opacity: 0;
  }

  .pointer {
    cursor: pointer;
  }

  .major {
    color: var(--major);
  }

  .minor {
    color: var(--minor);
  }

  .wrong {
    filter: opacity(60%);
  }

  .highlight {
    color: var(--highlight);
  }

  nav,
  footer {
    color: var(--major);
  }
}

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
