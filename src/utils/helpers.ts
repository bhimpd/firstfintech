import { Page, Locator, expect } from "@playwright/test";

export class Helper {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async visitpage(expectedUrl: string) {
        await this.page.goto(expectedUrl, { waitUntil: "domcontentloaded" });
    }

    async textAssertion(selector: Locator, text: string) {
        await this.Visiblity(selector);
        const actualText = (await selector.textContent())?.trim() ?? '';
        const expectedText = text.trim();

        console.log(`Expected Text: "${expectedText}"`);
        console.log(`Actual Text:   "${actualText}"`);

        expect(actualText).toBe(expectedText);
    }

    async urlAssertion(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async Visiblity(selector: Locator, timeout = 15000) {
        await expect(selector).toBeVisible({ timeout });
    }


}
