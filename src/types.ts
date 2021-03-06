export enum WordStatus {
  NotReached,
  Wrong,
  Correct,
  Inputting,
}

export type PinyinData = {
  word: string
  pinyin: [number, number][]
}[]
