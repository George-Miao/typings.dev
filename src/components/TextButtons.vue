<template>
  <div class="text-button-wrap" :class="{ active }" v-if="setting.show ?? true">
    <span
      class="title no-select"
      @click="active = !active"
      :class="{ 'major-color': active }"
      >{{ setting.title }}</span
    >
    <span
      v-for="(item, index) in setting.options"
      @click="active && click(index)"
      :key="index"
      class="button"
      :class="{ selected: index == setting.index.value, pointer: active }"
      >{{ item }}</span
    >
  </div>
</template>

<script lang="ts">
import { Setting } from '@/utils/types'
import { defineComponent, PropType, ref, watch } from 'vue'
export default defineComponent({
  props: {
    setting: { type: Object as PropType<Setting>, required: true }
  },
  methods: {},
  setup({ setting }) {
    const active = ref(false)
    const click = (index: number) => {
      console.log(
        `${setting.title} has been changed to "${setting.options[index]}"`
      )
      active.value = false
      setting.set(index)
    }

    watch(setting.closeIndicator, () => (active.value = false))

    return {
      active,
      click,
      close
    }
  }
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
  margin-right: auto;

  .title {
    display: inline-block;
    margin-right: 1rem;
    font-size: 1rem;
    background: var(--background);
    color: var(--minor);
    z-index: 100;
    cursor: pointer;
  }

  .button {
    display: inline-block;
    margin: 0 0.2rem;

    &:not(.selected) {
      position: absolute;
      color: var(--minor);
      opacity: 0;
    }
  }

  &.active {
    .button {
      margin-right: 0.4rem;
    }

    .button:not(.selected) {
      position: relative;
      opacity: 100;
      &:hover {
        color: var(--major);
      }
    }
  }

  &:hover {
    .title {
      color: var(--major);
    }
  }
}
</style>
