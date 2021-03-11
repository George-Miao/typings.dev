<template>
  <div id="word-list-container">
    <div
      id="continue-button"
      :class="{transparent: global.status !== GlobalStatus.Suspended}"
      class="no-select"
    >
      <a>Refocus to continue</a>
    </div>

    <div
      id="word-list-item-container"
      :class="{blur: [GlobalStatus.Suspended, GlobalStatus.Ended].includes(global.status) }"
    >
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
        <transition name="fade-pinyin">
          <a class="pinyin" v-if="config.showPinyin">
            {{
            item.shuang.map(e => e[0].toUpperCase() + e[1]).join('')
            }}
          </a>
        </transition>
        {{ item.word }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, PropType, inject } from 'vue'
  import { WordStatus } from '@/types'
  import { GlobalStatus } from '@/constants'
  import { translatePinyin } from '@/utils/pinyin'
  import { TableType } from './Panel.vue'
  import { ConfigStore, GlobalStore } from './Config.vue'

  export default defineComponent({
    props: {
      table: { type: Object as PropType<TableType>, required: true },
      currentIndex: { type: Number, default: 0 },
    },
    setup(props) {
      const global = inject('global') as GlobalStore
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
        global,
        GlobalStatus,
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
  @offset: 3px;
  @radius: 15px;
  #continue-button {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      svg {
        position: relative;
        color: var(--major);
        border-radius: 50%;
        border: 1.9px solid var(--major);
        padding: @radius @radius - @offset @radius @radius + @offset;
        z-index: 10;
        cursor: pointer;
        &:hover {
          background: var(--major);
          opacity: 0.7;
          color: var(--bg);
        }
      }
    }
    a {
      color: var(--major);
      z-index: 10;
      margin: 2rem;
      font-size: 1.4rem;
    }
  }
  .fade-pinyin-enter-active {
    animation: pinyin-fade-in 0.5s;
    animation-timing-function: ease;
  }
  .fade-pinyin-leave-active {
    animation: pinyin-fade-in 0.5s reverse;
    animation-timing-function: ease;
  }
  @keyframes pinyin-fade-in {
    0% {
      position: relative;
      opacity: 0;
      transform: scale(0);
    }
    50% {
      position: relative;
      opacity: 0.2;
    }
    75% {
      transform: scale(1.1);
    }
    100% {
      position: relative;
      opacity: 1;
      transform: scale(1);
    }
  }
  #word-list-container {
    position: relative;
  }

  #word-list-item-container {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    overflow: hidden;
    position: relative;
  }

  .word-list-item {
    box-sizing: content-box;
    margin: 0 0.8rem 0.2rem 0;
    text-align: center;
    margin-bottom: 0.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    font-weight: 700;
    /* font-size: 1.2rem; */
    .pinyin {
      position: relative;
      font-size: 0.75rem;
      top: 0.1rem;
    }
  }
</style>
