import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { dataset, projectId } from './sanity/env';
import { schema } from './sanity/schema';

export default defineConfig({
  name: 'default',
  title: 'Etología Argentina CMS',
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [structureTool()],
});
