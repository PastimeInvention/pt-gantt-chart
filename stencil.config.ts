import { Config } from '@stencil/core';
import { postcss } from '@stencil-community/postcss';
import { sass } from '@stencil/sass';
import autoprefixer from 'autoprefixer';

export const config: Config = {
  namespace: 'pt-gantt-chart',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
  plugins: [
    sass({
      injectGlobalPaths: ['src/globals/variables.scss', 'src/globals/mixins.scss'],
    }),
    postcss({
      plugins: [autoprefixer()],
    }),
  ],
};
