import { Octokit } from "@octokit/rest";
import { getInput, setFailed } from '@actions/core';

async function repositoryDispatch() {
  const token: string = getInput('token');
  const branch: string = getInput('branch');
  const octokit = new Octokit({
    auth: token
  });

  await octokit.repos.createDispatchEvent({
    owner: 'ndcmsl',
    repo: 'ms-deploy',
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