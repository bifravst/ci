import { IAMClient } from '@aws-sdk/client-iam'
import { fromEnv } from '@bifravst/from-env'
import { CIApp } from './CIApp.js'
import { ensureGitHubOIDCProvider } from './ensureGitHubOIDCProvider.js'
import { listRepos } from './listRepos.js'
import { loadRepoList } from './loadRepoList.js'

const { token } = fromEnv({
	token: 'GITHUB_TOKEN',
})(process.env)

const repos = await listRepos(
	token,
	await loadRepoList(process.env.REPOS_LIST ?? './repos.txt'),
)
for (const repo of repos) {
	console.debug(`Setting up permissions for ${repo.name} (${repo.id})...`)
}

const iam = new IAMClient({})

new CIApp(process.env.STACK_NAME ?? 'bifravst-ci', {
	gitHubOICDProviderArn: await ensureGitHubOIDCProvider({
		iam,
	}),
	repos,
})
