import { expect, FrameLocator, Locator, type Page } from "@playwright/test";
import { Helper } from "../utils/helpers";
import { Customer } from "./RegisterPage";

/**
 * Page Object Model (POM) for Register operations.
 */
export class HomePage {

    readonly page: Page
    readonly shopFrame: FrameLocator;
    helper: Helper;
    signInSelector: Locator;
    signInLabelSelector: Locator;
    authFailedSelector: Locator;
    submitLoginButtonSelector: Locator;
    emailSelector: Locator;
    passwordSelector: Locator;
    searchInputSelector: Locator;
    productTitleSelector: Locator;



    constructor(page: Page) {
        this.page = page;
        this.helper = new Helper(page);
        this.shopFrame = page.frameLocator('iframe[title="Frame of demo shop"]');
        this.signInSelector = this.shopFrame.locator('.ps-customersignin');
        this.signInLabelSelector = this.shopFrame.locator('.ps-customersignin .header-block__title:visible');
        this.authFailedSelector = this.shopFrame.locator('.help-block .alert.alert-danger');
        this.submitLoginButtonSelector = this.shopFrame.locator('#submit-login');
        this.emailSelector = this.shopFrame.locator('#field-email');
        this.passwordSelector = this.shopFrame.locator('#field-password');
        this.searchInputSelector = this.shopFrame.locator(".ps-searchbar__input");
        this.productTitleSelector = this.shopFrame.locator("a.product-miniature__title");
    }

    async clickSignInButton() {
        await this.helper.Visiblity(this.signInSelector);
        await this.signInSelector.click();
    }


    async assertSignInLabel() {
        await this.helper.Visiblity(this.signInLabelSelector);
        await this.helper.textAssertion(this.signInLabelSelector, "Sign in");

    }


    async assertAuthenticationFailedLabel() {
        await this.helper.Visiblity(this.authFailedSelector);
        await this.helper.textAssertion(this.authFailedSelector, "Authentication failed.");
    }


    async fillSignInUserData(customer: Customer) {
        await this.emailSelector.fill(customer.email);
        await this.passwordSelector.fill(customer.password);
    }


    async clickSubmitButton() {
        await this.helper.Visiblity(this.submitLoginButtonSelector);
        await this.submitLoginButtonSelector.click();
    }

    async clickNfillSearchInput(productName: string) {
        await this.helper.Visiblity(this.searchInputSelector);
        await this.searchInputSelector.click();
        await this.searchInputSelector.fill(productName);
        await this.searchInputSelector.press('Enter');
        await this.page.waitForTimeout(2000);
    }


    async assertSearchResultsMatch(searchText: string) {
        await this.helper.Visiblity(this.productTitleSelector.first());

        const count = await this.productTitleSelector.count();
        console.log("Total Product Searched items Found :: ", count);
        expect(count).toBeGreaterThan(0); // ensure at least one result exists

        const expectedText = searchText.trim().toLowerCase();

        for (let i = 0; i < count; i++) {
            const titleText = (await this.productTitleSelector.nth(i).textContent())?.trim().toLowerCase() ?? '';
            console.log(`Product ${i + 1}: "${titleText}"`);

            expect(titleText).toContain(expectedText);
        }
    }


    async clickFirstProduct() {
        await this.helper.Visiblity(this.productTitleSelector.first());
        await this.productTitleSelector.first().click();
        await this.page.waitForTimeout(2000);
    }

}
