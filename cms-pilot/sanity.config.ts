import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'pilot'

if (!projectId || projectId === 'replace_with_project_id') {
  throw new Error('Set SANITY_STUDIO_PROJECT_ID in cms-pilot/.env.local before starting Studio.')
}

export default defineConfig({
  name: 'israel-travel-hub-pilot',
  title: 'Israel Travel Hub — Editorial Pilot',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {types: schemaTypes},
})
