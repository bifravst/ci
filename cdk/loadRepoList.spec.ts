import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { loadRepoList } from './loadRepoList.js'
import path from 'node:path'

void describe('loadRepoList()', () => {
	void it('should load the list of repos', async () => {
		assert.deepEqual(
			await loadRepoList(path.join(process.cwd(), 'cdk', 'test', 'repos.txt')),
			[
				{
					name: 'ci',
					owner: 'bifravst',
				},
				{
					name: 'aws-cdk-ecr-helpers',
					owner: 'bifravst',
				},
			],
		)
	})
})
