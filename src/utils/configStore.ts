import { computed, reactive } from 'vue'
import { Store } from '@/utils/store'
import { schemesNames } from '@/utils/pinyin'
import { Config } from '@/utils/types'
import { SupportedScheme, SupportedMode } from '@/utils/constants'
import { saveKV } from '.'
import GlobalStore from './globalStore'

const defaultConfig: Config = {
  showPinyin: true,
  theme: 'BoW',
  perPage: 25,
  scheme: SupportedScheme.Ziranma,
  mode: SupportedMode.Counted
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
  })
) as Config

// Config class
export default class ConfigStore extends Store<Config> {
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
          'Available themes': Object.keys(this.global.getState().themes).join(
            ' / '
          ),
          'Available schemes': this.schemes.join(' / ')
        },
        this.state
      )
    )
  }
  togglePinyin(): void {
    this.state.showPinyin = !this.state.showPinyin
    saveKV('showPinyin', this.state.showPinyin)
  }
  setTheme(theme: string) {
    if (!this.themes.includes(theme))
      throw new Error(`Unknown theme name ${theme}`)
    this.state.theme = theme
    saveKV('theme', theme)
  }
  setPerPage(perPage: number) {
    this.state.perPage = perPage
    saveKV('perPage', perPage)
    this.global.reload()
  }
  setScheme(scheme: SupportedScheme) {
    if (!schemesNames.includes(scheme))
      throw new Error(`Unknown scheme ${scheme}`)
    this.state.scheme = scheme
    saveKV('scheme', scheme)
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Object.entries(this.state).forEach(() => {})
  }
  get schemes() {
    return schemesNames
  }
  get themes() {
    return Object.keys(this.global.getState().themes)
  }
  get activeTheme() {
    return computed(() => this.global.getState().themes[this.getState().theme])
  }
}
