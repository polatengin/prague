#!/usr/bin/env node

const args = process.argv.slice(2);  // Get the command-line arguments
const command = args[0];

switch (command) {
  case 'greet':
    const name = args[1] || 'stranger';
    console.log(`Hello, ${name}!`);
    break;
  default:
    console.log('Unknown command.');
}
