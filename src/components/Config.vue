<template>
  <div :data-theme="configStore.getState().theme"><slot></slot></div>
</template>

<script lang="ts">
    import { defineComponent, provide, reactive } from 'vue'
    import { Store } from '@/utils/store'
    import themeList from '@/data/themeList.json'

    let defaultConfig = {
      showPinyin: true,
      theme: 'white',
      perPage: 50
    }

    const logConfig = (e: Object) => {
      console.log(
        '  ============ Config ============ \n\n',
        e,
        '\n\n  ============ Config ============',
      )
    }

    type ConfigType = typeof defaultConfig

    const saveKV = <T>(k: string, v: T) => {
      localStorage.setItem(k, JSON.stringify(v))
    }

    const config = Object.fromEntries(
      Object.entries(defaultConfig).map(([k, v]) => {const keyInStorage = localStorage.getItem(k)
      if (keyInStorage) return [k, JSON.parse(keyInStorage)]
      else {
        saveKV(k, v)
        return [k, v]
      }}),
    ) as ConfigType

    logConfig(config)

    class ConfigStore extends Store<ConfigType> {
      protected data() {
        return config
      }
      protected log(){
        logConfig(this.state)
      }
      togglePinyin(): void {
        this.state.showPinyin = !this.state.showPinyin
        saveKV('showPinyin', this.state.showPinyin)
        this.log()
      }
      setTheme(theme: string) {
        this.state.theme = theme
        saveKV('theme', theme)
        this.log()
      }
      setPerPage(newValue: number){
        this.state.perPage = newValue
        saveKV("perPage", this.state.perPage)
        this.log()
      }
      reset(){
        this.state = reactive(defaultConfig)
        this.log()
      }
      clear(){
        Object.entries(this.state).forEach(() => {})
      }
  }

    const configStore = new ConfigStore()

    declare const window: {
      config: ConfigStore
    }

    window.config = configStore

    export default defineComponent({
      setup() {
        provide('config', configStore)
        provide('theme', reactive(themeList))
        return {
          configStore
        }
      },
    })
    export type { ConfigStore }
</script>

<style lang="less"></style>
