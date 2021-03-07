<template>
  <div id="panel">
    <word-list
      :words="words"
      :table="table"
      :currentIndex="currentIndex"
      :perPage="config.perPage"
    />
    <div id="input-area">
      <input v-model="inputStr" @keypress.space="handleSpace" />
      <button @click="currentIndex += 1">redo</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, reactive, ref } from 'vue'
  import wordListData from '../data/generated.json'
  // import { splitInitialAndFinal } from '../utils/pinyin'
  import WordList from './WordList.vue'
  import { Pinyin, WordStatus } from '@/types'
  import { translatePinyin, validate } from '@/utils/pinyin'
  import type { ConfigStore } from '@/components/Config.vue'
  import type { PinyinData } from '@/types'

  export interface TableItem {
    word: string
    pinyin: Pinyin
    shuang: string[]
    status: WordStatus
  }
  export type TableType = TableItem[]

  export default defineComponent({
    components: { WordList },
    setup() {
      const config = computed(() => (inject('config') as ConfigStore).getState())
      const words = (wordListData as PinyinData).sort(() => Math.random() - 0.5)
      const ended = ref(false)
      const end = () => {
        console.log('ended')
        ended.value = true
      }
      const redo = () => {
        console.log('redo')
        ended.value = false
      }
      const table: TableType = reactive(
        words.slice(0, config.value.perPage).map(e => {
          return {
            word: e[0],
            pinyin: e[1],
            shuang: translatePinyin(config.value.scheme, e[1]),
            status: WordStatus.NotReached,
          }
        }),
      )

      // const status:
      const currentIndex = ref(0)
      const inputStr = ref('')
      const handleSpace = (e: KeyboardEvent) => {
        e.preventDefault()
        if (ended.value) return
        const result = validate(
          config.value.scheme,
          words[currentIndex.value][1],
          inputStr.value,
        )
        table[currentIndex.value].status = result
          ? WordStatus.Correct
          : WordStatus.Wrong
        currentIndex.value += 1
        if (currentIndex.value == config.value.perPage) end()
        inputStr.value = ''
      }

      return {
        config,
        table,
        currentIndex,
        inputStr,
        handleSpace,
        words,
      }
    },
  })
</script>

<style lang="less">
  #panel {
    padding: 1.4rem 1rem;
    border-radius: 5px;
    margin: auto;
    max-width: 650px;
  }

  #input-area {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    input {
      flex: auto;
      border: none;
      border-radius: 0.2rem;
      padding: 0.4rem 1rem;
      font-size: 1.2rem;
      font-family: 'JetBrains Mono', monospace;
      text-transform: capitalize;
    }
    button {
      margin-left: 1rem;
      padding: 0.4rem 1rem;
      border-radius: 0.2rem;
      border: none;
      font-size: 1.2rem;
    }
  }
</style>
