import path from 'node:path'
import { readFile } from 'node:fs/promises'
import type { Repository } from './listRepos.js'

export const loadRepoList = async (): Promise<Array<Omit<Repository, 'id'>>> =>
	(await readFile(path.join(process.cwd(), 'repos.txt'), 'utf-8'))
		.trim()
		.split('\n')
		.filter((s) => !s.startsWith('#'))
		.map((s) => {
			const [owner, name] = s.split('/') as [string, string]
			return { owner, name }
		})
