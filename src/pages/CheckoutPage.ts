import { expect, FrameLocator, Locator, type Page } from "@playwright/test";
import { Helper } from "../utils/helpers";
import { Customer } from "./RegisterPage";

/**
 * Page Object Model (POM) for Checkout Page operations.
 */
export class CheckoutPage {

    readonly page: Page
    readonly helper: Helper;
    readonly shopFrame: FrameLocator;
    readonly addressSelector: Locator;
    readonly postCodeSelector: Locator;
    readonly citySelector: Locator;
    readonly continueSelector: Locator;
    readonly deliveryMessageSelector: Locator;
    readonly continuePaymentSelector: Locator;
    readonly payByCashSelector: Locator;
    readonly termsConditionSelector: Locator;
    readonly placeOrderSelector: Locator;
    readonly confirmMessageSelector: Locator;


    constructor(page: Page) {
        this.page = page;
        this.helper = new Helper(page);
        this.shopFrame = page.frameLocator('iframe[title="Frame of demo shop"]');

        this.addressSelector = this.shopFrame.locator("#field-address1");
        this.postCodeSelector = this.shopFrame.locator("#field-postcode");
        this.citySelector = this.shopFrame.locator("#field-city");
        this.continueSelector = this.shopFrame.locator("button[name='confirm-addresses']");
        this.deliveryMessageSelector = this.shopFrame.locator("#delivery_message");
        this.continuePaymentSelector = this.shopFrame.locator("button[name='confirmDeliveryOption']");
        this.payByCashSelector = this.shopFrame.locator("label[for='payment-option-2']");
        this.termsConditionSelector = this.shopFrame.locator("label[for='conditions_to_approve[terms-and-conditions]']");
        this.placeOrderSelector = this.shopFrame.locator("#payment-confirmation");
        this.confirmMessageSelector = this.shopFrame.locator("h1.page-title-section");

    }


    async fillAddressDetails(address: string, postCode: string, city: string) {
        await this.addressSelector.fill(address);
        await this.postCodeSelector.fill(postCode);
        await this.citySelector.fill(city);
    }



    async clickContinueButton() {
        await this.helper.Visiblity(this.continueSelector);
        await this.continueSelector.click();
    }


    async fillDeliveryMessage() {
        await this.helper.Visiblity(this.deliveryMessageSelector);
        await this.deliveryMessageSelector.fill("Knock Knock!!! This is the test Message...");
    }

    async clickContinuePayment() {
        await this.helper.Visiblity(this.continuePaymentSelector);
        await this.continuePaymentSelector.click();
    }

    async clickPayByCashOption() {
        await this.helper.Visiblity(this.payByCashSelector);
        await this.payByCashSelector.click();
    }

    async clickTermsAndCondtition() {
        await this.helper.Visiblity(this.termsConditionSelector);
        await this.termsConditionSelector.check();
    }

    async clickPlaceOrderButtton() {
        await this.helper.Visiblity(this.placeOrderSelector);
        await this.placeOrderSelector.click();
        await this.page.waitForTimeout(2000);
    }


    async assertOrderConfirmMessage() {
        await this.page.waitForTimeout(2000);
        await this.helper.Visiblity(this.confirmMessageSelector);
        await this.helper.textAssertion(this.confirmMessageSelector, "Your order is confirmed");
    }


}