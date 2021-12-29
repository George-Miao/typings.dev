/**
 * Util script to generate static dict.
 * Usage:
 * > yarn gen
 * or
 * > npm run gen
 */

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
    'w'
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
    'v'
  ]
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
  'ou'
]

const pinyinRegex = new RegExp(
  `(${pinyinPart.initial.join('|')})?(${pinyinPart.final.join('|')})`
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

import zh from 'zh_cn'
import fs from 'fs'

import data from '../data/wordList.json'

const exportLength = parseInt(process.argv[2]) || 500

const generate = (e: any[]) =>
  e
    .filter((x: string) => !/[0-9a-zA-Z!@#$%^&*_-]/.test(x))
    .sort(() => Math.random() - 0.5)
    .map((e: any) => {
      return [e, zh(e, { only_chinese: true }).map(splitInitialAndFinal)]
    })
    .filter((e: any[]) => e[1])
    .slice(0, exportLength)

fs.writeFile(
  'src/data/generated.json',
  JSON.stringify(generate(data)),
  (e: { message: any }) => console.log(e?.message || 'done')
)
