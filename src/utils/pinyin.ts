import scheme from '@/data/scheme.json'
import type { Pinyin } from '@/types'

const pinyinPart = {
  initial: [
    'zh',
    'sh',
    'ch',
    'b',
    'p',
    'm',
    'f',
    'd',
    'v',
    't',
    'n',
    'l',
    'g',
    'k',
    'h',
    'j',
    'q',
    'x',
    'r',
    'z',
    'c',
    's',
    'y',
    'w',
  ],
  final: [
    'iang',
    'iong',
    'uang',
    'ueng',
    'ang',
    'eng',
    'ong',
    'ing',
    'ian',
    'iao',
    'iou',
    'uan',
    'uai',
    'uen',
    'uei',
    'ia',
    'ie',
    'in',
    'iu',
    'ua',
    'un',
    'uo',
    'ue',
    'ui',
    'an',
    'ai',
    'ei',
    'ao',
    'ou',
    'en',
    've',
    'a',
    'o',
    'e',
    'i',
    'u',
    'v',
  ],
}
const otherPinyin = [
  'a',
  'ao',
  'ai',
  'an',
  'ang',
  'e',
  'ei',
  'en',
  'eng',
  'er',
  'o',
  'ou',
]
const schemesMeta = scheme.map(e => {
  return {
    id: e.id,
    name: e.name,
    pinyin: e.pinyin,
  }
})

const allSchemes = schemesMeta.map(e => e.name)

const validate = (usingScheme: string, pinyin: Pinyin, input: Pinyin):boolean => {
  if (!allSchemes.includes(usingScheme)) {
    return false
  }
  const schemeDetail = scheme.
  pinyin.forEach(e => {
    if (e.length == 1){
      scheme.
    }
  })
  return true
}

const pinyinRegex = new RegExp(
  `(${pinyinPart.initial.join('|')})?(${pinyinPart.final.join('|')})`,
)

const splitInitialAndFinal = (pinyin: string) => {
  pinyin = pinyin.toLowerCase()
  if (otherPinyin.includes(pinyin)) return [pinyin]
  const result = pinyin.match(pinyinRegex)?.slice(1) as
    | [string, string]
    | undefined
  if (result) {
    return [result[0], result[1]]
  } else return null
}

export { pinyinPart, pinyinRegex as PinyinRegex, splitInitialAndFinal }
