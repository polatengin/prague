#!/usr/bin/env node

import { fetchAccountDetails, fetchRepoDetails, fetchUserEvents, GitHubValueDetails, validateAccountName } from "./utils";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Error: Please provide a GitHub account name.');
  process.exit(1);
}

const accountName = args[0];

const err = validateAccountName(accountName);

if (err !== "") {
  console.error(`Error: "${err}"`);
  process.exit(1);
}

const flagArgs = process.argv.map(arg => arg.toLowerCase());
const flags = {
  printEstimatedValue : flagArgs.includes('--printestimatedvalue'),
  printRawJson : flagArgs.includes('--printrawjson'),
  printFormula : flagArgs.includes('--printformula'),
};

(async () => {
  const userDetails = await fetchAccountDetails(accountName);
  const events = await fetchUserEvents(accountName);

  const orgs = [...new Set(events.map(event => event.repo.name.split('/')[0]))];
  const repos = [...new Set(events.map(event => event.repo.name))];

  const value: GitHubValueDetails = {
    name: userDetails.login,
    public_repos_count: userDetails.public_repos,
    public_gists_count: userDetails.public_gists,
    created_at: new Date(userDetails.created_at),
    followers_count: userDetails.followers,
    orgs: await Promise.all(orgs.map(async org => {
      const orgDetails = await fetchAccountDetails(org);
      return {
        name: orgDetails.login,
        public_repos_count: orgDetails.public_repos,
        public_gists_count: orgDetails.public_gists,
        created_at: new Date(orgDetails.created_at),
        followers_count: orgDetails.followers
      };
    })),
    repos: await Promise.all(repos.map(async repo => {
      const repoDetails = await fetchRepoDetails(repo);
      return {
        name: repoDetails.name,
        stargazers_count: repoDetails.stargazers_count,
        watchers_count: repoDetails.watchers_count,
        forks_count: repoDetails.forks_count,
        open_issues_count: repoDetails.open_issues_count,
        subscribers_count: repoDetails.subscribers_count,
        created_at: new Date(repoDetails.created_at),
      };
    })),
  };

  const estimatedValue = (10 * value.public_repos_count) +
                         (5 * value.public_gists_count) +
                         (2 * value.followers_count) +
                         (3 * value.repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)) +
                         (3 * value.repos.reduce((acc, repo) => acc + repo.forks_count, 0)) -
                         (-2 * value.repos.reduce((acc, repo) => acc + repo.open_issues_count, 0));

  if (flags.printRawJson) {
    console.log(`Raw JSON data:`);
    console.log(util.inspect(value, { colors: true, depth: null, compact: false }));
  }

  if (flags.printEstimatedValue) {
    console.log(`Estimated value:`);
    console.log(`\$${estimatedValue}`);
  }

  if (flags.printFormula) {
    console.log(`Formula:`);
    console.log(`10 * public_repos_count + 5 * public_gists_count + 2 * followers_count + 3 * sum(stargazers_count) + 3 * sum(forks_count) - 2 * sum(open_issues_count)`);
    console.log(`(10 * ${value.public_repos_count}) + (5 * ${value.public_gists_count}) + (2 * ${value.followers_count}) + (3 * ${value.repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}) + (3 * ${value.repos.reduce((acc, repo) => acc + repo.forks_count, 0)}) - (2 * ${value.repos.reduce((acc, repo) => acc + repo.open_issues_count, 0)})`);
  }
})();
