import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

/**
 * The Sanity project ID and dataset are public identifiers, not credentials.
 * This Studio is isolated from the current website's publishing pipeline.
 */
export default defineConfig({
  name: 'israel-taxi-travel-editorial',
  title: 'Israel Taxi & Travel — Editorial Studio',
  projectId: 'ekfs0mfw',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {types: schemaTypes},
})
