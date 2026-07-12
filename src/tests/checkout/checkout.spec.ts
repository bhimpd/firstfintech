import { test } from "@playwright/test";
import { Helper } from "../../utils/helpers";
import { RegisterPage } from "../../pages/RegisterPage";
import { HomePage } from "../../pages/HomePage";
import { getUserRegisterData } from "../../test-data/userRegisterData";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";


test.beforeEach(async ({ page }) => {
    const helper = new Helper(page);
    await helper.visitpage("https://demo.prestashop.com/#/en/front");

});


test.describe("E2E Product Purchase Flow", () => {
    test("TC_004: Positive: Verify Complete Product Purchase Flow — Search, Add to Cart, Update Quantity, and Checkout", async ({ page }) => {
        const register = new RegisterPage(page);
        const homePage = new HomePage(page);
        const userRegisterData = getUserRegisterData();
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await homePage.clickSignInButton();
        await register.clickCreateAccount();
        await register.registerCustomer(userRegisterData);
        await register.assertRegistrationSuccess(userRegisterData);

        await homePage.clickNfillSearchInput("Hummingbird");
        await homePage.assertSearchResultsMatch("Hummingbird");
        await homePage.clickFirstProduct();
        await productPage.clickIncrementButton();
        await productPage.clickAddToCartButton();
        await cartPage.clickProceedToCheckout();
        await cartPage.clickProceedToCheckoutDetail();
        await checkoutPage.fillAddressDetails("kathmandu Main Street 123", "44600", "New Baneswor");
        await checkoutPage.clickContinueButton();
        await checkoutPage.fillDeliveryMessage();
        await checkoutPage.clickContinuePayment();
        await checkoutPage.clickPayByCashOption();
        await checkoutPage.clickTermsAndCondtition();
        await checkoutPage.clickPlaceOrderButtton();
        await checkoutPage.assertOrderConfirmMessage();
    });

});