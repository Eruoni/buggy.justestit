import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export default class RegisterPage extends BasePage{
    private readonly input_usernamme
    private readonly input_Firstname
    private readonly input_LastName
    private readonly input_password
    private readonly input_ConfirmPassword
    private readonly btn_Register
    private readonly btn_Cancel

    constructor(page: Page){
        super(page)

        this.input_usernamme = this.getLocator('#username')
        this.input_Firstname = this.getLocator('#firstName')
        this.input_LastName = this.getLocator('#lastName')
        this.input_password = this.getLocator('#password')
        this.input_ConfirmPassword = this.getLocator('#confirmPassword')
        this.btn_Register = this.getLocator(`//button[text()='Register']`)
        this.btn_Cancel = this.getLocator(`//a[text()='Cancel']`)
    }

    async enterUsername(username: string){
        await this.fill(this.input_usernamme, username)
    }

    async enterFirstName(name: string){
        await this.fill(this.input_Firstname, name)
    }

    async enterLastName(name: string){
        await this.fill(this.input_LastName, name)
    }

    async enterPassword(password: string){
        await this.fill(this.input_password, password)
    }

    async enterConfirmPassword(password: string){
        await this.fill(this.input_ConfirmPassword, password)
    }

    async clickBtnRegister(){
        await this.click(this.btn_Register)
    }

    async clickBtnCancel(){
        await this.click(this.btn_Cancel)
    }

    async register(username: string, firstName: string, lastName: string, password: string){
        await this.enterUsername(username)
        await this.enterFirstName(firstName)
        await this.enterLastName(lastName)
        await this.enterPassword(password)
        await this.enterConfirmPassword(password)
        await this.clickBtnRegister()
        await this.verifyRegisterSuccessful()
    }

    async verifyRegisterSuccessful(){
        const successLocator = await this.getElementContainingText('Registration is successful')
        await this.expectToBeVisible(successLocator)
    }
}