import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export default class ModelContentPage extends BasePage{
    private readonly txt_model_header: Locator
    private readonly txa_comment: Locator
    private readonly btn_Vote: Locator

    constructor(page: Page){
        super(page)

        this.txt_model_header = this.getLocator(`(//div[@class = 'row'])[3]/h3`)
        this.txa_comment = this.getLocator(`//textarea[@id="comment"]`)
        this.btn_Vote = this.getLocator(`//button[text()='Vote!']`)
    }

    async verifyNavigatedToCorrectModel(modelName: string){
        await this.expectToHaveText(this.txt_model_header, modelName)
    }

    async addComment(comment: string){
        await this.fill(this.txa_comment, comment)
    }

    async clickBtnVote(){
        await this.click(this.btn_Vote)
    }

    async verifyCommentAdded(){
        const successLocator = await this.getElementContainingText('Thank you for your vote!')
        await this.expectToBeVisible(successLocator)
    }

    async verifyCommentOnTopOfReviewTable(expectedComment: string){
        await this.expectToHaveText(`(//table//tr)[1]/td[last()]`, expectedComment)
    }
}