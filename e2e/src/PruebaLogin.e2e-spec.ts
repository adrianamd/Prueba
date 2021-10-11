import { PruebaLoginPage } from './PruebaLogin.po';
import { browser, element, by, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { API } from './API';

const origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function stop() {
  const args = arguments;

  origFn.call(browser.driver.controlFlow(), () => {
    return protractor.promise.delayed(60);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};
describe('Realiza el Inicio de Sesion Correctamente', () => {
  let loginP: PruebaLoginPage
  let APICA: API;
  const fs = require('fs');

  beforeEach(() => {
    loginP = new PruebaLoginPage();
    APICA = new API();
  });

  const EC = browser.ExpectedConditions;
  const credentials = [
    {
      username: 'mode.adri13@gmail.com',
      passwrd: 'MolinaD1989',
      result: true,
    },
  ];

  // esta funcion realiza el inicio de sesion en la aplicacion 
  async function login(username: string, password: string) {
    browser.driver.manage().window().maximize();
    await browser.get('https://api.octoperf.com/app/');
    await browser.waitForAngularEnabled(false);
    await loginP.setUsername(username);
    await loginP.setPassword(password);
    loginP.clickLoginButton();
    await browser.sleep(10000)
  }
  
  // esta funcion dice cuando ya se tiene el acceso a la segunda pagina de la aplicación 
  async function access(ide: string, value: number) {
    await browser.wait(EC.visibilityOf(element(by.id(ide))));
    const valueInput: ElementFinder = await element(by.id(ide));
    valueInput.clear();
    valueInput.sendKeys(value);
  }

  //esta funcion dice cuando las credenciales fueron correctas o no 
  credentials.forEach((obj, index) => {
    it(`${index} It is expected that with the credentials ${obj.username} and ${obj.passwrd}: ${obj.result}`, async () => {
      if (obj.result) {
        await login(obj.username, obj.passwrd);
        await browser.waitForAngularEnabled(false);
        console.log('Entre'); //imprime en consola si inicio sesion correctamente 

      
        //peticion del token 
       let info =  await APICA.recuperarInf();
       console.log('Informacion: ', info);

      } else {
        await login(obj.username, obj.passwrd);
        console.log('No Entre'); //imprime en consola si no inicio sesion correctamente 
      }
    });
  });

});
