export enum WordStatus {
  NotReached,
  Wrong,
  Correct,
}
export type Pinyin = ([string] | [string, string])[]
export type PinyinData = [string, Pinyin][]
