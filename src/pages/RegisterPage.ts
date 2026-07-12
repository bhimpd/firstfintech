import { expect, Locator, type FrameLocator, type Page } from "@playwright/test";
import { Helper } from "../utils/helpers";

export type Customer = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

/**
 * Page Object Model (POM) for Register operations.
 */
export class RegisterPage {

    readonly page: Page
    readonly shopFrame: FrameLocator;
    helper: Helper;
    genderSelector: Locator;
    createAccountSelector: Locator;
    firstNameSelector: Locator;
    lastNameSelector: Locator;
    emailSelector: Locator;
    passwordSelector: Locator;
    privacySelector: Locator;
    customerPrivacySelector: Locator;
    submitSelector: Locator;
    signOutSelector: Locator;



    constructor(page: Page) {
        this.page = page;
        this.helper = new Helper(page);
        this.shopFrame = page.frameLocator('iframe[title="Frame of demo shop"]');

        this.createAccountSelector = this.shopFrame.getByText('Create your account');
        this.genderSelector = this.shopFrame.locator('#field-id_gender-1, #field-id_gender_1');
        this.firstNameSelector = this.shopFrame.locator('#field-firstname');
        this.lastNameSelector = this.shopFrame.locator('#field-lastname');
        this.emailSelector = this.shopFrame.locator('#field-email');
        this.passwordSelector = this.shopFrame.locator('#field-password');
        this.privacySelector = this.shopFrame.locator('input[name="psgdpr"]');
        this.customerPrivacySelector = this.shopFrame.locator('input[name="customer_privacy"]')
        this.submitSelector = this.shopFrame.locator('button[data-link-action="save-customer"]');
        this.signOutSelector = this.shopFrame.locator('a[href*="mylogout"]').first();
    }

    async clickCreateAccount() {
        await this.helper.Visiblity(this.createAccountSelector);
        await this.createAccountSelector.click();
    }

    async clickGender() {
        await this.helper.Visiblity(this.genderSelector);
        await this.genderSelector.check();
    }

    async registerCustomer(customer: Customer) {
        await this.clickGender();
        await this.firstNameSelector.fill(customer.firstName);
        await this.lastNameSelector.fill(customer.lastName);
        await this.emailSelector.fill(customer.email);
        await this.passwordSelector.fill(customer.password);
        await this.privacySelector.check();
        await this.customerPrivacySelector.check();
        await this.submitSelector.click();
    }

    async assertRegistrationSuccess(customer: Customer) {
        await this.helper.Visiblity(this.shopFrame.getByText(`${customer.firstName} ${customer.lastName}`));
    }

    async clickUserAccount(customer: Customer) {
        await this.helper.Visiblity(this.shopFrame.getByText(`${customer.firstName} ${customer.lastName}`));
        await this.shopFrame.getByText(`${customer.firstName} ${customer.lastName}`).click();
    }

    async clickSignOut() {
        await this.helper.Visiblity(this.signOutSelector);
        await this.signOutSelector.click();
    }

}
