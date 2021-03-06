<template>
  <div :data-theme="configStore.getState().theme"><slot></slot></div>
</template>

<script lang="ts">
  import { defineComponent, inject, provide, reactive, readonly } from 'vue'
  import { Store } from '@/utils/store'
  import themeList from '@/data/themeList.json'

  let defaultConfig = {
    showPinyin: true,
    theme: 'white',
    perPage: 50,
    scheme: 'ziranma',
  }

  type ConfigType = typeof defaultConfig

  const saveKV = <T>(k: string, v: T) => {
    localStorage.setItem(k, JSON.stringify(v))
  }

  // Load settings from localStorage
  // If cannot find corresponding key, create and return with default value
  const config = Object.fromEntries(
    Object.entries(defaultConfig).map(([k, v]) => {
      const keyInStorage = localStorage.getItem(k)
      if (keyInStorage) return [k, JSON.parse(keyInStorage)]
      else {
        saveKV(k, v)
        return [k, v]
      }
    }),
  ) as ConfigType

  // Config class
  class ConfigStore extends Store<ConfigType> {
    reload: () => void = () => {
      console.log('No reload function given, Fallback to location.reload...')
      location.reload()
    }
    constructor(reload?: () => void | undefined) {
      super()
      if (reload) this.reload = reload
    }
    protected data() {
      return config
    }
    printTable() {
      console.table(
        Object.assign(
          {
            'Available methods': Object.getOwnPropertyNames(ConfigStore.prototype)
              .slice(3)
              .join(' / '),
          },
          this.state,
        ),
      )
    }
    togglePinyin(): void {
      this.state.showPinyin = !this.state.showPinyin
      saveKV('showPinyin', this.state.showPinyin)
      this.printTable()
    }
    setTheme(theme: string) {
      this.state.theme = theme
      saveKV('theme', theme)
      this.printTable()
    }
    setPerPage(perPage: number) {
      this.state.perPage = perPage
      saveKV('perPage', perPage)
      this.printTable()
    }
    setScheme(scheme: string) {
      this.state.scheme = scheme
      saveKV('scheme', scheme)
      this.printTable()
      this.reload()
    }
    reset() {
      this.state = reactive(defaultConfig)
      this.printTable()
      this.reload()
    }
    clear() {
      //TODO: clear config settings
      Object.entries(this.state).forEach(() => {})
    }
  }

  declare const window: {
    config: ConfigStore
    help: () => void
  }

  export default defineComponent({
    setup() {
      const configStore = new ConfigStore(inject('reload'))
      configStore.reload()

      configStore.printTable()

      window.config = configStore
      window.help = () => {
        console.log(
          'Typings.dev help message\nConfig: use config.methodName in console to change configs',
        )
        configStore.printTable()
      }
      provide('config', configStore)
      provide('theme', reactive(themeList))
      return {
        configStore,
      }
    },
  })
  export type { ConfigStore }
</script>