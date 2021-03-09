<template>
  <div class="text-button-wrap" :class="{selecting}">
    <span
      class="title no-select"
      @click="selecting=!selecting"
      :class="{'major-color': selecting}"
    >{{setting.title}}</span>
    <span
      v-for="(item, index) in setting.options"
      @click="click(index)"
      :key="index"
      class="button"
      :class="{selected: index == setting.selected, pointer: selecting || index != setting.selected}"
    >{{item}}</span>
  </div>
</template>

<script lang="ts">
  import { Setting } from '@/types'
  import { defineComponent, PropType, ref, Ref } from 'vue'
  export default defineComponent({
    props: {
      setting: { type: Object as PropType<Setting>, required: true },
    },
    methods: {
      click(index: number) {
        console.log(
          `${this.setting.title} has been changed to "${this.setting.options[index]}"`,
        )
        this.selecting = false
        this.setting.selected = index
        this.setting.select(index)
      },
    },
    setup() {
      return {
        selecting: ref(false),
      }
    },
  })
</script>

<style lang="less">
  .text-button-wrap {
    font-size: 0.8rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    // height: 2.3rem;
    .title {
      display: inline-block;
      margin-right: 1rem;
      font-size: 1rem;
      background: var(--bg);
      color: var(--sub);
      z-index: 100;
      cursor: pointer;
    }

    .button {
      display: inline-block;
      margin: 0 0.2rem;
      // pointer-events: none;
      &:not(.selected) {
        position: absolute;
        color: var(--sub);
        opacity: 0;
        // width: 0;
      }
    }
    &.selecting {
      .button {
        // transition: all 0.8s ease-in-out;
        margin-right: 0.4rem;
      }
      .button:not(.selected) {
        // transition: all 0.5s cubic-bezier(0.17, 0.84, 0.44, 1) 1s;
        position: relative;
        opacity: 100;
        // width: ;
        &:hover {
          color: var(--major);
        }
      }
    }
  }
  .major-color {
    color: var(--major) !important;
  }
</style>