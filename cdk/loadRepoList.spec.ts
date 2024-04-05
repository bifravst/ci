import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { loadRepoList } from './loadRepoList.js'

void describe('loadRepoList()', () => {
	void it('should load the list of repos', async () => {
		assert.notEqual(
			(await loadRepoList()).find(
				(el) => el.name === 'ci' && el.owner === 'hello-nrfcloud',
			),
			undefined,
		)
	})
})
