<template>
  <div id="content">
    <nav :class="{ transparent: started }">
      <div class="left-wing">
        <TextButtons
          v-for="(setting, index) in settingGroup"
          :key="index"
          :setting="setting"
        />
      </div>
      <div class="major">Typings.dev</div>
    </nav>
    <main>
      <slot />
    </main>
    <footer :class="{ transparent: started }" class="no-select">
      <div class="footer-item">
        <span class="restart-btn" @click="restart">
          <span class="restart-text">重新开始</span>
          <span class="hot-key">R</span>
        </span>
        <a href="https://github.com/George-Miao/typings.dev" class="link-icon">
          <i data-eva="github">Github</i>
        </a>
        <router-link to="/help" class="link-icon">
          <i data-eva="question-mark-circle-outline">帮助</i>
        </router-link>
        <a href="mailto:typings.dev@pop.tg" class="link-icon">
          <i data-eva="email-outline">邮件</i>
        </a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue'

import { ConfigStore } from '@/App.vue'
import { countOptions, InputStatus, SupportedScheme } from '@/utils/constants'
import { Setting } from '@/utils/types'
import TextButtons from './TextButtons.vue'

export default defineComponent({
  components: { TextButtons },
  emits: ['restart'],
  setup(_, { emit }) {
    const config = inject('config') as ConfigStore
    const global = config.global
    const settingGroup: Setting[] = [
      // {
      //   title: 'Mode',
      //   options: ['Counted', 'Timed', 'Zen'],
      //   selected: 0,
      //   show: true,
      //   select(index) {},
      // },
      {
        title: '方案',
        options: config.schemes,
        index: computed(() => config.schemes.indexOf(config.getState().scheme)),
        closeIndicator: ref(false),
        set(index) {
          config.setScheme(config.schemes[index] as SupportedScheme)
        }
      },
      {
        title: '主题',
        options: config.themes,
        index: computed(() => config.themes.indexOf(config.getState().theme)),
        closeIndicator: ref(false),
        set(index) {
          config.setTheme(config.themes[index])
        }
      },
      {
        title: '拼音',
        options: ['开', '关'],
        index: computed(() => (config.getState().showPinyin ? 0 : 1)),
        closeIndicator: ref(false),
        set(index) {
          const cur = config.getState().showPinyin ? 0 : 1
          if (index == cur) return
          config.togglePinyin()
        }
      },
      {
        title: '词数',
        options: countOptions.map(e => e.toString()),
        index: computed(() => countOptions.indexOf(config.getState().perPage)),
        closeIndicator: ref(false),
        show: computed(() => {
          // In Counted mode
          // return settingGroup[0].selected == 0
          return true
        }),
        set(index) {
          config.setPerPage(countOptions[index])
        }
      }
    ]

    const started = computed(() => global.status === InputStatus.Started)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const closeAll = () =>
      settingGroup.forEach(x => {
        const indicator = x.closeIndicator
        indicator.value = !indicator.value
      })

    const restart = () => emit('restart')

    window.addEventListener('keypress', e => {
      if (
        global.status === InputStatus.Started ||
        document.activeElement?.tagName === 'INPUT'
      ) {
        return
      }
      if (e.key === 'r') {
        restart()
      }
    })

    return {
      closeAll,
      restart,
      settingGroup,
      started
    }
  }
})
</script>

<style lang="less" scoped>
#content {
  max-width: 850px;
  min-height: 100vh;
  display: grid;
  gap: 2rem;
  grid-auto-flow: row;
  align-items: center;
  justify-content: center;
  grid-template-rows: min-content 1fr min-content;
  margin: 0 auto;
  padding: 2rem 0;
  box-sizing: border-box;
}

nav,
main,
footer {
  width: ~'min(90vw, 850px)';
}

nav {
  grid-template-areas: 'left right';
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.2rem;

  .left-wing {
    font-size: 2.3rem;
  }

  &.transparent {
    position: relative;
    transform: translateY(-40px);

    & ~ .home {
      transform: translateY(-40px);
    }
  }
}

main {
  height: 100%;
}

footer {
  font-size: 0.8rem;
  padding: none;

  * {
    color: var(--minor);
  }

  svg {
    fill: var(--minor);
  }

  a {
    text-decoration: none;
  }

  .footer-item {
    display: flex;
    align-items: center;
    justify-content: center;

    & > * {
      margin: 0 0.4rem;
    }

    .link-icon,
    .restart-btn {
      height: 24px;
      line-height: 24px;
    }

    .restart-btn {
      cursor: pointer;
      padding: 0.2rem 0.3rem;
      border-radius: 0.2rem;

      .restart-text {
        font-weight: 700;
      }

      .hot-key {
        padding: 0.1rem 0.3rem;
        margin-left: 0.5rem;
        border-radius: 0.1rem;
        line-height: 0.6rem;
        color: var(--background);
        background: var(--minor);
      }

      &:hover {
        padding: 0.2rem 0.6rem;
        margin: 0 0.1rem;
        background: var(--minor);

        .restart-text {
          color: var(--background);
        }

        .hot-key {
          color: var(--minor);
          background: var(--background);
        }
      }
    }

    .link-icon {
      padding: 0.2rem;
      border-radius: 0.2rem;

      &:hover {
        padding: 0.2rem 0.5rem;
        margin: 0 0.1rem;

        svg {
          fill: var(--background);
        }

        i {
          color: var(--background);
        }

        background: var(--minor);
      }
    }
  }

  &.transparent {
    position: relative;
    transform: translateY(40px);
  }
}

.button-group {
  display: flex;

  .text-button {
    font-size: 0.8rem;
    margin-right: 0.5rem;
    cursor: pointer;
    // display: inline-block;
    color: var(--minor);

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
