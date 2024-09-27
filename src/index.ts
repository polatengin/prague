#!/usr/bin/env node

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Error: Please provide a GitHub account name.');
  process.exit(1);
}

const githubAccountName = args[0];

if (!/^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/.test(githubAccountName)) {
  console.error(`Error: "${githubAccountName}" is not a valid GitHub account name.`);
  process.exit(1);
}

console.log(`Valid GitHub account name provided: ${githubAccountName}`);
