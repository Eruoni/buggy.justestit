import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import * as browserManager from "../../helper/browsers/browser-manager";

export default class HomePage extends BasePage {
  private readonly input_usernamme: Locator;
  private readonly input_password: Locator;
  private readonly btn_login: Locator;
  private readonly btn_register: Locator;
  private readonly btn_logOut: Locator;
  private readonly txt_popularModel: Locator;
  private readonly btn_popularModel: Locator;

  constructor(page: Page) {
    super(page);
    // locator
    this.input_usernamme = this.getLocator('//*[@name="login"]');
    this.input_password = this.getLocator('(//*[@name="password"])[1]');
    this.btn_login = this.getLocator(`//button[text()='Login']`);
    this.btn_register = this.getLocator(`//a[text()='Register']`);
    this.btn_logOut = this.getLocator(`//a[text()='Logout']`);
    this.txt_popularModel = this.getLocator(`//*[text()='Popular Model']/..//h3`);
    this.btn_popularModel = this.getLocator(`//*[text()='Popular Model']/..//a`);
  }

  async navigateToHomePage() {
    await this.goto(browserManager.getBaseURL());
  }

  async verifyUsernameDisplay(){
    await this.expectToBeVisible(this.input_usernamme)
  }

  async enterUsername(username: string) {
    await this.fill(this.input_usernamme, username);
  }

  async verifyPasswordDisplay(){
    await this.expectToBeVisible(this.input_password)
  }

  async enterPassword(password: string) {
    await this.fill(this.input_password, password);
  }

  async verifyBtnLoginDisplay(){
    await this.expectToBeVisible(this.btn_login)
  }

  async clickBtnLogin() {
    await this.click(this.btn_login);
  }

  async clickBtnRegister() {
    await this.click(this.btn_register);
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickBtnLogin();
  }

  async isLoginSuccessful() {
    return await this.isVisible(this.btn_logOut, browserManager.getdefaultShortTimeout());
  }

  async getPopularModel(): Promise<string> {
    const model = await this.getText(this.txt_popularModel, browserManager.getdefaultTimeout());
    const match = model.match(/\s(\w+)\(/);
    return match ? match[1] : "";
  }

  async clickPopularModel() {
    await this.click(this.btn_popularModel);
  }

  async clickBtnLogout(){
    await this.click(this.btn_logOut)
  }

  async verifyLoginFormDisplayed(){
    await this.verifyUsernameDisplay()
    await this.verifyPasswordDisplay()
    await this.verifyBtnLoginDisplay()
  }
}
