<template>
  <div id="panel">
    <word-list :table="table" :currentIndex="currentIndex" />
    <div id="input-area">
      <input
        v-model="inputStr"
        ref="inputRef"
        @keypress.space="handleSpace"
        @keyup="handleInput"
        @input.once="startInput"
        @blur="loseFocus"
        @focus="restoreFocus"
        autofocus
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, reactive, ref } from 'vue'
import wordListData from '@/data/generated.json'

import type { PinyinData, Pinyin } from '@/utils/types'
import WordList from '@/components/WordList.vue'
import router from '@/router'

import { translatePinyin, validate } from '@/utils/pinyin'
import { getStat } from '@/utils/stats'
import { InputStatus, WordStatus } from '@/utils/constants'
import { ConfigStore } from '@/App.vue'

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
    // Inject global dependencies
    const configStore = inject('config') as ConfigStore
    const globalStore = configStore.global

    // Setup variables
    const words = (wordListData as PinyinData).sort(() => Math.random() - 0.5)
    const ended = ref(false)
    const currentIndex = ref(0)
    const inputStr = ref('')
    const inputRef = ref<HTMLInputElement | null>(null)
    const config = computed(() => configStore.getState())
    const global = computed(() => globalStore.getState())
    const table: TableType = reactive(
      words.slice(0, config.value.perPage).map(e => {
        return {
          word: e[0],
          pinyin: e[1],
          shuang: translatePinyin(config.value.scheme, e[1]),
          status: WordStatus.NotReached
        }
      })
    )
    let stat = reactive(getStat())

    // Setup functions
    const startInput = () => {
      if (global.value.status == InputStatus.Init) {
        globalStore.updateStatue(InputStatus.Started)
        stat.start(words[currentIndex.value][0])
      }
    }
    const loseFocus = () => {
      if (global.value.status == InputStatus.Started) {
        globalStore.updateStatue(InputStatus.Suspended)
        stat.suspend()
      }
    }
    const restoreFocus = () => {
      if (global.value.status == InputStatus.Suspended) {
        globalStore.updateStatue(InputStatus.Started)
        stat.resume()
      }
    }
    const end = () => {
      if (global.value.status == InputStatus.Started) {
        globalStore.updateStatue(InputStatus.Ended)
        ended.value = true
        const report = stat.report()
        globalStore.newReport(report)
        router.push('/stat')
      }
    }
    const restart = () => {
      if (global.value.status == InputStatus.Ended) {
        globalStore.updateStatue(InputStatus.Init)
        stat = getStat()
        globalStore.clearReport()
      }
    }

    const pauseKey = ['Escape']
    const handleInput = (e: KeyboardEvent) => {
      if (pauseKey.includes(e.key)) {
        e.preventDefault()
        loseFocus()
      }
    }

    const handleSpace = (e: KeyboardEvent) => {
      e.preventDefault()
      if (!(global.value.status == InputStatus.Started)) {
        return
      }
      if (ended.value) return
      const input = inputStr.value ?? ''
      const word = words[currentIndex.value]
      const result = validate(config.value.scheme, word[1], input)
      stat.end(result)
      table[currentIndex.value].status = result
        ? WordStatus.Correct
        : WordStatus.Wrong
      currentIndex.value += 1

      currentIndex.value == config.value.perPage
        ? end()
        : stat.start(words[currentIndex.value][0])
      inputStr.value = ''
    }

    onMounted(() =>
      inputRef.value?.focus()
    )

    return {
      table,
      currentIndex,
      inputStr,
      loseFocus,
      restoreFocus,
      handleInput,
      handleSpace,
      startInput,
      inputRef,
      restart
    }
  }
})
</script>

<style lang="less">
#input-area {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;

  input {
    flex: auto;
    border: none;
    padding: 0.4rem 0;
    font-size: 1.2rem;
    font-family: 'JetBrains Mono', monospace;
    text-transform: lowercase;

    color: var(--major);
    background: var(--background);
    border-bottom: 2px solid var(--major);

    &:focus {
      outline: none;
    }
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
