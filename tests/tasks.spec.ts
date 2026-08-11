import { test, expect } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';
import { deleteTaskByName, postTask } from './support/helpers';
import { TaskPage } from './support/pages/tasks';

test('deve poder cadastrar uma nova tarefa', async ({ page, request }) => {

  const task: TaskModel = {
    name: 'Ler um livro de typeScript',
    is_done: false
  }

  await deleteTaskByName(request, task.name);

  const taskPage: TaskPage = new TaskPage(page);
  await taskPage.go();
  await taskPage.create(task);
  await taskPage.shouldHaveText(task.name);
  
})

test('não deve permitir tarefa duplicada', async ({ page, request }) => {

  const task: TaskModel = {
    name: 'Comprar Ketchup',
    is_done: false
  }

  await deleteTaskByName(request, task.name);
  await postTask(request, task);


  const taskPage: TaskPage = new TaskPage(page);
  await taskPage.go();
  await taskPage.create(task);

  await taskPage.alertHaveText('Task already exists!')

})

test('campo obrigatório', async ({ page }) => {

  const task: TaskModel = {
    name: '',
    is_done: false
  }

  const taskPage: TaskPage = new TaskPage(page);
  await taskPage.go();
  await taskPage.create(task);

  
  const validationMessage = await taskPage.inputTaskName.evaluate((e) => (e as HTMLInputElement).validationMessage);
  expect(validationMessage).toEqual('This is a required field');
  
})

