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
export enum Themes {
  BoW = 'BoW',
}
export enum SupportedScheme {
  Ziranma = 'ziranma',
  Guobiao = 'guobiao',
  Pinyinjiajia = 'pinyinjiajia',
  Sougou = 'sougou',
  Weiruan = 'weiruan',
  Xiaohe = 'xiaohe',
  ZhinengABC = 'zhinengABC',
  Ziguang = 'ziguang',
}
export interface Config {
  showPinyin: boolean
  theme: Themes
  perPage: number
  scheme: SupportedScheme
  mode: 'counted'
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
