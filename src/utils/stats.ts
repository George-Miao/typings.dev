import { InputRecord, InputReport, StatReport } from '@/utils/types'
import { canUsePerformance } from './index'

export abstract class StatsInterface {
  protected inputs: InputRecord[] = []

  protected last() {
    return this.inputs[this.inputs.length - 1]
  }

  start(word: string): void {
    this.inputs.push({
      word,
      correct: false,
      time: 0
    })
  }
  abstract suspend(): void
  abstract resume(): void
  abstract end(correct: boolean): void

  report(): StatReport {
    let corrects = 0
    let chars = 0
    let time = 0
    let prev = 0

    const inputs = this.inputs.length
    const entries = [...this.inputs.entries()]
    const allCorrect = entries.every(x => x[1].correct)

    const reports: InputReport[] = entries.map(([i, record]) => {
      if (record.correct) {
        corrects += 1
        chars += record.word.length
      }
      time += record.time

      const used = time / 1000 - prev
      prev = time / 1000

      return {
        correct: record.correct,
        wordPerSecond: (chars * 1000) / time,
        correctness: corrects / (i + 1),
        time: time / 1000,
        word: record.word,
        chars: record.word.length,
        used
      }
    })

    const correctness = corrects / inputs

    return {
      correct: allCorrect,
      wordPerSecond: (chars * 1000) / time,
      correctness,
      time: time / 1000,
      used: time / 1000,
      word: '',
      chars,
      reports
    }
  }
}

class DateStatController extends StatsInterface {
  private timer = 0
  start(word: string): void {
    super.start(word)
    this.timer = Date.now()
  }
  suspend(): void {
    const item = this.last()
    const duration = Date.now() - this.timer
    // console.log(`${item.word} suspended, used ${duration / 1000}s`)
    item.time += duration
  }
  resume(): void {
    this.timer = Date.now()
  }
  end(correct: boolean): void {
    const item = this.last()
    item.time += Date.now() - this.timer
    item.correct = correct
    // console.log(`${item.word} ended, used ${item.time / 1000}s`)
  }
}

class PerformanceStatController extends StatsInterface {
  start(word: string) {
    super.start(word)
    performance.mark(word)
  }

  suspend() {
    const item = this.last()
    const duration = performance.measure(
      `Suspend ${item.word}`,
      item.word
    ).duration
    // console.log(`${item.word} suspended, used ${duration / 1000}s`)
    item.time += duration
  }

  resume() {
    const item = this.last()
    performance.mark(item.word)
    // console.log(`${item.word} resumed`)
  }

  end(correct: boolean) {
    const item = this.last()
    const measured = performance.measure(`End ${item.word}`, item.word)
    // console.log(measured)
    item.time += measured.duration
    item.correct = correct
    // console.log(`${item.word} ended, used ${item.time / 1000}s`)
  }
}

export const getStat = (): StatsInterface => {
  if (canUsePerformance()) {
    // console.log('Can use performance API')
    return new PerformanceStatController()
  } else {
    // console.log('Cannot use performance API, using Date instead')
    return new DateStatController()
  }
}
