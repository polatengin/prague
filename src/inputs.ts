export const parse = (value: string) => {
  if (!value) {
    return 'Please provide a GitHub account name.';
  }

  if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(value)) {
    return `"${value}" is not a valid GitHub account name.`;
  }

  return '';
}
