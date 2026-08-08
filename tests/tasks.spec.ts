import {test, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';

test('deve poder cadastrar uma nova tarefa', async ({page, request })=> {
   const taskName = 'Ler um livro de typeScript';
  
   await request.delete('http://localhost:3333/helper/tasks/' + taskName);

   await page.goto('http://localhost:8080');   
   
   const inputTaskName = page.locator('input[class*=InputNewTask]');
   await inputTaskName.fill(taskName);
   //await inputTaskName.fill(faker.lorem.words());
   //await page.click('xpath=//button[contains(text(), "Create")]');
   await page.click('css=button >> text=Create');
  

   //button[contains(text(), "Create")]
   //await page.fill('input[class*=InputNewTask]', 'Ler um livro de typeScript');
});