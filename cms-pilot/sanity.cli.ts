import {defineCliConfig} from 'sanity/cli'

/**
 * For Sanity-hosted Studio deployments only.
 * Deployment authorization is provided by the CLI session locally or
 * SANITY_AUTH_TOKEN in CI. Never commit tokens into this file.
 */
export default defineCliConfig({
  api: {
    projectId: 'ekfs0mfw',
    dataset: 'production',
  },
})
