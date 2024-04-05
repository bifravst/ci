import { Octokit } from '@octokit/rest'

export type Repository = {
	owner: string
	name: string
	id: number
}

export type Repos = Array<Repository>

export const listRepos = async (
	token: string,
	org: string,
	team: string,
): Promise<Array<Repository>> =>
	(
		await new Octokit({
			auth: token,
		}).teams.listReposInOrg({
			org,
			team_slug: team,
		})
	).data
		.filter((repo) => repo.archived !== true)
		.map((repo) => ({
			id: repo.id,
			name: repo.name,
			owner: repo.full_name.split('/')[0] as string,
		}))
