import type { Pinyin, Scheme, StrOrTuple } from '@/utils/types'
import { SupportedScheme } from '@/utils/constants'
import scheme from '@/data/scheme.json'

const data = scheme as Scheme[]

export const schemesNames = data.map(e => e.name as string)

const getRegexpPart = (e: StrOrTuple): string => {
  if (typeof e === 'string') return e
  return `(${e[0]}|${e[1]})`
}

const flattenStrOrAry = (e: StrOrTuple): string => {
  if (typeof e === 'string') return e
  return e[0]
}

const validate = (
  schemeName: SupportedScheme,
  pinyin: Pinyin,
  input: string
) => {
  const schemeMapping = data.find(e => e.name === schemeName)?.scheme
  if (!schemeMapping) return false
  let regexpStr = ''
  pinyin.forEach(e => {
    if (e.length == 1) {
      regexpStr += getRegexpPart(schemeMapping.other[e[0]])
    } else if (e.length == 2) {
      regexpStr +=
        getRegexpPart(schemeMapping.initial[e[0]]) +
        getRegexpPart(schemeMapping.final[e[1]])
    }
  })
  return new RegExp(regexpStr).test(input)
}

const translatePinyin = (schemeName: SupportedScheme, pinyin: Pinyin) => {
  const schemeMapping = data.find(e => e.name === schemeName)?.scheme
  if (!schemeMapping) return ['']
  const ret: string[] = []
  pinyin.forEach(e => {
    if (e.length == 1) {
      ret.push(flattenStrOrAry(schemeMapping.other[e[0]]))
    } else if (e.length == 2) {
      ret.push(
        flattenStrOrAry(schemeMapping.initial[e[0]]) +
          flattenStrOrAry(schemeMapping.final[e[1]])
      )
    }
  })
  return ret
}

export { validate, translatePinyin }
