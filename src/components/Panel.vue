<template>
  <div id="panel">
    <word-list
      :wordList="wordListData"
      :currentIndex="currentIndex"
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
  // import { WordStatus } from '@/types'
  import type { PinyinData } from '@/types'

  export default defineComponent({
    components: { WordList },
    setup() {
      const words = (wordListData as PinyinData)
        .sort(() => Math.random() - 0.5)
      // const status:
      const currentIndex = ref(0)
      const current = computed(() => words[currentIndex.value])
      const inputStr = ref('')
      const handleSpace = (e: KeyboardEvent) => {
        currentIndex.value += 1
        console.log(current.value.word, current.value.pinyin)
        e.preventDefault()
        inputStr.value = ''
      }

      return {
        config: inject('config'),
        currentIndex,
        inputStr,
        handleSpace,
        wordListData: words,
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
    background: #e8c4b8;
    border-radius: 0.2rem;
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
  }

  #input-area button {
    margin-left: 1rem;
    padding: 0.4rem 1rem;
    border-radius: 0.2rem;
    border: none;
    background: #363434;
    color: #e8c4b8;
    font-size: 1.2rem;
  }
</style>
