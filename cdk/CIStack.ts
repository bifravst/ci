import { App, CfnOutput, Stack } from 'aws-cdk-lib'
import { RepoPermission } from './RepoPermission.js'
import type { Repos } from './listRepos.js'

export class CIStack extends Stack {
	public constructor(
		parent: App,
		name: string,
		{
			repos,
			gitHubOICDProviderArn,
		}: {
			gitHubOICDProviderArn: string
			repos: Repos
		},
	) {
		super(parent, name)

		for (const { id, owner, name: repo } of repos) {
			const perm = new RepoPermission(this, repo, {
				repository: { id, owner, name: repo },
				gitHubOICDProviderArn,
			})

			new CfnOutput(this, `${id}:ciRoleArn`, {
				exportName: `${name}:${id}:ciRoleArn`,
				description: `Role ARN to use for running continuous integration tests using GitHub Actions in the repository ${owner}/${repo} (${id})`,
				value: perm.role.roleArn,
			})
		}
	}
}
