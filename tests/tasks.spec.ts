import {test, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';

test('deve poder cadastrar uma nova tarefa', async ({page, request })=> {

   //Dado que eu tenho uma nova tarefa
   const taskName = 'Ler um livro de typeScript';
  
   await request.delete('http://localhost:3333/helper/tasks/' + taskName);

   //E que eu acesso a aplicação
   await page.goto('http://localhost:8080');   
   
   //Quando faço o cadastro desta tarefa
   const inputTaskName = page.locator('input[class*=InputNewTask]');
   await inputTaskName.fill(taskName);
   //await inputTaskName.fill(faker.lorem.words());
   //await page.click('xpath=//button[contains(text(), "Create")]');
   await page.click('css=button >> text=Create');
  
   //Então devo ver esta tarefa na lista
   const target = page.locator('.task-item');
   await expect(target).toHaveText(taskName);
});