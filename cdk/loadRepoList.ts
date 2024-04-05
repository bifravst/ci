import { readFile } from 'node:fs/promises'
import type { Repository } from './listRepos.js'

export const loadRepoList = async (
	location: string,
): Promise<Array<Omit<Repository, 'id'>>> =>
	(await readFile(location, 'utf-8'))
		.trim()
		.split('\n')
		.filter((s) => !s.startsWith('#'))
		.map((s) => {
			const [owner, name] = s.split('/') as [string, string]
			return { owner, name }
		})
