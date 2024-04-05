import { IAMClient } from '@aws-sdk/client-iam'
import { ensureGitHubOIDCProvider } from './ensureGitHubOIDCProvider.js'
import { fromEnv } from '@nordicsemiconductor/from-env'
import { CIApp } from './CIApp.js'
import { listRepos } from './listRepos.js'

const { token } = fromEnv({
	token: 'GITHUB_TOKEN',
})(process.env)

const repos = await listRepos(token, 'hello-nrfcloud', 'ci')
for (const repo of repos) {
	console.debug(`Setting up permissions for ${repo.name} (${repo.id})...`)
}

const iam = new IAMClient({})

new CIApp('hello-nrfcloud-ci', {
	gitHubOICDProviderArn: await ensureGitHubOIDCProvider({
		iam,
	}),
	repos,
})
