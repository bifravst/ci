import { IAMClient } from '@aws-sdk/client-iam'
import { fromEnv } from '@bifravst/from-env'
import { CIApp } from './CIApp.ts'
import { ensureGitHubOIDCProvider } from './ensureGitHubOIDCProvider.ts'
import { listRepos } from './listRepos.ts'
import { loadRepoList } from './loadRepoList.ts'

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
