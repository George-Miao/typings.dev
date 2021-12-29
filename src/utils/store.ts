import { reactive, readonly } from 'vue'

/**
 * @abstract: Abstract store class. To use, inherit and add functions that mutate `this.state`
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class Store<T extends Object> {
  protected state: T

  constructor() {
    const data = this.data()
    this.setup(data)
    this.state = reactive(data) as T
  }

  protected abstract data(): T

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  protected setup(_: T): void {}

  public getState(): T {
    return readonly(this.state) as T
  }
}
