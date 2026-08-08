import {test, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';

test('deve poder cadastrar uma nova tarefa', async ({page})=> {
   await page.goto('http://localhost:8080');   
   
   const inputTaskName = page.locator('input[class*=InputNewTask]');
   //await inputTaskName.fill('Ler um livro de typeScript');
   await inputTaskName.fill(faker.lorem.words());
   //await page.click('xpath=//button[contains(text(), "Create")]');
   await page.click('css=button >> text=Create');
  

   //button[contains(text(), "Create")]
   //await page.fill('input[class*=InputNewTask]', 'Ler um livro de typeScript');
});