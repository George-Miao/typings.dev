<template>
  <div class="view">
    <StatChart :report="chartData" id="stat-chart"></StatChart>

    <div id="stat-data" class="no-select">
      <div class="data-group">
        <p class="label">WPM</p>
        <p class="data">{{ (chartData.wordPerSecond * 60).toFixed(1) }}</p>
      </div>
      <div class="data-group">
        <p class="label">准确度</p>
        <p class="data">{{ (chartData.correctness * 100).toFixed(1) }}%</p>
      </div>
      <div class="data-group">
        <p class="label">词数</p>
        <p class="data">{{ chartData.reports.length }}</p>
      </div>
      <div class="data-group">
        <p class="label">用时</p>
        <p class="data">{{ chartData.time.toFixed(1) }}s</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import StatChart from '@/components/StatChart.vue'
import { StatReport } from '@/utils/types'
import { global } from '@/App.vue'

export default defineComponent({
  components: { StatChart },
  beforeRouteEnter(_to: any, _from: any, next: (arg0?: unknown) => void) {
    if (!global.report) {
      console.log('No report found, return to home')
      next({ replace: true, path: '/' })
    } else next()
  },
  setup() {
    const reports = global.report as StatReport

    return {
      chartData: reports
    }
  }
})
</script>
<style lang="less" scoped>
#stat-data {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  box-sizing: border-box;

  .data-group {
    display: flex;
    align-items: center;

    p {
      cursor: default;
      &.label {
        color: var(--minor);
        margin: 0 0.5rem;
      }

      &.data {
        font-size: 2rem;
        color: var(--highlight);
        margin: 0 1.5rem 0 0.5rem;
      }
    }
  }
}

#stat-chart {
  width: 100%;
}
</style>
