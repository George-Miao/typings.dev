<template>
  <nav class="abs" :class="{transparent}">
    <div class="left-wing">
      <text-buttons v-for="(setting, index) in settingGroup" :key="index" :setting="setting" />
    </div>
    <div class="right-wing">Typings.dev</div>
  </nav>
  <slot />
  <footer class="abs"></footer>
</template>

<script lang="ts">
  import { GlobalStatus, SupportedScheme, SupportedThemes } from '@/constants'
  import { Setting } from '@/types'
  import { computed, defineComponent, inject, reactive, ref } from 'vue'
  import { ConfigStore, GlobalStore } from './Config.vue'
  import TextButtons from './TextButtons.vue'
  const countOptions = [5, 15, 25, 50]
  export default defineComponent({
    components: { TextButtons },
    setup() {
      const config = inject('config') as ConfigStore
      const global = inject('global') as GlobalStore
      const settingGroup: Setting[] = [
        // {
        //   title: 'Mode',
        //   options: ['Counted', 'Timed', 'Zen'],
        //   selected: 0,
        //   show: true,
        //   select(index) {},
        // },
        {
          title: 'Scheme',
          options: config.schemes,
          selected: computed(() =>
            config.schemes.indexOf(config.getState().scheme),
          ),
          show: true,
          select(index) {
            config.setScheme(config.schemes[index] as SupportedScheme)
          },
        },
        {
          title: 'Theme',
          options: config.themes,
          selected: computed(() =>
            config.themes.indexOf(config.getState().theme),
          ),
          show: true,
          select(index) {
            config.setTheme(config.themes[index] as SupportedThemes)
          },
        },
        {
          title: 'Pinyin',
          options: ['On', 'Off'],
          selected: computed(() => (config.getState().showPinyin ? 0 : 1)),
          show: true,
          select(index) {
            const cur = config.getState().showPinyin ? 0 : 1
            if (index == cur) return
            config.togglePinyin()
          },
        },
        {
          title: 'Count',
          options: countOptions.map(e => e.toString()),
          selected: computed(() =>
            countOptions.indexOf(config.getState().perPage),
          ),
          show: computed(() => {
            // In Counted mode
            // return settingGroup[0].selected == 0
            return true
          }),
          select(index) {
            config.setPerPage(countOptions[index])
          },
        },
      ]
      const transparent = computed(() => global.status === GlobalStatus.Started)
      // console.log(settingGroup)
      return {
        config,
        global,
        settingGroup,
        transparent,
        state: config.getState(),
      }
    },
  })
</script>

<style lang="less">
  nav {
    margin-top: 2rem;
    grid-template-areas: 'left right';
    // line-height: 2.3rem;

    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 0.5rem;
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