import { newSpecPage } from '@stencil/core/testing';
import { GanttChart } from './gantt-chart';

describe('pt-gantt-chart', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      html: '<pt-gantt-chart></pt-gantt-chart>',
      components: [GanttChart],
    });
    expect(root).toEqualHtml(`
      <pt-gantt-chart>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </pt-gantt-chart>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [GanttChart],
      html: `<pt-gantt-chart first="Stencil" last="'Don't call me a framework' JS"></pt-gantt-chart>`,
    });
    expect(root).toEqualHtml(`
      <pt-gantt-chart first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </pt-gantt-chart>
    `);
  });
});
