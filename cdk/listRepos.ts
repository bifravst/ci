import { Octokit } from '@octokit/rest'

export type Repository = {
	owner: string
	name: string
	id: number
}

export type Repos = Array<Repository>

export const listRepos = async (
	token: string,
	repos: Array<Omit<Repository, 'id'>>,
): Promise<Array<Repository>> => {
	const client = new Octokit({
		auth: token,
	})

	return (
		await Promise.all(
			repos.map(async (repo) =>
				client.repos.get({
					repo: repo.name,
					owner: repo.owner,
				}),
			),
		)
	)
		.map((res) => res.data)
		.filter((repo) => repo.archived !== true)
		.map((repo) => ({
			id: repo.id,
			name: repo.name,
			owner: repo.full_name.split('/')[0] as string,
		}))
}
