import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { parse } from '../src/inputs';

describe('index.ts', () => {
  it('should exit with error when no GitHub account name is provided', () => {
    // Arrange
    const expected = 'Please provide a GitHub account name.';
    let actual = '';

    // Act
    actual = parse('');

    // Assert
    strictEqual(actual, expected);
  });
