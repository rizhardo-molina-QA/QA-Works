# 🎭 Playwright + TypeScript Test Suite

Welcome! This project houses our automated end-to-end (E2E) browser test suite. It is built using **TypeScript** and **Playwright Test** to ensure our application runs like clockwork.

Currently, our test scenarios interact directly with the public **TodoMVC** live demo at: `https://playwright.dev`.

---

## 🛠️ Prerequisites

Before you get started, make sure you have the following ready to go:

* **Node.js** v20 or later.
* **npm** (comes bundled with Node).
* **Internet access** (required so Playwright can navigate to the live demo site).
* **Visual Studio Code** (optional, but highly recommended for its excellent native testing extension).

---

## 🚀 Installation & Setup

Clone the project and open your terminal in the root directory (the folder containing `package.json` and `playwright.config.ts`). Then, run these commands:

```bash
# Install the project dependencies
npm install

# Download the required browser binaries (Chromium, Firefox, and WebKit)
npx playwright install
```

> 💡 **Quick Tip:** If you only want to work with Chromium to save time and disk space, you can install just that browser by running: `npx playwright install chromium`.

You don't need to spin up a local web server for this project; Playwright connects directly to the public URLs defined within the test files.

### A quick look at our Playwright configuration

We have already configured the `playwright.config.ts` file to make your life easier:
* **Test Location:** It automatically discovers and runs the specs saved under `./Test_examples`.
* **Multi-browser Support:** Native execution across Chromium, Firefox, and WebKit.
* **Smart Execution:** Tests run in parallel locally to save you time. In Continuous Integration (CI) environments, it switches to a single worker and retries failed tests up to two times if the `CI` environment variable is detected.
* **Reports & Tracing:** It generates a rich, interactive HTML report and captures *traces* on the first retry to make debugging a breeze.

*Note: Playwright includes native support for TypeScript out of the box, so you don't have to worry about configuring a separate `tsconfig.json` file.*

---

## 🧪 Test Scenarios

We designed these tests to focus on real user interactions and core application behavior:

| File | What it validates | Reason for the test |
| :--- | :--- | :--- |
| `Test_examples/TC01_FullScenario.spec.ts` | Adds three todos, checks their visibility, completes one, filters active todos, deletes another, and verifies the final count. | This is our primary E2E flow. It covers the critical path and the most important requirements for the user. |
| `Test_examples/TC02_ToogleCheck.spec.ts` | Adds todos, marks items as completed, verifies the visual checked state and remaining count, and switches between Active and Completed filters. | Crucial for ensuring that checking and unchecking the todo checkboxes updates the UI state flawlessly. |
| `Test_examples/TC03_LinksValidation.spec.ts` | Exercises the todo completion states alongside global navigation filters: "All", "Active", and "Completed". | Ensures that clicking navigation links filters items correctly and maintains an accurate items-left count. |
| `Test_examples/TC04_EditToDo.spec.ts` | Creates three todos and, if the target todo is found, edits it with a new value to confirm the change is saved and visible. | Vital for validating that the edit action on a todo item works as expected without corrupting any data. |
| `Test_examples/TC05_LinktoTODOMVC.spec.ts` | Checks the `href` attribute of the TodoMVC footer link, follows it, and verifies a successful redirection to `todomvc.com`. | Validates external redirection links placed on the user interface. |

### How our tests are structured
* **Autonomy:** Most tests create their own fresh test data at startup so they do not rely on previous states.
* **Best Practices:** We locate web elements using accessible roles and labels (exactly like a real user would) and use Playwright’s `expect` web assertions to leverage built-in auto-waiting.
* **Test Titles:** Several tests currently share a generic `"test"` title. Don't worry—the framework relies on the file names to differentiate them in the runner. You can view the full discovery list by running `npx playwright test --list`.

---

## 💻 How to Run the Tests Locally

### From the Terminal

We have mapped several handy npm scripts for different workflows:

