<template>
  <div id="word-list-container">
    <div
      v-for="(word, index) in currentPage"
      :key="word.word"
      :class="{ 'word-list-item': true, 'highlight': index === currentIndex }"
      :ref="pushRef"
    >
      <span class="pinyin" :class="{ hide: !config.getState().showPinyin }">{{
        word[1]
      }}</span>
      {{ word[0] }}
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, PropType, inject } from 'vue'
  import type { PinyinData } from '@/types'
  // import type { ConfigStore } from '@/components/Config.vue'
  export default defineComponent({
    props: {
      wordList: { type: Object as PropType<PinyinData>, required: true },
      perPage: { type: Number, required: true },
      currentIndex: { type: Number, default: 0 },
    },
    setup(props) {
      const itemRefs = ref([] as Array<HTMLElement>)
      const pushRef = (el: any) => itemRefs.value.push(el)
      const current = computed(() => {
        const currentItem = props.wordList[props.currentIndex]
        return {
          word: currentItem[0],
          pinyin: currentItem[1],
        }
      })
      const currentPage = computed(() => props.wordList.slice(0, props.perPage))

      return {
        config: inject('config'),
        current,
        currentPage,
        pushRef,
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
  .pinyin {
    position: relative;
    font-size: 8px;
  }
  .word-list-item {
    box-sizing: content-box;
    margin: 0.1rem 0.45rem;
    color: #363434;
    text-align: center;
    /* font-size: 1.2rem; */
  }
  .highlight {
    color: #a56de2;
  }
</style>
