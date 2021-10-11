import { browser, by, element, ElementFinder  } from 'protractor';

export class PruebaLoginPage {

  emailInput: ElementFinder;
  passwordInput: ElementFinder;
  loginButton: ElementFinder;

  constructor(){
    this.emailInput = element(by.name('email'));
    this.passwordInput = element(by.name('password'));
    this.loginButton = element(by.id('login-button'));
  }

  clickLoginButton(): Promise<void>{
    return this.loginButton.click() as Promise<void>;
  }

  setUsername(username: string){
    this.emailInput.clear();
    return this.emailInput.sendKeys(username) as Promise<void>;
  }

  getUsername(): Promise<string>{
    return this.emailInput.getAttribute('value') as Promise<string>;
  }

  setPassword(password: string){
    this.passwordInput.clear();
    return this.passwordInput.sendKeys(password) as Promise<void>;
  }

  getPassword(): Promise<string>{
    return this.passwordInput.getAttribute('value') as Promise<string>;
  }
}
