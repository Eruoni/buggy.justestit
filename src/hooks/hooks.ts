import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import * as browserManager from "../helper/browsers/browser-manager";

let page: Page;

BeforeAll(async function () {
    console.log("Launching browser...");
    await browserManager.invokeBrowser();
});

Before(async function () {
    console.log("Creating new context and page...");
    await browserManager.createContext();
    page = await browserManager.createPage();
    this.page = page;

    // Navigate to BASE_URL automatically
    const baseURL = browserManager.getBaseURL();
    console.log(`Navigating to: ${baseURL}`);
    await page.goto(baseURL, { waitUntil: "domcontentloaded" });
});

After(async function ({ pickle, result }) {
    if (result?.status === Status.FAILED) {
        const screenshot = await page.screenshot({ 
            path: `./test-results/screenshots/${pickle.name}-${Date.now()}.png`,
            fullPage: true 
        });
        this.attach(screenshot, "image/png");
    }
    
    console.log(`Scenario: ${pickle.name} - Status: ${result?.status}`);

    // Close page and context after each scenario
    if (page) {
        await page.close();
    }
    const context = browserManager.getContext();
    if (context) {
        await context.close();
    }
});

AfterAll(async function () {
    console.log("Closing browser...");
    await browserManager.closeBrowser();
});