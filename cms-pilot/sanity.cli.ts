import {defineCliConfig} from 'sanity/cli'

/**
 * First hosted deployment: explicitly set a Studio hostname so CI never
 * asks an interactive question. This only deploys the editorial interface,
 * not the public website or its Hostinger release.
 */
export default defineCliConfig({
  api: {
    projectId: 'ekfs0mfw',
    dataset: 'production',
  },
  studioHost: 'israel-taxi-travel-ekfs0mfw',
})
