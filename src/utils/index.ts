import { Theme } from './types'

export const saveKV = <T>(k: string, v: T) => {
  localStorage.setItem(k, JSON.stringify(v))
}

export const canUsePerformance = () => {
  if (!performance) return false
  performance.mark('test')

  if (performance.measure('_', 'test')) {
    return true
  } else {
    console.warn(
      'Your browser does not implement Performance API correctly, it is likely firefox. Fallback to Date API'
    )
    return false
  }
}

const updateMeta = (name: string, value: string) => {
  const metaTags = [...document.querySelectorAll('meta').values()]
  const result = metaTags.find(e => e.name === name)
  result?.parentNode?.removeChild(result)
  const item = document.createElement('meta')
  item.name = name
  item.content = value
  document.querySelector('head')?.append(item)
}

export const onThemeUpdate = (theme: Theme) => {
  const color = theme.background
  updateMeta('msapplication-TileColor', color)
  updateMeta('theme-color', color)
}
