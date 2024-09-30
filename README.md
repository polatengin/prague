# Prague project

_GitHubValue_ cli tool that estimates the value of a _GitHub_ account.

## Inputs

- `accountName`: GitHub account name
- `--printRawJson`: Prints raw json data that's used to calculate _GitHub Account Value_
- `--printEstimatedValue`: Prints _estimated value_ of the given _GitHub Account_
- `--printFormula`: Prints _formula_ used to calculate _estimated value_ of the given _GitHub Account_

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
