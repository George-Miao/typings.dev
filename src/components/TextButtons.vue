<template>
  <div class="text-button-wrap">
    <span class="title">{{title}}</span>
    <span
      v-for="(item, index) in items"
      @click="select(item)"
      :key="index"
      :class="{selected: index == selected, button: true}"
    >{{item}}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, Prop, PropType, ref } from 'vue'
  export default defineComponent({
    props: {
      items: { type: Object as PropType<Array<String>>, require: true },
      selected: { type: Object as PropType<number>, require: true },
      title: { type: Object as PropType<String>, require: true },
    },
    methods: {
      select(item: string) {
        const newIndex = this.items?.indexOf(item)
        this.$emit('select', {
          prevIndex: this.selected,
          newIndex: newIndex,
          prevVal: this.items?.[this.selected ?? 0],
          nextVal: item,
        })
        this.selected = newIndex ?? 0
      },
    },
  })
</script>

<style lang="less">
  .text-button-wrap {
    font-size: 0.8rem;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    position: relative;
    height: 2.3rem;
    .title {
      display: inline-block;
      padding: 0.2rem;
      font-size: 1rem;
      background: var(--bg);
      z-index: 100;
    }

    .button {
      display: inline-block;
      cursor: pointer;
      padding: 0.2rem;
      // transition: all 0.4s ease-in-out;
      &:not(.selected) {
        position: absolute;
        color: var(--sub);
        opacity: 0;
        // width: 0;
      }
    }
    &:hover {
      .button {
        // transition: all 0.8s ease-in-out;
      }
      .button:not(.selected) {
        position: relative;
        opacity: 100;
        // width: ;
        &:hover {
          color: var(--major);
        }
      }
    }
  }
</style>