<template>
  <div id="word-list-container">
    <div
      v-for="(item, index) in currentPage"
      :key="item.word"
      class="word-list-item"
      :class="{
        correct: item.status === WordStatus.Correct,
        wrong: item.status === WordStatus.Wrong,
        highlight: index === currentIndex,
      }"
      :ref="pushRef"
    >
      <span class="pinyin" :class="{ hide: !config.showPinyin }">{{
        item.shuang.join(' / ')
      }}</span>
      {{ item.word }}
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, PropType, inject } from 'vue'
  import { WordStatus } from '@/types'
  import { translatePinyin } from '@/utils/pinyin'
  import { TableType } from './Panel.vue'
  import { ConfigStore } from './Config.vue'

  export default defineComponent({
    props: {
      table: { type: Object as PropType<TableType>, required: true },
      currentIndex: { type: Number, default: 0 },
    },
    setup(props) {
      const config = computed(() => (inject('config') as ConfigStore).getState())
      const itemRefs = ref([] as Array<HTMLElement>)
      const pushRef = (el: any) => itemRefs.value.push(el)
      const current = computed(() => {
        const currentItem = props.table[props.currentIndex]
        return {
          word: currentItem.word,
          pinyin: currentItem.pinyin,
        }
      })
      const currentPage = computed(() =>
        props.table.slice(0, config.value.perPage),
      )

      return {
        config,
        WordStatus,
        current,
        currentPage,
        pushRef,
        translatePinyin,
      }
    },
  })
</script>

<style lang="less">
  #word-list-container {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    overflow: hidden;
  }

  .word-list-item {
    box-sizing: content-box;
    margin: 0.1rem 0.45rem;
    text-align: center;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* font-size: 1.2rem; */
    .pinyin {
      // position: absolute;
      font-size: 0.6rem;
      // top: -0.5rem;
    }
  }
</style>
