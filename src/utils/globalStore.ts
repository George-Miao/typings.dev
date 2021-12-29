import { InputStatus } from '@/utils/constants'
import { Global } from '@/utils/types'
import themes from '@/data/themes.json'
import { StatReport } from '@/utils/types'
import { Store } from './store'

const initGlobal: Global = {
  status: InputStatus.Init,
  themes: themes
}

export default class GlobalStore extends Store<Global> {
  reload: () => void

  constructor(reload?: () => void | undefined) {
    super()
    if (reload)
      this.reload = () => {
        this.updateStatue(InputStatus.Init)
        reload()
      }
    else {
      this.reload = () => {
        this.updateStatue(InputStatus.Init)
        location.reload()
      }
    }
  }

  data() {
    return initGlobal
  }

  get status() {
    return this.state.status
  }

  get report() {
    return this.state.report
  }

  newReport(report: StatReport) {
    this.state.report = report
  }

  clearReport() {
    this.state.report = undefined
  }

  updateStatue(newStatus: InputStatus) {
    this.state.status = newStatus
  }
}
