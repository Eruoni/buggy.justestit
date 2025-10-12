import { chromium, firefox, webkit, Browser, BrowserContext, Page, LaunchOptions } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const options: LaunchOptions = {
    headless: process.env.HEADLESS === "true",
    slowMo: parseInt(process.env.SLOWMO || "0"),
    timeout: parseInt(process.env.TIMEOUT || "30000"),
};

let browser: Browser;
let context: BrowserContext;
let page: Page;

export const invokeBrowser = async (): Promise<Browser> => {
    const browserType = process.env.BROWSER?.toLowerCase() || "chrome";
    
    switch (browserType) {
        case "chrome":
        case "chromium":
            browser = await chromium.launch(options);
            break;
        case "firefox":
            browser = await firefox.launch(options);
            break;
        case "webkit":
        case "safari":
            browser = await webkit.launch(options);
            break;
        default:
            throw new Error(`Unsupported browser: ${browserType}. Supported browsers: chrome, firefox, webkit`);
    }
    
    return browser;
};

export const createContext = async (): Promise<BrowserContext> => {
    context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        recordVideo: process.env.RECORD_VIDEO === "true" ? { dir: "./test-results/videos/" } : undefined,
    });
    return context;
};

export const createPage = async (): Promise<Page> => {
    page = await context.newPage();
    page.setDefaultTimeout(parseInt(process.env.TIMEOUT || "30000"));
    return page;
};

export const closeBrowser = async (): Promise<void> => {
    if (page) await page.close();
    if (context) await context.close();
    if (browser) await browser.close();
};

export const getPage = (): Page => {
    if (!page) {
        throw new Error("Page not initialized. Call createPage() first.");
    }
    return page;
};

export const getContext = (): BrowserContext => {
    if (!context) {
        throw new Error("Context not initialized. Call createContext() first.");
    }
    return context;
};

export const getBrowser = (): Browser => {
    if (!browser) {
        throw new Error("Browser not initialized. Call invokeBrowser() first.");
    }
    return browser;
};

export const getBaseURL = (): string => {
    return process.env.BASE_URL || "https://buggy.justtestit.org";
};

export const getdefaultTimeout = (): number => {
    return parseInt(process.env.TIMEOUT || "30000")
};

export const getdefaultShortTimeout = (): number => {
    return parseInt(process.env.SHORT_TIMEOUT || "5000")
};