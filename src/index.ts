#!/usr/bin/env node

import { readFileSync } from 'fs';
import util from 'util';

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
  printEstimatedValue : flagArgs.includes('--printestimatedvalue') || flagArgs.includes('--estimatedvalue') || flagArgs.includes('--value'),
  printRawJson : flagArgs.includes('--printrawjson') || flagArgs.includes('--rawjson') || flagArgs.includes('--json'),
  printFormula : flagArgs.includes('--printformula') || flagArgs.includes('--formula'),
  printVersion : flagArgs.includes('--printversion') || flagArgs.includes('--version') || flagArgs.includes('-v'),
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

  const blue = '\x1b[36m';
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  if (flags.printVersion) {
    console.log();
    console.log(`${yellow}Version:${reset}`);
    console.log(JSON.parse(readFileSync("package.json", 'utf8')).version);
  }

  if (flags.printRawJson) {
    console.log();
    console.log(`${yellow}Raw JSON data:${reset}`);
    console.log(util.inspect(value, { colors: true, depth: null, compact: false }));
  }

  if (flags.printEstimatedValue) {
    console.log();
    console.log(`${yellow}Estimated value:${reset}`);
    console.log(`${green}\$${estimatedValue}${reset}`);
  }

  if (flags.printFormula) {
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
