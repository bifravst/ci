import { Duration, aws_iam as IAM, Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import type { Repository } from './listRepos.js'
import { sanitize } from './sanitize.js'

export class RepoPermission extends Construct {
	public readonly role: IAM.IRole
	constructor(
		parent: Construct,
		id: string,
		{
			repository,
			gitHubOICDProviderArn,
		}: {
			repository: Repository
			gitHubOICDProviderArn: string
		},
	) {
		super(parent, id)

		const gitHubOIDC = IAM.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
			this,
			'gitHubOICDProvider',
			gitHubOICDProviderArn,
		)

		this.role = new IAM.Role(this, 'ghRole', {
			roleName: `${Stack.of(this).stackName}-${sanitize(repository.name)}`,
			assumedBy: new IAM.WebIdentityPrincipal(
				gitHubOIDC.openIdConnectProviderArn,
				{
					StringEquals: {
						[`token.actions.githubusercontent.com:sub`]: `repo:${repository.owner}/${repository.name}:*`,
						[`token.actions.githubusercontent.com:aud`]: 'sts.amazonaws.com',
					},
				},
			),
			description: `This role is used by GitHub Actions to run Continuous Integration Tests ${
				Stack.of(this).stackName
			} in the repository ${repository.owner}/${repository.name} (${repository.id}).`,
			maxSessionDuration: Duration.hours(1),
			managedPolicies: [
				IAM.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
			],
		})
	}
}
