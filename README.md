# Prague project

_GitHubValue_ cli tool that estimates the value of a _GitHub_ account.

## Inputs

- `accountName`: GitHub account name
- `--printRawJson`: Prints raw json data that's used to calculate _GitHub Account Value_
- `--printEstimatedValue`: Prints _estimated value_ of the given _GitHub Account_
- `--printFormula`: Prints _formula_ used to calculate _estimated value_ of the given _GitHub Account_

## Installation

Ensure at least _Node v20_ or newer is installed;

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Download latest version of `prague`;

```bash
wget https://github.com/polatengin/prague/releases/download/0.0.4/prague-0.0.4.deb
```

Use `apt` command to start installation

```bash
sudo apt install -y ./prague-0.0.4.deb
```

## Compile, Test and Run

To compile the code, run the following command;

```bash
npm run build
```

To run tests, run the following command;

```bash
npm test
```

To run the code, run the following command;

```bash
npm run start -- polatengin --printFormula --printEstimatedValue --printRawJson
```

## Example Output

Run the following example command;

```bash
npm run start -- polatengin --printFormula --printEstimatedValue --printRawJson
```

Output;

```text
Raw JSON data:
{
  "name": "polatengin",
  "public_repos_count": 140,
  "public_gists_count": 59,
  "created_at": "2009-08-24T06:11:38.000Z",
  "followers_count": 655,
  "orgs": [
    {
      "name": "polatengin",
      "public_repos_count": 140,
      "public_gists_count": 59,
      "created_at": "2009-08-24T06:11:38.000Z",
      "followers_count": 655
    },
    {
      "name": "microsoft",
      "public_repos_count": 6421,
      "public_gists_count": 0,
      "created_at": "2013-12-10T19:06:48.000Z",
      "followers_count": 76097
    }
  ],
  "repos": [
    {
      "name": "prague",
      "stargazers_count": 1,
      "watchers_count": 1,
      "forks_count": 1,
      "open_issues_count": 0,
      "subscribers_count": 3,
      "created_at": "2021-01-23T13:40:08.000Z"
    },
    {
      "name": "tfs-cli",
      "stargazers_count": 369,
      "watchers_count": 369,
      "forks_count": 132,
      "open_issues_count": 138,
      "subscribers_count": 106,
      "created_at": "2015-07-22T09:23:42.000Z"
    },
    {
      "name": "redmond",
      "stargazers_count": 0,
      "watchers_count": 0,
      "forks_count": 0,
      "open_issues_count": 0,
      "subscribers_count": 1,
      "created_at": "2024-09-26T18:37:36.000Z"
    },
    {
      "name": "redmond-cd",
      "stargazers_count": 0,
      "watchers_count": 0,
      "forks_count": 0,
      "open_issues_count": 0,
      "subscribers_count": 1,
      "created_at": "2024-09-27T00:26:52.000Z"
    },
    {
      "name": "vsts-extension-retrospectives",
      "stargazers_count": 181,
      "watchers_count": 181,
      "forks_count": 80,
      "open_issues_count": 215,
      "subscribers_count": 22,
      "created_at": "2020-03-30T14:12:34.000Z"
    }
  ]
}

Estimated value:
$6003

Formula:
10 * public_repos_count + 5 * public_gists_count + 2 * followers_count + 3 * sum(stargazers_count) + 3 * sum(forks_count) - 2 * sum(open_issues_count)

(10 * 140) + (5 * 59) + (2 * 655) + (3 * 551) + (3 * 213) - (2 * 353)
```
