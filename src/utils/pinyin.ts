import scheme from '@/data/scheme.json'
import type { Pinyin, Scheme, StrOrAry } from '@/types'

const data = scheme as Scheme[]

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

export const schemesNames = data.map(e => e.pinyin)

const getRegexpPart = (e: StrOrAry): string => {
  if (typeof e === 'string') return e
  return `(${e[0]}|${e[1]})`
}

const flattenStrOrAry = (e: StrOrAry): string => {
  if (typeof e === 'string') return e
  return e[0]
}

const validate = (schemeName: string, pinyin: Pinyin, input: string) => {
  const schemeMapping = data.find(e => 
    e.pinyin === schemeName
  )?.scheme
  if (!schemeMapping) return false
  let regexpStr = ""
  pinyin.forEach(e => {
    if (e.length == 1){
      regexpStr += getRegexpPart(schemeMapping.other[e[0]])
    }
    else if (e.length == 2){
      regexpStr += getRegexpPart(schemeMapping.initial[e[0]]) + getRegexpPart(schemeMapping.final[e[1]])
    }
  })
  return new RegExp(regexpStr).test(input)
}

const translatePinyin = (schemeName: string, pinyin: Pinyin) => {
  const schemeMapping = data.find(e => 
    e.pinyin === schemeName
  )?.scheme
  if (!schemeMapping) return [""]
  let ret: string[] = []
  pinyin.forEach(e => {
    if (e.length == 1){
      ret.push(flattenStrOrAry(schemeMapping.other[e[0]]))
    }
    else if (e.length == 2){
      ret.push(
        flattenStrOrAry(schemeMapping.initial[e[0]]) 
        + 
        flattenStrOrAry(schemeMapping.final[e[1]])
        )
    }
  })
  return ret
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

export { pinyinPart, pinyinRegex as PinyinRegex, splitInitialAndFinal, validate, translatePinyin }
