/**
 * Util script to generate static dict.
 * Usage:
 * > yarn gen
 * or
 * > npm run gen
 */

const { splitInitialAndFinal } = require('./pinyin.ts')

const zh = require('zh_cn')
const fs = require('fs')

const data = require('../data/wordList.json')

const exportLength = parseInt(process.argv[2]) || 500

const generate = e =>
  e
    .filter(x => !/[0-9a-zA-Z!@#$%^&*_-]/.test(x))
    .sort(() => Math.random() - 0.5)
    .map(e => {
      return [e, zh(e, { only_chinese: true }).map(splitInitialAndFinal)]
    })
    .filter(e => e[1])
    .slice(0, exportLength)

fs.writeFile('src/data/generated.json', JSON.stringify(generate(data)), e =>
  console.log(e?.message || 'done'),
)
