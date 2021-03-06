<template>
  <div id="panel">
    <word-list
      :words="words"
      :currentIndex="currentIndex"
      :statusList="statusList"
      :perPage="config.getState().perPage"
    />
    <div id="input-area">
      <input v-model="inputStr" @keypress.space="handleSpace" />
      <button @click="currentIndex += 1">redo</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, ref } from 'vue'
  import wordListData from '../data/generated.json'
  // import { splitInitialAndFinal } from '../utils/pinyin'
  import WordList from './WordList.vue'
  import { WordStatus } from '@/types'
  import { validate } from '@/utils/pinyin'
  import type { ConfigStore } from '@/components/Config.vue'
  import type { PinyinData } from '@/types'

  export default defineComponent({
    components: { WordList },
    setup() {
      const config = inject('config') as ConfigStore
      const words = (wordListData as PinyinData).sort(() => Math.random() - 0.5)
      const statusList = Array(config.getState().perPage).fill(
        WordStatus.NotReached,
      ) as WordStatus[]

      // const status:
      const currentIndex = ref(0)
      const inputStr = ref('')
      const handleSpace = (e: KeyboardEvent) => {
        const result = validate(
          config.getState().scheme,
          words[currentIndex.value][1],
          inputStr.value,
        )
        statusList[currentIndex.value] = result
          ? WordStatus.Correct
          : WordStatus.Wrong
        currentIndex.value += 1
        e.preventDefault()
        inputStr.value = ''
      }

      return {
        config,
        currentIndex,
        statusList,
        inputStr,
        handleSpace,
        words,
      }
    },
  })
</script>

<style>
  #panel {
    background: #fefefe;
    padding: 1.4rem 1rem;
    border-radius: 5px;
    margin: auto;
    max-width: 650px;
  }

  #input-area {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
  }

  #input-area input {
    flex: auto;
    border: none;
    border-radius: 0.2rem;
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
  }

  #input-area button {
    margin-left: 1rem;
    padding: 0.4rem 1rem;
    border-radius: 0.2rem;
    border: none;
    font-size: 1.2rem;
  }
</style>
