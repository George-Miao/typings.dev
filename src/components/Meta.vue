<template>
  <nav class="abs">
    <div class="left-wing">
      <text-buttons v-for="(setting, index) in settingGroup" :key="index" :setting="setting" />
    </div>
    <div class="right-wing">Typings.dev</div>
  </nav>
  <slot />
  <footer class="abs">
    <a>1</a>
    <a>2</a>
    <a>3</a>
  </footer>
</template>

<script lang="ts">
  import { SupportedScheme, SupportedThemes } from '@/constants'
  import { Setting } from '@/types'
  import { defineComponent, inject, reactive, ref } from 'vue'
  import { ConfigStore } from './Config.vue'
  import TextButtons from './TextButtons.vue'
  export default defineComponent({
    components: { TextButtons },
    setup() {
      const config = inject('config') as ConfigStore
      const settingGroup: Setting[] = reactive([
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
          selected: config.schemes.indexOf(config.getState().scheme),
          show: true,
          select(index) {
            config.setScheme(config.schemes[index] as SupportedScheme)
          },
        },
        {
          title: 'Time',
          options: config.themes,
          selected: config.themes.indexOf(config.getState().theme),
          show: true,
          select(index) {
            config.setTheme(config.themes[index] as SupportedThemes)
          },
        },
        {
          title: 'Pinyin',
          options: ['On', 'Off'],
          selected: config.getState().showPinyin ? 0 : 1,
          show: true,
          select(index) {
            config.togglePinyin()
          },
        },
      ])
      return {
        config,
        settingGroup,
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