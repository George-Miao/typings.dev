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
export interface Scheme {
  id: number
  name: string
  pinyin: string
  scheme: {
    initial: StrToStrOrAry
    final: StrToStrOrAry
    other: StrToStrOrAry
  }
}
export type Pinyin = ([string] | [string, string])[]
export type PinyinData = [string, Pinyin][]
