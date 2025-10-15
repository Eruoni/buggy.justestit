import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
    protected page: Page;
    protected defaultTimeout: number;

    constructor(page: Page) {
        this.page = page;
        this.defaultTimeout = parseInt(process.env.TIMEOUT || "30000");
    }

    /**
     * Helper method to get locator from string or return existing locator
     */
    private getElementLocator(element: string | Locator): Locator {
        return typeof element === "string" ? this.page.locator(element) : element;
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
    async click(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.click({ timeout: timeout || this.defaultTimeout });
    }

    /**
     * Double click on an element
     */
    async doubleClick(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.dblclick({ timeout: timeout || this.defaultTimeout });
    }

    /**
     * Fill input field
     */
    async fill(element: string | Locator, text: string, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.fill(text, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Type text with delay (simulates real typing)
     */
    async type(element: string | Locator, text: string, delay: number = 100, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.pressSequentially(text, { 
            delay,
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Clear input field
     */
    async clear(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.clear({ timeout: timeout || this.defaultTimeout });
    }

    /**
     * Get text content of an element
     */
    async getText(element: string | Locator, timeout?: number): Promise<string> {
        const locator = this.getElementLocator(element);
        return (await locator.textContent({ timeout: timeout || this.defaultTimeout })) || "";
    }

    /**
     * Get attribute value
     */
    async getAttribute(element: string | Locator, attribute: string, timeout?: number): Promise<string | null> {
        const locator = this.getElementLocator(element);
        await locator.waitFor({ state: "attached", timeout: timeout || this.defaultTimeout });
        return await locator.getAttribute(attribute);
    }

    /**
     * Get input value
     */
    async getInputValue(element: string | Locator, timeout?: number): Promise<string> {
        const locator = this.getElementLocator(element);
        return await locator.inputValue({ timeout: timeout || this.defaultTimeout });
    }

    /**
     * Check if element is visible
     */
    async isVisible(element: string | Locator, timeout?: number): Promise<boolean> {
        try {
            const locator = this.getElementLocator(element);
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
    async isHidden(element: string | Locator, timeout?: number): Promise<boolean> {
        try {
            const locator = this.getElementLocator(element);
            await locator.waitFor({ 
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
    async isEnabled(element: string | Locator, timeout?: number): Promise<boolean> {
        const locator = this.getElementLocator(element);
        await locator.waitFor({ state: "attached", timeout: timeout || this.defaultTimeout });
        return await locator.isEnabled();
    }

    /**
     * Check if element is disabled
     */
    async isDisabled(element: string | Locator, timeout?: number): Promise<boolean> {
        return !(await this.isEnabled(element, timeout));
    }

    /**
     * Check if checkbox/radio is checked
     */
    async isChecked(element: string | Locator, timeout?: number): Promise<boolean> {
        const locator = this.getElementLocator(element);
        await locator.waitFor({ state: "attached", timeout: timeout || this.defaultTimeout });
        return await locator.isChecked();
    }

    /**
     * Wait for element to be visible
     */
    async waitForElement(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.waitFor({ 
            state: "visible",
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Wait for element to be hidden
     */
    async waitForElementHidden(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.waitFor({ 
            state: "hidden",
            timeout: timeout || this.defaultTimeout 
        });
    }

    /**
     * Wait for element to be attached
     */
    async waitForElementAttached(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.waitFor({ 
            state: "attached",
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
    async selectByValue(element: string | Locator, value: string, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.selectOption({ value }, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Select option from dropdown by label
     */
    async selectByLabel(element: string | Locator, label: string, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.selectOption({ label }, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Select option from dropdown by index
     */
    async selectByIndex(element: string | Locator, index: number, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.selectOption({ index }, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Hover over an element
     */
    async hover(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.hover({ timeout: timeout || this.defaultTimeout });
    }

    /**
     * Focus on an element
     */
    async focus(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.focus({ timeout: timeout || this.defaultTimeout });
    }

    /**
     * Press a key on an element
     */
    async press(element: string | Locator, key: string, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.press(key, { timeout: timeout || this.defaultTimeout });
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
    async getElementCount(element: string | Locator): Promise<number> {
        const locator = this.getElementLocator(element);
        return await locator.count();
    }

    /**
     * Get all text contents
     */
    async getAllTexts(element: string | Locator, timeout?: number): Promise<string[]> {
        const locator = this.getElementLocator(element);
        await locator.first().waitFor({ 
            state: "attached",
            timeout: timeout || this.defaultTimeout 
        });
        return await locator.allTextContents();
    }

    /**
     * Get all inner texts
     */
    async getAllInnerTexts(element: string | Locator, timeout?: number): Promise<string[]> {
        const locator = this.getElementLocator(element);
        await locator.first().waitFor({ 
            state: "attached",
            timeout: timeout || this.defaultTimeout 
        });
        return await locator.allInnerTexts();
    }

    /**
     * Check element
     */
    async check(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.check({ timeout: timeout || this.defaultTimeout });
    }

    /**
     * Uncheck element
     */
    async uncheck(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.uncheck({ timeout: timeout || this.defaultTimeout });
    }

    /**
     * Drag and drop
     */
    async dragAndDrop(source: string | Locator, target: string | Locator, timeout?: number): Promise<void> {
        const sourceLocator = this.getElementLocator(source);
        const targetLocator = this.getElementLocator(target);
        await sourceLocator.dragTo(targetLocator, { timeout: timeout || this.defaultTimeout });
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
    async scrollToElement(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.scrollIntoViewIfNeeded({ timeout: timeout || this.defaultTimeout });
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
    async uploadFile(element: string | Locator, filePath: string | string[], timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await locator.setInputFiles(filePath, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Get locator
     */
    getLocator(selector: string): Locator {
        return this.page.locator(selector);
    }

    /**
     * Get element by text (exact match)
     */
    getByText(text: string | RegExp, options?: { exact?: boolean }): Locator {
        return this.page.getByText(text, options);
    }

    /**
     * Get element by role
     */
    getByRole(role: "button" | "link" | "textbox" | "checkbox" | "radio" | "heading" | "img" | "listitem" | "table" | "cell" | "row" | "columnheader" | "list" | "navigation" | "main" | "banner" | "contentinfo" | "complementary" | "form" | "search" | "region" | "article" | "dialog" | "alert" | "alertdialog" | "menu" | "menuitem" | "tab" | "tabpanel" | "tooltip" | "status" | "progressbar" | "slider" | "spinbutton" | "switch" | "combobox" | "grid" | "gridcell" | "rowgroup" | "rowheader" | "separator" | "toolbar" | "tree" | "treeitem", options?: { name?: string | RegExp; exact?: boolean; checked?: boolean; disabled?: boolean; expanded?: boolean; level?: number; pressed?: boolean; selected?: boolean }): Locator {
        return this.page.getByRole(role, options);
    }

    /**
     * Get element by label
     */
    getByLabel(text: string | RegExp, options?: { exact?: boolean }): Locator {
        return this.page.getByLabel(text, options);
    }

    /**
     * Get element by placeholder
     */
    getByPlaceholder(text: string | RegExp, options?: { exact?: boolean }): Locator {
        return this.page.getByPlaceholder(text, options);
    }

    /**
     * Get element by alt text
     */
    getByAltText(text: string | RegExp, options?: { exact?: boolean }): Locator {
        return this.page.getByAltText(text, options);
    }

    /**
     * Get element by title
     */
    getByTitle(text: string | RegExp, options?: { exact?: boolean }): Locator {
        return this.page.getByTitle(text, options);
    }

    /**
     * Get element by test id
     */
    getByTestId(testId: string | RegExp): Locator {
        return this.page.getByTestId(testId);
    }

    /**
     * Get button by text
     */
    getButtonByText(text: string | RegExp, options?: { exact?: boolean }): Locator {
        return this.page.getByRole("button", { name: text, ...options });
    }

    /**
     * Get link by text
     */
    getLinkByText(text: string | RegExp, options?: { exact?: boolean }): Locator {
        return this.page.getByRole("link", { name: text, ...options });
    }

    /**
     * Get heading by text
     */
    getHeadingByText(text: string | RegExp, options?: { exact?: boolean; level?: number }): Locator {
        return this.page.getByRole("heading", { name: text, ...options });
    }

    /**
     * Get textbox by label or placeholder
     */
    getTextbox(text: string | RegExp, options?: { exact?: boolean }): Locator {
        return this.page.getByRole("textbox", { name: text, ...options });
    }

    /**
     * Get checkbox by label
     */
    getCheckbox(text: string | RegExp, options?: { exact?: boolean; checked?: boolean }): Locator {
        return this.page.getByRole("checkbox", { name: text, ...options });
    }

    /**
     * Get radio button by label
     */
    getRadio(text: string | RegExp, options?: { exact?: boolean; checked?: boolean }): Locator {
        return this.page.getByRole("radio", { name: text, ...options });
    }

    /**
     * Get element containing text (partial match)
     */
    getElementContainingText(text: string): Locator {
        return this.page.locator(`text=${text}`);
    }

    /**
     * Get element with exact text
     */
    getElementWithExactText(text: string): Locator {
        return this.page.locator(`text="${text}"`);
    }

    /**
     * Get element by CSS selector containing text
     */
    getElementByCssAndText(selector: string, text: string | RegExp): Locator {
        return this.page.locator(selector).filter({ hasText: text });
    }

    /**
     * Get parent element
     */
    getParent(element: string | Locator): Locator {
        const locator = this.getElementLocator(element);
        return locator.locator("..");
    }

    /**
     * Get child elements
     */
    getChildren(element: string | Locator, childSelector: string): Locator {
        const locator = this.getElementLocator(element);
        return locator.locator(childSelector);
    }

    /**
     * Get sibling element
     */
    getSibling(element: string | Locator, siblingSelector: string): Locator {
        const locator = this.getElementLocator(element);
        return locator.locator(`~ ${siblingSelector}`);
    }

    /**
     * Get nth element from locator
     */
    getNthElement(element: string | Locator, index: number): Locator {
        const locator = this.getElementLocator(element);
        return locator.nth(index);
    }

    /**
     * Get first element
     */
    getFirstElement(element: string | Locator): Locator {
        const locator = this.getElementLocator(element);
        return locator.first();
    }

    /**
     * Get last element
     */
    getLastElement(element: string | Locator): Locator {
        const locator = this.getElementLocator(element);
        return locator.last();
    }

    /**
     * Filter locator by text
     */
    filterByText(element: string | Locator, text: string | RegExp): Locator {
        const locator = this.getElementLocator(element);
        return locator.filter({ hasText: text });
    }

    /**
     * Assertions - Expect element to be visible
     */
    async expectToBeVisible(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await expect(locator).toBeVisible({ timeout: timeout || this.defaultTimeout });
    }

    /**
     * Assertions - Expect element to be hidden
     */
    async expectToBeHidden(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await expect(locator).toBeHidden({ timeout: timeout || this.defaultTimeout });
    }

    /**
     * Assertions - Expect element to be enabled
     */
    async expectToBeEnabled(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await expect(locator).toBeEnabled({ timeout: timeout || this.defaultTimeout });
    }

    /**
     * Assertions - Expect element to be disabled
     */
    async expectToBeDisabled(element: string | Locator, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await expect(locator).toBeDisabled({ timeout: timeout || this.defaultTimeout });
    }

    /**
     * Assertions - Expect element to have text
     */
    async expectToHaveText(element: string | Locator, text: string | RegExp, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await expect(locator).toHaveText(text, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Assertions - Expect element to contain text
     */
    async expectToContainText(element: string | Locator, text: string | RegExp, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await expect(locator).toContainText(text, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Assertions - Expect element to have value
     */
    async expectToHaveValue(element: string | Locator, value: string | RegExp, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await expect(locator).toHaveValue(value, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Assertions - Expect element to have attribute
     */
    async expectToHaveAttribute(element: string | Locator, name: string, value: string | RegExp, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await expect(locator).toHaveAttribute(name, value, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Assertions - Expect element to have count
     */
    async expectToHaveCount(element: string | Locator, count: number, timeout?: number): Promise<void> {
        const locator = this.getElementLocator(element);
        await expect(locator).toHaveCount(count, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Assertions - Expect URL to be
     */
    async expectURLToBe(url: string | RegExp, timeout?: number): Promise<void> {
        await expect(this.page).toHaveURL(url, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Assertions - Expect title to be
     */
    async expectTitleToBe(title: string | RegExp, timeout?: number): Promise<void> {
        await expect(this.page).toHaveTitle(title, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Assertions - Expect URL to contain
     */
    async expectURLToContain(text: string, timeout?: number): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(text), { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Assertions - Expect title to contain
     */
    async expectTitleToContain(text: string, timeout?: number): Promise<void> {
        await expect(this.page).toHaveTitle(new RegExp(text), { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Pause execution for specified seconds
     */
    async pauseInSec(sec: number): Promise<void> {
        await this.wait(sec * 1000);
    }

    /**
     * Generate random string
     */
    generateRandomString(length: number = 8, prefix?: string): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return prefix ? `${prefix}${result}` : result;
    }
}