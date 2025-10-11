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
});

AfterAll(async function () {
    console.log("Closing browser...");
    await browserManager.closeBrowser();
});