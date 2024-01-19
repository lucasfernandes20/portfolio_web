import { Octokit } from 'octokit';

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const octokitInstance = new Octokit({
  auth: token
});

export default {
  octokitInstance
};
