import { Component, Prop, Event, EventEmitter, Method, State, h, Host, Watch } from '@stencil/core'

@Component({
  tag: 'pt-gantt-chart',
  styleUrl: 'gantt-chart.scss',
  shadow: true,
})
export class GanttChart {
  /**
   * The first name
   */
  @Prop() first: string

  /**
   * The middle name
   */
  @Prop() middle: string

  /**
   * The last name
   */
  @Prop() last: string

  @State() items: any[] = [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]

  @State() innerHeight: number = 0
  @State() offsetLength: number = 0

  @State() startIndex: number = 0

  @State() endIndex: number = 0

  @State() scrollTop: number = 0

  @State() virtualItems: any[] = []

  mainElement!: HTMLElement

  @Method()
  async renderItems() {
    const { items, scrollTop } = this

    this.innerHeight = items.length * 50
    this.startIndex = Math.floor(scrollTop / 50)
    const endIndex = Math.min(items.length - 1, Math.floor((scrollTop + 400) / 50))

    this.virtualItems = []
    for (let i = this.startIndex; i <= endIndex; i++) {
      this.virtualItems.push(items[i])
    }

    console.log({ startIndex: this.startIndex, endIndex, virtualItems: this.virtualItems })
  }

  handleScroll(event) {
    if (this.scrollTop !== event.currentTarget.scrollTop) {
      this.scrollTop = event.currentTarget.scrollTop
      this.renderItems()
    }
  }

  componentWillLoad() {
    this.renderItems()
  }

  render() {
    return (
      <Host>
        <header></header>
        <main ref={element => (this.mainElement = element)} onScroll={event => this.handleScroll(event)}>
          <div class="gantt-chart-wrapper" style={{ '--gantt-inner-height': String(this.innerHeight) + 'px', '--gantt-offset-length': String(this.startIndex) }}>
            <div class="gantt-chart-background">
              {[...this.items, ...this.items, ...this.items, ...this.items].map(todo => (
                <div class="gantt-chart-background-line"></div>
              ))}
            </div>

            <div class="gantt-chart-offset"></div>

            {this.virtualItems.map((todo, index) => (
              <div class="gantt-chart-item">
                <div class="gantt-chart-item-side">Sidebar {todo}</div>
                <div class="gantt-chart-item-bar">Bar</div>
              </div>
            ))}
          </div>
        </main>
      </Host>
    )
  }
}
