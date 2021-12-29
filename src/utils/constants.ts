export enum WordStatus {
  NotReached,
  Wrong,
  Correct
}

export enum SupportedScheme {
  Pinyin = '拼音',
  Ziranma = '自然码',
  Guobiao = '国标',
  Pinyinjiajia = '拼音加加',
  Sougou = '搜狗双拼',
  Weiruan = '微软',
  Xiaohe = '小鹤',
  ZhinengABC = '智能ABC',
  Ziguang = '紫光双拼'
}

export enum SupportedMode {
  Counted = 'Counted'
}

export enum InputStatus {
  Init = 'Init',
  Started = 'Started',
  Suspended = 'Suspended',
  Ended = 'Ended'
}

export const countOptions = [5, 10, 15, 25, 50]
