import { expect, FrameLocator, Locator, type Page } from "@playwright/test";
import { Helper } from "../utils/helpers";

/**
 * Page Object Model (POM) for Cart operations.
 */
export class CartPage {

    readonly page: Page
    readonly helper: Helper;
    readonly shopFrame: FrameLocator;
    readonly proceedToCheckoutSelector: Locator;
    readonly proceedToCheckoutDetailSelector: Locator;


    constructor(page: Page) {
        this.page = page;
        this.helper = new Helper(page);
        this.shopFrame = page.frameLocator('iframe[title="Frame of demo shop"]');

        this.proceedToCheckoutSelector = this.shopFrame.locator(".modal-footer a.btn.btn-primary");
        this.proceedToCheckoutDetailSelector = this.shopFrame.locator(".cart-summary__actions.checkout a.btn.btn-primary.btn-lg")

    }



    async clickProceedToCheckout() {
        await this.helper.Visiblity(this.proceedToCheckoutSelector);
        await this.proceedToCheckoutSelector.last().click();
    }

    async clickProceedToCheckoutDetail() {
        await this.helper.Visiblity(this.proceedToCheckoutDetailSelector);
        await this.proceedToCheckoutDetailSelector.click();
    }



}