```bash
# Run the entire suite across all 3 browsers (Chromium, Firefox, WebKit)
npm test

# Run the suite strictly in Chromium
npm run test:chromium

# Run the tests with a visible browser window (Headed Mode)
npm run test:headed

# Execute a single test file using Chromium
npx playwright test Test_examples/TC04_EditToDo.spec.ts --project=chromium

# Filter and run a specific test by its title text
npx playwright test --grep "test" --project=chromium

# Open the latest generated interactive HTML report
npm run test:report
```

Interactive HTML reports are stored in `playwright-report/` and raw test execution artifacts go to `test-results/`. Both directories are ignored by git via `.gitignore` to keep our codebase clean.

### Using UI Mode (Interactive Explorer)

If you prefer a rich visual experience with a live test explorer, step-by-step action replays, and built-in time-travel debugging (*traces*), simply run:

```bash
npm run test:ui
```

### Debugging Step-by-Step

If a test is giving you a headache and you want to walk through it line-by-line using the visual **Playwright Inspector**, use:

```bash
npm run test:debug
```

---

## 🎨 Running in Visual Studio Code

If VS Code is your editor of choice, you can integrate everything directly into your sidebar:

1. Open the project root folder in VS Code.
2. Install the official **Playwright Test for VSCode** extension (`ms-playwright.playwright`).
3. If prompted by the editor, ensure you have run `npm install` and installed the browser binaries.
4. Open the **Testing** view from the Activity Bar on the left side (the icon looks like a lab flask 🧪). Click the refresh icon if your tests don't load immediately.
5. You're all set! You can now click the **Play** or **Debug** icons next to any individual file or test scenario.

---

## 📋 NPM Scripts Summary

Behind the scenes, here is the exact mapping of commands configured in our `package.json`:

| Script | Actual Command | Purpose |
| :--- | :--- | :--- |
| `npm test` | `playwright test` | Launches the complete test suite across all configured browser projects. |
| `npm run test:chromium` | `playwright test --project=chromium` | Runs the test suite targeting Chromium only. |
| `npm run test:headed` | `playwright test --headed` | Executes the tests while opening visible browser windows. |
| `npm run test:ui` | `playwright test --ui` | Opens Playwright's highly interactive desktop UI Mode. |
| `npm run test:debug` | `playwright test --debug` | Launches the Playwright Inspector tool for step-by-step debugging. |
| `npm run test:report` | `playwright show-report` | Serves a local web server to inspect the latest HTML test report. |

---

## 🔄 CI/CD Integration (GitHub Actions)

We have made sure our test suite runs seamlessly in the cloud on every change. This helps us catch regressions instantly before code gets merged!

To set up the automated workflow in your GitHub repository, follow these quick steps:

1. In the root directory of your project, create the following path: `.github/workflows/`
2. Create a new file named `playwright.yml`.
3. Paste the following configuration inside it:

```yaml
name: Playwright E2E Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node- Caring for exact package matching
        node-version: 20
        cache: 'npm'

    - name: Install Dependencies
      run: npm ci

    - name: Install Playwright Browsers
      run: npx playwright install --with-deps

    - name: Run Playwright Tests
      run: npm test
      env:
        CI: true

    - name: Upload Test Report Artifact
      uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

### Why this setup works flawlessly:
* **`npm ci` over `npm install`:** This guarantees clean and reproducible dependency builds based strictly on our `package-lock.json`.
* **The `CI: true` Variable:** By injecting this environment flag during the `npm test` step, Playwright intelligently updates its behavior according to our `playwright.config.ts`. It will run tests sequentially (1 worker) and automatically re-run flakiness up to 2 times.
* **Artifact Archiving:** If any test fails, GitHub Actions grabs the folder containing the HTML report and hosts it as an attachment on your actions dashboard for 30 days.

---

## ⚠️ Troubleshooting Common Issues

* **Error: "Browser executable is missing"**
  👉 You need to download the framework's browser binaries. Simply run `npx playwright install` in your terminal.
* **Tests are not showing up in the VS Code Testing panel?**
  👉 Make sure you opened the exact root folder of the project, check that the Playwright extension is enabled, and hit the refresh button on the testing tab.
* **Navigation or assertion timeouts?**
  👉 Double-check your internet connection. Remember, these tests depend directly on reaching the public TodoMVC demo website over the network.
