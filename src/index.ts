import { Octokit } from "@octokit/rest";
import { getInput, setFailed } from '@actions/core';

async function repositoryDispatch() {
  const token: string = getInput('token');
  const owner: string = getInput('repo').split('/')[0];
  const repo: string = getInput('repo').split('/')[1];
  const branch: string = getInput('branch');
  const octokit = new Octokit({
    auth: token
  });

  await octokit.repos.createDispatchEvent({
    owner,
    repo,
    event_type: 'deploy-api-doc',
    client_payload: {
      branch
    }
  });
}

try {
  repositoryDispatch()
}
catch (e) {
  setFailed(e)
}