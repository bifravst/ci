# `hello.nrfcloud.com` CI

[![GitHub Actions](https://github.com/hello-nrfcloud/backend/workflows/Test%20and%20Release/badge.svg)](https://github.com/hello-nrfcloud/backend/actions/workflows/test-and-release.yaml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![@commitlint/config-conventional](https://img.shields.io/badge/%40commitlint-config--conventional-brightgreen)](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

Sets up the permissions in our AWS CI account for the repositories in this
GitHub organization that are supposed to have access so they are be able to use
it for CI runs.

The allowed list of repositories is managed via the
[`ci` team](https://github.com/orgs/hello-nrfcloud/teams/ci/repositories).

> [!CAUTION]  
> Do not run this against the production account, but against the CI account.

```bash
npx cdk deploy
```
