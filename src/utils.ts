export const validateAccountName = (value: string) => {
  if (!value) {
    return 'Please provide a GitHub account name.';
  }

  if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(value)) {
    return `"${value}" is not a valid GitHub account name.`;
  }

  return '';
}

export type GitHubValueDetails = {
  name: string;
  public_repos_count: number;
  public_gists_count: number;
  followers_count: number;
  created_at: Date;
  orgs: {
    public_repos_count: number;
    public_gists_count: number;
    followers_count: number;
    created_at: Date;
  }[];
  repos: {
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    subscribers_count: number;
    created_at: Date;
  }[];
};
