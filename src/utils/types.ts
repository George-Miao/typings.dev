import { InputStatus, SupportedMode, SupportedScheme } from './constants'
import { ComputedRef, Ref } from 'vue'

export type StrOrTuple = string | [string, string]
export type StrOrRegexp = string | RegExp
export type StrToSOT = {
  [k: string]: StrOrTuple
}

export type Setting = {
  title: string
  options: string[]
  index: ComputedRef<number>
  set: (index: number) => void
  closeIndicator: Ref<boolean>
  show?: ComputedRef<boolean>
}

export type PinyinUnit = [string] | [string, string]
export type Pinyin = PinyinUnit[]
export type PinyinData = [string, Pinyin][]

export type Themes = Record<string, Theme>

export interface Theme {
  background: string
  major: string
  minor: string
  highlight: string
  error: string
}

export interface Scheme {
  id: number
  name: SupportedScheme
  pinyin: string
  scheme: {
    initial: StrToSOT
    final: StrToSOT
    other: StrToSOT
  }
}

export interface Config {
  showPinyin: boolean
  perPage: number
  theme: string
  scheme: SupportedScheme
  mode: SupportedMode
}

export interface Global {
  status: InputStatus
  themes: Themes
  report?: StatReport
}

export interface InputRecord {
  word: string
  time: number
  correct: boolean
}

export interface InputReport {
  correct: boolean
  correctness: number
  wordPerSecond: number
  time: number
  used: number
  word: string
  chars: number
}

export interface StatReport extends InputReport {
  reports: InputReport[]
}
