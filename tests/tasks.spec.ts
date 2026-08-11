import { test } from '@playwright/test';
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

