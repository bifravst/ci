# Bifravst CI

Uses [hello-nrfcloud/ci](https://github.com/hello-nrfcloud/ci) to set up the permissions in our AWS CI account for the repositories in this
GitHub organization that are supposed to have access so they are be able to use
it for CI runs.

The allowed list of repositories is managed via the [`repos.txt`](./repos.txt)
file.

> [!CAUTION]  
> Do not run this against the production account, but against the CI account.

```bash
git clone https://github.com/hello-nrfcloud/ci
npm ci
REPOS_LIST=../repos.txt npx cdk deploy
```
