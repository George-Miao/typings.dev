<template>
  <div id="root" :data-theme="config.getState().theme">
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, provide, reactive } from 'vue'
  import { Store } from '@/utils/store'
  import { schemesNames } from '@/utils/pinyin'
  import { Config, Global } from '@/types'
  import {
    SupportedThemes,
    SupportedScheme,
    GlobalStatus,
    SupportedMode,
  } from '@/constants'

  let defaultConfig: Config = {
    showPinyin: true,
    theme: SupportedThemes.BoW,
    perPage: 50,
    scheme: SupportedScheme.Ziranma,
    mode: SupportedMode.Counted,
  }

  let initGlobal: Global = {
    status: GlobalStatus.Init,
  }

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
  ) as Config

  // Config class
  class ConfigStore extends Store<Config> {
    global: GlobalStore
    constructor(global: GlobalStore) {
      super()
      this.global = global
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
            'Available themes': this.themes.join(' / '),
            'Available schemes': this.schemes.join(' / '),
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
    setTheme(theme: SupportedThemes) {
      if (!this.themes.includes(theme))
        throw new Error(`Unknown theme name ${theme}`)
      this.state.theme = theme
      saveKV('theme', theme)
      this.printTable()
    }
    setPerPage(perPage: number) {
      this.state.perPage = perPage
      saveKV('perPage', perPage)
      this.printTable()
      this.global.reload()
    }
    setScheme(scheme: SupportedScheme) {
      if (!schemesNames.includes(scheme))
        throw new Error(`Unknown scheme ${scheme}`)
      this.state.scheme = scheme
      saveKV('scheme', scheme)
      this.printTable()
      this.global.reload()
    }
    reset() {
      this.state = reactive(defaultConfig)
      Object.entries(defaultConfig).map(([k, v]) => {
        saveKV(k, v)
      })
      this.printTable()
      this.global.reload()
    }
    clear() {
      //TODO: clear config settings
      Object.entries(this.state).forEach(() => {})
    }
    get schemes() {
      return schemesNames
    }
    get themes() {
      return Object.values(SupportedThemes)
    }
  }

  class GlobalStore extends Store<Global> {
    constructor(reload?: () => void | undefined) {
      super()
      if (reload) this.reload = reload
    }
    reload: () => void = () => {
      console.log('No reload function given, Fallback to location.reload...')
      location.reload()
    }
    data() {
      return initGlobal
    }
    get status() {
      return this.state.status
    }
    updateStatue(newStatus: GlobalStatus) {
      this.state.status = newStatus
      console.log(`Updated status: ${newStatus}`)
    }
  }

  declare const window: {
    config: ConfigStore
    help: () => void
  }

  export default defineComponent({
    setup() {
      const global = new GlobalStore(inject('reload'))
      const config = new ConfigStore(global)

      global.reload()

      window.config = config
      window.help = () => {
        console.log('== Typings.dev help message ==')
        console.log('Config: use config.methodName to change settings')
        console.log(
          'Configs will be stored in localStorage, use config.reset() to reset',
        )
        config.printTable()
      }

      provide('config', config)
      provide('global', global)
      return {
        config,
      }
    },
    mounted() {
      window.help()
    },
  })

  export type { ConfigStore, GlobalStore }
</script>