import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
    protected page: Page;
    protected defaultTimeout: number;

    constructor(page: Page) {
        this.page = page;
        this.defaultTimeout = parseInt(process.env.TIMEOUT || "30000");
    }

    /**
     * Navigate to a URL
     */
    async goto(url: string, timeout?: number): Promise<void> {
        await this.page.goto(url, { 
            timeout: timeout || this.defaultTimeout,
            waitUntil: "domcontentloaded"
        });
    }

    /**
     * Click on an element
     */
    async click(selector: string, timeout?: number): Promise<void> {
        await this.page.click(selector, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Click on a locator
     */
    async clickLocator(locator: Locator, timeout?: number): Promise<void> {
        await locator.click({ 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Double click on an element
     */
    async doubleClick(selector: string, timeout?: number): Promise<void> {
        await this.page.dblclick(selector, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Fill input field
     */
    async fill(selector: string, text: string, timeout?: number): Promise<void> {
        await this.page.fill(selector, text, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Fill locator input field
     */
    async fillLocator(locator: Locator, text: string, timeout?: number): Promise<void> {
        await locator.fill(text, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Type text with delay (simulates real typing)
     */
    async type(selector: string, text: string, delay: number = 100, timeout?: number): Promise<void> {
        await this.page.type(selector, text, { 
            delay,
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Clear input field
     */
    async clear(selector: string, timeout?: number): Promise<void> {
        await this.page.fill(selector, "", { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Get text content of an element
     */
    async getText(selector: string, timeout?: number): Promise<string> {
        const element = await this.page.waitForSelector(selector, { 
            timeout: timeout || this.defaultTimeout 
        });
        return (await element?.textContent()) || "";
    }

    /**
     * Get text content from a locator
     */
    async getTextFromLocator(locator: Locator, timeout?: number): Promise<string> {
        return (await locator.textContent({ 
            timeout: timeout || this.defaultTimeout 
        })) || "";
    }

    /**
     * Get attribute value
     */
    async getAttribute(selector: string, attribute: string, timeout?: number): Promise<string | null> {
        await this.page.waitForSelector(selector, { 
            timeout: timeout || this.defaultTimeout 
        });
        return await this.page.getAttribute(selector, attribute);
    }

    /**
     * Check if element is visible
     */
    async isVisible(selector: string, timeout?: number): Promise<boolean> {
        try {
            await this.page.waitForSelector(selector, { 
                state: "visible",
                timeout: timeout || this.defaultTimeout 
            });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if locator is visible
     */
    async isLocatorVisible(locator: Locator, timeout?: number): Promise<boolean> {
        try {
            await locator.waitFor({ 
                state: "visible",
                timeout: timeout || this.defaultTimeout 
            });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if element is hidden
     */
    async isHidden(selector: string, timeout?: number): Promise<boolean> {
        try {
            await this.page.waitForSelector(selector, { 
                state: "hidden",
                timeout: timeout || this.defaultTimeout 
            });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if element is enabled
     */
    async isEnabled(selector: string, timeout?: number): Promise<boolean> {
        await this.page.waitForSelector(selector, { 
            timeout: timeout || this.defaultTimeout 
        });
        return await this.page.isEnabled(selector);
    }

    /**
     * Check if element is disabled
     */
    async isDisabled(selector: string, timeout?: number): Promise<boolean> {
        return !(await this.isEnabled(selector, timeout));
    }

    /**
     * Check if checkbox/radio is checked
     */
    async isChecked(selector: string, timeout?: number): Promise<boolean> {
        await this.page.waitForSelector(selector, { 
            timeout: timeout || this.defaultTimeout 
        });
        return await this.page.isChecked(selector);
    }

    /**
     * Wait for element to be visible
     */
    async waitForElement(selector: string, timeout?: number): Promise<void> {
        await this.page.waitForSelector(selector, { 
            state: "visible",
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Wait for locator to be visible
     */
    async waitForLocator(locator: Locator, timeout?: number): Promise<void> {
        await locator.waitFor({ 
            state: "visible",
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Wait for element to be hidden
     */
    async waitForElementHidden(selector: string, timeout?: number): Promise<void> {
        await this.page.waitForSelector(selector, { 
            state: "hidden",
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Wait for page to load
     */
    async waitForPageLoad(timeout?: number): Promise<void> {
        await this.page.waitForLoadState("domcontentloaded", { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Wait for network to be idle
     */
    async waitForNetworkIdle(timeout?: number): Promise<void> {
        await this.page.waitForLoadState("networkidle", { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Wait for specific time
     */
    async wait(milliseconds: number): Promise<void> {
        await this.page.waitForTimeout(milliseconds);
    }

    /**
     * Select option from dropdown by value
     */
    async selectByValue(selector: string, value: string, timeout?: number): Promise<void> {
        await this.page.selectOption(selector, { value }, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Select option from dropdown by label
     */
    async selectByLabel(selector: string, label: string, timeout?: number): Promise<void> {
        await this.page.selectOption(selector, { label }, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Select option from dropdown by index
     */
    async selectByIndex(selector: string, index: number, timeout?: number): Promise<void> {
        await this.page.selectOption(selector, { index }, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Hover over an element
     */
    async hover(selector: string, timeout?: number): Promise<void> {
        await this.page.hover(selector, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Focus on an element
     */
    async focus(selector: string, timeout?: number): Promise<void> {
        await this.page.focus(selector, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Press a key
     */
    async press(selector: string, key: string, timeout?: number): Promise<void> {
        await this.page.press(selector, key, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Press keyboard key
     */
    async pressKey(key: string): Promise<void> {
        await this.page.keyboard.press(key);
    }

    /**
     * Get page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Get current URL
     */
    async getURL(): Promise<string> {
        return this.page.url();
    }

    /**
     * Reload page
     */
    async reload(timeout?: number): Promise<void> {
        await this.page.reload({ 
            timeout: timeout || this.defaultTimeout,
            waitUntil: "domcontentloaded"
        });
    }

    /**
     * Go back
     */
    async goBack(timeout?: number): Promise<void> {
        await this.page.goBack({ 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Go forward
     */
    async goForward(timeout?: number): Promise<void> {
        await this.page.goForward({ 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Take screenshot
     */
    async takeScreenshot(path: string): Promise<Buffer> {
        return await this.page.screenshot({ 
            path,
            fullPage: true 
        });
    }

    /**
     * Get element count
     */
    async getElementCount(selector: string): Promise<number> {
        return await this.page.locator(selector).count();
    }

    /**
     * Get all text contents
     */
    async getAllTexts(selector: string, timeout?: number): Promise<string[]> {
        await this.page.waitForSelector(selector, { 
            timeout: timeout || this.defaultTimeout 
        });
        return await this.page.locator(selector).allTextContents();
    }

    /**
     * Check element
     */
    async check(selector: string, timeout?: number): Promise<void> {
        await this.page.check(selector, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Uncheck element
     */
    async uncheck(selector: string, timeout?: number): Promise<void> {
        await this.page.uncheck(selector, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Drag and drop
     */
    async dragAndDrop(sourceSelector: string, targetSelector: string, timeout?: number): Promise<void> {
        await this.page.dragAndDrop(sourceSelector, targetSelector, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Execute JavaScript
     */
    async evaluate<T>(pageFunction: (arg?: any) => T | Promise<T>, arg?: any): Promise<T> {
        return await this.page.evaluate(pageFunction, arg);
    }

    /**
     * Scroll to element
     */
    async scrollToElement(selector: string, timeout?: number): Promise<void> {
        await this.page.locator(selector).scrollIntoViewIfNeeded({ 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Accept alert/confirm dialog
     */
    async acceptDialog(): Promise<void> {
        this.page.on("dialog", async (dialog) => {
            await dialog.accept();
        });
    }

    /**
     * Dismiss alert/confirm dialog
     */
    async dismissDialog(): Promise<void> {
        this.page.on("dialog", async (dialog) => {
            await dialog.dismiss();
        });
    }

    /**
     * Get dialog message
     */
    async getDialogMessage(): Promise<string> {
        return new Promise((resolve) => {
            this.page.on("dialog", async (dialog) => {
                const message = dialog.message();
                await dialog.accept();
                resolve(message);
            });
        });
    }

    /**
     * Switch to frame by name or index
     */
    async switchToFrame(nameOrIndex: string | number): Promise<void> {
        const frame = typeof nameOrIndex === "string" 
            ? this.page.frame({ name: nameOrIndex })
            : this.page.frames()[nameOrIndex];
        
        if (!frame) {
            throw new Error(`Frame not found: ${nameOrIndex}`);
        }
    }

    /**
     * Upload file
     */
    async uploadFile(selector: string, filePath: string | string[], timeout?: number): Promise<void> {
        await this.page.setInputFiles(selector, filePath, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Get locator
     */
    getLocator(selector: string): Locator {
        return this.page.locator(selector);
    }

    /**
     * Assertions - Expect element to be visible
     */
    async expectToBeVisible(selector: string, timeout?: number): Promise<void> {
        await expect(this.page.locator(selector)).toBeVisible({ 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Assertions - Expect locator to be visible
     */
    async expectLocatorToBeVisible(locator: Locator, timeout?: number): Promise<void> {
        await expect(locator).toBeVisible({ 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Assertions - Expect element to have text
     */
    async expectToHaveText(selector: string, text: string | RegExp, timeout?: number): Promise<void> {
        await expect(this.page.locator(selector)).toHaveText(text, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Assertions - Expect element to contain text
     */
    async expectToContainText(selector: string, text: string, timeout?: number): Promise<void> {
        await expect(this.page.locator(selector)).toContainText(text, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Assertions - Expect URL to be
     */
    async expectURLToBe(url: string | RegExp, timeout?: number): Promise<void> {
        await expect(this.page).toHaveURL(url, { 
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Assertions - Expect title to be
     */
    async expectTitleToBe(title: string | RegExp, timeout?: number): Promise<void> {
        await expect(this.page).toHaveTitle(title, { 
            timeout: timeout || this.defaultTimeout 
        });
    }
}