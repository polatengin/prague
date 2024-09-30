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

const query = async (path: string) => {
  const url = `https://api.github.com/${path}`;
  const response = await fetch(url);
  return await response.json();
}

type AccountDetails = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export const fetchAccountDetails = async (accountName: string): Promise<AccountDetails> => {
  const path = `users/${accountName}`;
  return await query(path) as AccountDetails;
}

type UserEvent = {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  public: boolean;
  created_at: string;
  org?: {
    id: number;
    login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
};

export const fetchUserEvents = async (accountName: string): Promise<UserEvent[]> => {
  const path = `users/${accountName}/events`;
  return await query(path) as UserEvent[];
}
