import { test, expect } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';



test('deve poder cadastrar uma nova tarefa', async ({ page, request }) => {

  const task: TaskModel = {
    name: 'Ler um livro de typeScript',
    is_done: false
  }

  await request.delete('http://localhost:3333/helper/tasks/' + task.name);

  
  await page.goto('http://localhost:8080');


  const inputTaskName = page.locator('input[class*=InputNewTask]');
  await inputTaskName.fill(task.name);
  //await inputTaskName.fill(faker.lorem.words());
  //await page.click('xpath=//button[contains(text(), "Create")]');
  await page.click('css=button >> text=Create');

 
  // const target = page.locator('.task-item');
  const target = page.locator(`css=.task-item p >> text=${task.name}`)
  await expect(target).toBeVisible()
})

test.only('não deve permitir tarefa duplicada', async ({ page, request }) => {

  const task: TaskModel = {
    name: 'Comprar Ketchup',
    is_done: false
  }

  await request.delete('http://localhost:3333/helper/tasks/' + task.name);

  const newTask = await request.post('http://localhost:3333/tasks', { data: task });
  expect(newTask.ok()).toBeTruthy();

  await page.goto('http://localhost:8080');

  const inputTaskName = page.locator('input[class*=InputNewTask]');
  await inputTaskName.fill(task.name);

  await page.click('css=button >> text=Create');

  const target = page.locator('.swal2-html-container')
  await expect(target).toHaveText('Task already exists!')

})