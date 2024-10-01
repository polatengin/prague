#!/usr/bin/env node

import { readFileSync } from 'fs';
import util from 'util';

import { fetchAccountDetails, fetchRepoDetails, fetchUserEvents, GitHubValueDetails, validateAccountName } from "./utils";

const blue = '\x1b[36m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const args = process.argv.slice(2);

const paramArgs = args.map(arg => arg.toLowerCase());
const params = {
  printEstimatedValue : paramArgs.includes('--printestimatedvalue') || paramArgs.includes('--estimatedvalue') || paramArgs.includes('--value'),
  printRawJson : paramArgs.includes('--printrawjson') || paramArgs.includes('--rawjson') || paramArgs.includes('--json'),
  printFormula : paramArgs.includes('--printformula') || paramArgs.includes('--formula'),
  printVersion : paramArgs.includes('--printversion') || paramArgs.includes('--version') || paramArgs.includes('-v'),
  userName : paramArgs.find(arg => !arg.startsWith('--') && !arg.startsWith('-')) || "",
};

if (params.printVersion) {
  console.log();
  console.log(`${yellow}Version:${reset}`);
  console.log(JSON.parse(readFileSync("/usr/local/src/prague/package.json", 'utf8')).version);
}

const err = validateAccountName(params.userName);

if (err !== "") {
  console.error(`Error: "${err}"`);
  process.exit(1);
}

(async () => {
  const userDetails = await fetchAccountDetails(params.userName);
  const events = await fetchUserEvents(params.userName);

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

  if (params.printRawJson) {
    console.log();
    console.log(`${yellow}Raw JSON data:${reset}`);
    console.log(util.inspect(value, { colors: true, depth: null, compact: false }));
  }

  if (params.printEstimatedValue) {
    console.log();
    console.log(`${yellow}Estimated value:${reset}`);
    console.log(`${green}\$${estimatedValue}${reset}`);
  }

  if (params.printFormula) {
    console.log();
    console.log(`${yellow}Formula:${reset}`);
    console.log(` ${blue}+ ($10 x ${value.public_repos_count}) \t ${reset} ${green}# public_repos_count x $10${reset}`);
    console.log(` ${blue}+ ($5 x ${value.public_gists_count}) \t ${reset} ${green}# public_gists_count x $5${reset}`);
    console.log(` ${blue}+ ($2 x ${value.followers_count}) \t ${reset} ${green}# followers_count x $2${reset}`);
    console.log(` ${blue}+ ($3 x ${value.repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}) \t ${reset} ${green}# stargazers_count x $3${reset}`);
    console.log(` ${blue}+ ($3 x ${value.repos.reduce((acc, repo) => acc + repo.forks_count, 0)}) \t ${reset} ${green}# forks_count x $3${reset}`);
    console.log(` ${blue}- ($2 x ${value.repos.reduce((acc, repo) => acc + repo.open_issues_count, 0)}) \t ${reset} ${green}# open_issues_count x $2${reset}`);
    console.log(` ${blue}= \$${estimatedValue}${reset}`);
  }
})();
