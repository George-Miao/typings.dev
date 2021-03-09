import type {SupportedScheme, SupportedThemes} from '@/constants'
import { ComputedRef, Ref } from '@vue/reactivity'
export enum WordStatus {
  NotReached,
  Wrong,
  Correct,
}
export type StrOrAry = string | [string, string]
export type StrOrRegexp = string | RegExp
export type StrToStrOrAry = {
  [k: string]: StrOrAry
}

export interface Config {
  showPinyin: boolean
  theme: SupportedThemes
  perPage: number
  scheme: SupportedScheme
  mode: 'counted'
}

export type Setting = {
  title: string
  options: string[]
  selected: ComputedRef<number>
  show: ComputedRef<boolean> | boolean
  select: (index: number) => void
}
export interface Scheme {
  id: number
  name: SupportedScheme
  pinyin: string
  scheme: {
    initial: StrToStrOrAry
    final: StrToStrOrAry
    other: StrToStrOrAry
  }
}
export type PinyinUnit = [string] | [string, string]
export type Pinyin = PinyinUnit[]
export type PinyinData = [string, Pinyin][]

