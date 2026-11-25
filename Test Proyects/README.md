# Playwright Test Exercises

This project contains browser end-to-end testing exercises written in TypeScript with Playwright Test. The tests interact with publicly hosted demo applications; no application server or backend from this repository is required.

## Test scope and objectives

The suite demonstrates browser automation fundamentals: locating elements by accessible roles and labels, entering and submitting data, validating UI state, handling navigation and asynchronous updates, and capturing evidence.

| Test file | Exercise and objective |
| --- | --- |
| `TC01_FullScenario.spec.ts` | Complete a TodoMVC flow: create tasks, mark one complete, filter active tasks, delete a task, and verify remaining-item counts. |
| `TC02_ToogleCheck.spec.ts` | Exercise TodoMVC completion toggles and the active/completed filters; verify task counts and visibility. |
| `TC03_LinksValidation.spec.ts` | Validate the TodoMVC link target and navigation to the linked site. |
| `TC04_EditToDo.spec.ts` | Edit a TodoMVC task and verify the updated text. |
| `TC05_LinktoTODOMVC.spec.ts` | Exercise the TodoMVC link and verify navigation to the linked site. |
| `TC101_Login_Test.spec.ts` | Sign in to the Practice Test Automation demo with its sample credentials, then log out. |
| `TC102_NegativeLogin.spec.ts` | Submit an invalid username and an invalid password separately and verify the corresponding error messages. |
| `TC103_Waiting_exceptions.spec.ts` | Use the Test Exceptions demo to add a row, observe asynchronous loading, save it, and remove it. |
| `TC201_TableTest.spec.ts` | Filter the course table by language and level, verify matching and empty results, reset filters, and check accessible filter state. |

`TC03_LinksValidation.spec.ts` and `TC05_LinktoTODOMVC.spec.ts` cover similar link-navigation behavior. Several exercises also save screenshots and attach them to the Playwright test results.

### Included coverage

- UI behavior and visible state in the TodoMVC demo.
- Positive and negative login flows in the Practice Test Automation demo.
- Asynchronous UI behavior and table filtering.
- Basic accessibility-oriented selectors and an ARIA snapshot.
- Cross-browser execution in Chromium, Firefox, and WebKit.

### Outside the current scope

- Testing an application or API owned by this repository.
- Backend, database, integration, performance, load, or security testing.
- Testing without internet access: the sample applications are hosted externally and can change or become unavailable.

## Requirements

For a new Windows 10/11 PC, install:

1. **Git for Windows** — to clone the repository.
2. **Node.js 20.x LTS** — npm is included with the Node.js installer.
3. **Internet access** — needed to download npm packages and Playwright browsers, and to reach the demo sites.

Visual Studio Code is optional. No local application server, `.env` file, or separate test credentials are required.

## Setup on a new Windows PC

Open PowerShell and run:

```powershell
git clone https://github.com/rizhardo-molina-QA/QA-Works.git
cd QA-Works
cd "Test Proyects"
```

Confirm that Git and Node.js are available:

```powershell
git --version
node --version
npm --version
```

Use Node.js 20.x. Install the exact dependencies from the lock file and download the browser binaries:

```powershell
npm ci
npx playwright install
```

The project is now ready to run. These commands assume the terminal is in the `Test Proyects` directory, where `package.json` and `package-lock.json` are located.

## Running tests

Run all test files in all configured browsers:

```powershell
npx playwright test
```

Run one test file:

```powershell
npx playwright test Test_examples\TC101_Login_Test.spec.ts
```

Run the suite in one browser:

```powershell
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Open Playwright's interactive test UI:

```powershell
npx playwright test --ui
```

Open the HTML report after a run:

```powershell
npx playwright show-report
```

The package currently has no npm test script, so use `npx playwright ...` commands.

## Playwright configuration

Configuration is in [`playwright.config.ts`](./playwright.config.ts):

- Test files are discovered under `Test_examples`.
- Projects use desktop Chromium, Firefox, and WebKit.
- Tests run fully parallel locally. In CI, Playwright uses one worker and retries failed tests twice.
- The HTML reporter is enabled. Screenshots are captured, videos are retained on failure, and traces are recorded on the first retry.
- `forbidOnly` is enabled in CI to prevent accidentally running only tests marked with `test.only`.

Test output and the HTML report are generated locally by Playwright. GitHub Actions uploads the report as a `playwright-report` artifact.

## GitHub Actions

The workflow is at the repository root in `.github/workflows/playwright.yml`. It installs dependencies and browsers, then runs the tests on pushes and pull requests targeting `main` or `master`.

To run it manually, open **Actions → Playwright E2E Tests → Run workflow** and select:

- **Timer (minutes)** with a value from 1 to 60, or
- **Run Count** with the number of complete test-suite runs.

The manually selected mode controls how the numeric input is interpreted. The job has a 90-minute timeout. In timer mode, a test-suite run already in progress is allowed to finish before the workflow checks the timer again.

On Linux, Playwright may need system browser dependencies. The GitHub Actions workflow installs them with:

```bash
npx playwright install --with-deps
```

On Windows, `npx playwright install` installs the browser binaries; if browser launch reports missing system components, install the required Windows updates/runtime dependencies and retry.

## Troubleshooting

- **`npx playwright` is not recognized or browsers are missing:** confirm that Node.js is installed, reopen the terminal, then run `npm ci` and `npx playwright install`.
- **`npm ci` fails:** make sure the current directory is `Test Proyects` and that the PC can access the npm registry.
- **A test fails while opening a demo site:** check internet access and retry. The tests depend on external demo sites, which may be temporarily unavailable or change their UI.
