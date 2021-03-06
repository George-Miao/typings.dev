/**
 * Util script to generate static dict.
 * Usage:
 * > yarn gen
 * or
 * > npm run gen
 */

import { splitInitialAndFinal } from './pinyin'

const zh = require('zh_cn')
const fs = require('fs')

const data = require('./data/wordList.json') as [string]

declare const process: {
  argv: string[]
}

const exportLength = parseInt(process.argv[2]) || 500

const generate = (e: string[]) =>
  e
    .filter(x => !/[0-9a-zA-Z!@#$%^&*_-]/.test(x))
    .sort(() => Math.random() - 0.5)
    .slice(0, exportLength)
    .map(e => {
      return {
        word: e,
        pinyin: (zh(e, { only_chinese: true }) as string[]).map(
          splitInitialAndFinal,
        ),
      }
    })
    .filter(e => e.pinyin)

fs.writeFile(
  'src/data/generated.json',
  JSON.stringify(generate(data)),
  (err: Error) => console.log(err?.message || 'done'),
)
