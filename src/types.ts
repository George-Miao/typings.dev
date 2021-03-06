export enum WordStatus {
  NotReached,
  Wrong,
  Correct,
  Inputting,
}
export type Pinyin = ([string] | [string, string])[]
export type PinyinData = [string, Pinyin][]
