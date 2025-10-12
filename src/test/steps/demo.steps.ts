import { Given, Then, When } from "@cucumber/cucumber";
import HomePage from "../pages/home-page";
import RegisterPage from "../pages/register-page";
import * as browserManager from "../../helper/browsers/browser-manager";
import ModelContentPage from "../pages/model-content-page";

let homePage: HomePage;
let registerPage: RegisterPage;
let modelContentPage: ModelContentPage;

const timeout = browserManager.getdefaultTimeout();

Given("User login as:", { timeout: timeout }, async function (table) {
  const data = table.hashes()[0];
  const username = data.Username;
  const password = data.Password;

  let count = 0;
  do {
    count++;

    homePage = new HomePage(browserManager.getPage());
    await homePage.login(username, password);

    const isLoggedIn = await homePage.isLoginSuccessful();

    if (!isLoggedIn) {
      // Try registering
      await homePage.clickBtnRegister();
      registerPage = new RegisterPage(browserManager.getPage());
      // Set automation default for first name and last name
      await registerPage.register(username, "Automation", "Test", password);
      await homePage.navigateToHomePage();
    } else {
      break;
    }
  } while (count < 2); //Retry to logged in for 2 times

  if (count > 2) {
    throw new Error(`Error while trying to registration...`);
  }
});

When("User comes to Popular Model from Home Page", { timeout: timeout }, async () => {
  homePage = new HomePage(browserManager.getPage());
  const popularModel = await homePage.getPopularModel();
  await homePage.clickPopularModel();

  modelContentPage = new ModelContentPage(browserManager.getPage());
  await modelContentPage.verifyNavigatedToCorrectModel(popularModel);
});

When("User leaves a comment: {string}", { timeout: timeout }, async function (comment: string) {
  modelContentPage = new ModelContentPage(browserManager.getPage());
  await modelContentPage.addComment(comment);
  this.userComment = comment;
});

When("User vote for the car", { timeout: timeout }, async () => {
  modelContentPage = new ModelContentPage(browserManager.getPage());
  await modelContentPage.clickBtnVote();
});

Then("User should see comment added confirmation message", { timeout: timeout }, async () => {
  modelContentPage = new ModelContentPage(browserManager.getPage());
  await modelContentPage.verifyCommentAdded();
});

Then("User should see their comment displayed at the top of the Review table", { timeout: timeout }, async function () {
  modelContentPage = new ModelContentPage(browserManager.getPage());
  modelContentPage.verifyCommentOnTopOfReviewTable(this.userComment);
});

When("User log out", async () => {
  homePage = new HomePage(browserManager.getPage());
  await homePage.clickBtnLogout()
});

Then('User should see login form displayed', { timeout: timeout }, async() => {
  homePage = new HomePage(browserManager.getPage());
  await homePage.verifyLoginFormDisplayed()
})
