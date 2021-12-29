<template>
  <LineChart :chartData="chartData" :options="chartOption" :height="200" />
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, reactive } from 'vue'
import { LineChart } from 'vue-chart-3'
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  ChartData,
  ChartDataset,
  ChartOptions,
  ScatterController,
  FontSpec
} from 'chart.js'

Chart.register(
  LineElement,
  LinearScale,
  LineController,
  CategoryScale,
  PointElement,
  ScatterController,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
)

import type { StatReport } from '@/utils/types'

import ConfigStore from '@/utils/configStore'
const addHead = <T>(arr: T[], val: T) => {
  return [val, ...arr]
}

const defaultLineTheme: Omit<ChartDataset<'line'>, 'data'> = {
  fill: false,
  borderWidth: 2,
  pointRadius: 2,
  tension: 0.3
}

const defaultScatterTheme: Omit<ChartDataset<'scatter'>, 'data'> = {
  type: 'scatter',
  label: 'error',
  pointRadius: 5,
  borderWidth: 2.5,
  pointStyle: 'circle',
  pointRotation: 45,
  cubicInterpolationMode: 'monotone'
}

const font: Partial<FontSpec> = {
  size: 12,
  family: 'Jetbrains Mono'
}

Chart.defaults.font = font

const chartOptionBase: ChartOptions<'line' | 'scatter'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'nearest',
      intersect: false
    }
  },
  scales: {
    x: {
      type: 'linear',
      beginAtZero: true,
      ticks: { callback: value => value + 's' }
    },
    y: {
      beginAtZero: true,
      ticks: {
        autoSkip: true,
        // autoSkipPadding: 40,
        count: 5
      },
      title: {
        text: 'WPM',
        display: true
      }
    },
    correctness: {
      beginAtZero: true,
      position: 'right',
      stacked: true,
      grid: {
        display: false
      },
      ticks: {
        precision: 0,
        count: 3,
        callback: value => value + '%'
      },
      title: {
        text: '准确度',
        display: true
      }
    }
  }
}

export default defineComponent({
  components: {
    LineChart
  },
  props: {
    report: {
      type: Object as PropType<StatReport>,
      require: true
    }
  },

  setup(props) {
    const config = inject('config') as ConfigStore
    const theme = config.activeTheme
    const report = props.report as StatReport
    const data = report.reports
    const correctness = data.map(x => {
      return { x: x.time, y: x.correctness * 100, word: x.word, time: x.used }
    })
    const errors = data
      .filter(x => !x.correct)
      .map(x => {
        return { x: x.time, y: x.correctness * 100, word: x.word, time: x.used }
      })
    const wpm = data.map(x => {
      return {
        x: x.time,
        y: parseFloat((x.wordPerSecond * 60).toFixed(1)),
        word: x.word,
        time: x.used
      }
    })

    const major = computed(() => theme.value.highlight)
    const minor = computed(() => theme.value.minor)
    const error = computed(() => theme.value.error)

    const chartData: ChartData<'line' | 'scatter'> = reactive({
      datasets: [
        // Correctness
        {
          ...defaultLineTheme,
          borderColor: minor,
          pointBackgroundColor: minor,
          data: addHead(correctness, { x: 0, y: 100, time: 0, word: '' }),
          yAxisID: 'correctness',
          label: '准确度',
          order: 3
        },
        // Errors
        {
          ...defaultScatterTheme,
          borderColor: error,
          yAxisID: 'correctness',
          label: '错误',
          data: errors,
          order: 1
        },
        // WPM
        {
          ...defaultLineTheme,
          borderColor: major,
          pointBackgroundColor: major,
          fill: true,
          data: addHead(wpm, { x: 0, y: 0, time: 0, word: '' }),
          // data: [],
          label: 'WPM',
          order: 2
        }
      ]
    })

    const chartOption: ChartOptions<'line' | 'scatter'> = reactive({
      ...chartOptionBase,
      color: minor,
      borderColor: minor
    })

    if (chartOption.plugins?.tooltip)
      chartOption.plugins.tooltip.callbacks = {
        title: title => {
          const t = title[0]
          const val = t.raw as { word: string; time: number }
          return val.time == 0
            ? '开始'
            : `"${val.word}" ${val.time.toFixed(1)}s`
        }
      }

    const scale = chartOption.scales
    if (scale) {
      Object.values(scale).forEach(x => {
        const color = minor
        if (x?.ticks) x.ticks.color = color.value
        if (x?.title) x.title.color = color.value
      })
    }

    return {
      chartData: chartData as unknown as ChartData<'line'>,
      chartOption
    }
  }
})
</script>
