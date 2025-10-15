# Buggy JustTestIt - Automated Testing Framework

## Overview

This is an automated testing framework for [buggy.justtestit.org](https://buggy.justtestit.org) built with:

- **Playwright** - Browser automation
- **Cucumber (BDD)** - Behavior-driven testing with Gherkin syntax
- **TypeScript** - Type-safe test development
- **Page Object Model (POM)** - Maintainable test architecture

## Project Structure

```
├── src/
│   ├── helper/browsers/     # Browser management
│   ├── hooks/               # Cucumber hooks (Before/After)
│   └── test/
│       ├── features/        # Gherkin feature files
│       ├── pages/           # Page Object Model classes
│       └── steps/           # Step definitions
├── test-results/            # Test reports and screenshots
└── .env                     # Environment configuration
```

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment:**
   Create a `.env` file in the root directory:
   ```env
   BROWSER=chrome
   HEADLESS=false
   SLOWMO=0
   TIMEOUT=30000
   SHORT_TIMEOUT=5000
   BASE_URL=https://buggy.justtestit.org
   ```

## How to Run

### Run Demo Test

```bash
npm run test:demo
```

### Run Specific Feature

```bash
cucumber-js src/test/features/demo.feature
```

### Re-run Failed Tests

```bash
npm run test:failed
```

## View Reports

After running tests, view the HTML report:

**Windows:**

```bash
start test-results/cucumber-report.html
```

**Mac:**

```bash
open test-results/cucumber-report.html
```

**Or use npm script:**

```bash
npm run report
```
