import { Page } from '@playwright/test';

export class LoginPage {

    private page: Page;
    private usernameInput;
    private passwordInput;
    private loginButton;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = this.page.getByPlaceholder('Username');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });

    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}