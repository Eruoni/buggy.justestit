import { chromium, firefox, LaunchOptions } from "@playwright/test"

const options: LaunchOptions = {
    headless: true
}

export const invokeBrowser = () => {
    const browserType = "chrome"
    switch (browserType.toLocaleLowerCase()){
        case "chrome":
            chromium.launch(options)
            break
        case "firefox":
            firefox.launch(options)
            break
        default:
            throw new Error('Unsupported browsers...')
    }
}