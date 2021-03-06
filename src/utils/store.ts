import { reactive, readonly } from 'vue'

/**
 * @abstract: Abstract store class. To use, inherit and add functions that mutate `this.state`
 */
export abstract class Store<T extends Object> {
  protected state: T

  constructor() {
    let data = this.data()
    this.setup(data)
    this.state = reactive(data) as T
  }

  protected abstract data(): T

  protected setup(data: T): void {}

  public getState(): T {
    return readonly(this.state) as T
  }
}
