#!/usr/bin/env node

import { validateAccountName } from "./utils";

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


console.log(`Valid GitHub account name provided: ${accountName}`);
