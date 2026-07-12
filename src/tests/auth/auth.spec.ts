import { test } from "@playwright/test";
import { Helper } from "../../utils/helpers";
import { RegisterPage } from "../../pages/RegisterPage";
import { HomePage } from "../../pages/HomePage";
import { getUserRegisterData } from "../../test-data/userRegisterData";
import { saveRegisteredUser } from "../../utils/userStorge";


test.beforeEach(async ({ page }) => {
    const helper = new Helper(page);
    await helper.visitpage("https://demo.prestashop.com/#/en/front");

});


test.describe("Register New Account And Login Scenerios", () => {

    test("TC_001: Positive: Verify Customer Account Creation Flow by Filling Registration Details and Validating Successful Registration", async ({ page }) => {
        const register = new RegisterPage(page);
        const homePage = new HomePage(page);
        const userRegisterData = getUserRegisterData();

        await homePage.clickSignInButton();
        await register.clickCreateAccount();
        await register.registerCustomer(userRegisterData);
        await register.assertRegistrationSuccess(userRegisterData);

        saveRegisteredUser(userRegisterData);

    });

    test("TC_002: Positive: Verify Registered new account, Sign Out and Login with the registered account", async ({ page }) => {
        const register = new RegisterPage(page);
        const homePage = new HomePage(page);
        const userRegisterData = getUserRegisterData();

        await homePage.clickSignInButton();
        await register.clickCreateAccount();
        await register.registerCustomer(userRegisterData);
        await register.assertRegistrationSuccess(userRegisterData);
        saveRegisteredUser(userRegisterData);

        await register.clickUserAccount(userRegisterData);
        await register.clickSignOut();
        await page.waitForTimeout(2000);
        await homePage.assertSignInLabel();

    });

    test("TC_003: Negative: Verify Login with un-registered  email", async ({ page }) => {
        const homePage = new HomePage(page);
        const userRegisterData = getUserRegisterData();

        await homePage.clickSignInButton();
        await homePage.fillSignInUserData(userRegisterData);
        await homePage.clickSubmitButton();
        await homePage.assertAuthenticationFailedLabel();

    });



});
