<template>
  <div id="panel">
    <word-list :table="table" :currentIndex="currentIndex" />
    <div id="input-area">
      <input
        v-model="inputStr"
        @keypress.space="handleSpace"
        @input.once="startInput"
        @blur="loseFocus"
        @focus="restoreFocus"
        autofocus
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, reactive, ref } from 'vue'
  import wordListData from '../data/generated.json'
  import WordList from './WordList.vue'
  import { Pinyin, WordStatus } from '@/types'
  import { translatePinyin, validate } from '@/utils/pinyin'
  import type { ConfigStore, GlobalStore } from '@/components/Config.vue'
  import type { PinyinData } from '@/types'
  import { GlobalStatus } from '@/constants'

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
      const globalStore = inject('global') as GlobalStore

      // Setup variables
      const words = (wordListData as PinyinData).sort(() => Math.random() - 0.5)
      const ended = ref(false)
      const currentIndex = ref(0)
      const inputStr = ref('')
      const config = computed(() => configStore.getState())
      const global = computed(() => globalStore.getState())
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

      // Setup functions
      const startInput = () => {
        if (globalStore.status == GlobalStatus.Init) {
          globalStore.updateStatue(GlobalStatus.Started)
        }
      }
      const loseFocus = () => {
        if (globalStore.status == GlobalStatus.Started) {
          globalStore.updateStatue(GlobalStatus.Suspended)
        }
      }
      const restoreFocus = () => {
        if (globalStore.status == GlobalStatus.Suspended) {
          globalStore.updateStatue(GlobalStatus.Started)
        }
      }
      const end = () => {
        if (globalStore.status == GlobalStatus.Started) {
          globalStore.updateStatue(GlobalStatus.Ended)
        }
      }

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
        configStore,
        globalStore,
        GlobalStatus,
        table,
        currentIndex,
        inputStr,
        loseFocus,
        restoreFocus,
        handleSpace,
        startInput,
        words,
      }
    },
  })
</script>

<style lang="less">
  #input-area {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    input {
      flex: auto;
      padding: 0.4rem 0;
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
