import { expect, FrameLocator, Locator, type Page } from "@playwright/test";
import { Helper } from "../utils/helpers";
import { Customer } from "./RegisterPage";

/**
 * Page Object Model (POM) for Register operations.
 */
export class ProductPage {

    readonly page: Page
    readonly helper: Helper;
    readonly shopFrame: FrameLocator;
    readonly incrementButtonSelector: Locator;
    readonly addToCartButttonSelector: Locator;
    readonly proceedToCheckoutSelector: Locator;
    readonly proceedToCheckoutDetailSelector: Locator;


    constructor(page: Page) {
        this.page = page;
        this.helper = new Helper(page);
        this.shopFrame = page.frameLocator('iframe[title="Frame of demo shop"]');

        this.incrementButtonSelector = this.shopFrame.locator("#increment_button_1");
        this.addToCartButttonSelector = this.shopFrame.locator(".product__add-to-cart-button");
        this.proceedToCheckoutSelector = this.shopFrame.locator(".modal-footer a.btn.btn-primary");
        this.proceedToCheckoutDetailSelector = this.shopFrame.locator(".cart-summary__actions.checkout a.btn.btn-primary.btn-lg")

    }

    async clickIncrementButton() {
        await this.page.waitForTimeout(2000);
        await this.helper.Visiblity(this.incrementButtonSelector);
        await this.incrementButtonSelector.click();

    }

    async clickAddToCartButton() {
        await this.page.waitForTimeout(2500);
        await this.helper.Visiblity(this.addToCartButttonSelector);
        await this.addToCartButttonSelector.click();

    }



}