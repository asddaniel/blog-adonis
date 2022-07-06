/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
Route.get('/accueil', 'AppsController.index').as('accueil');
Route.get('/article/:id', 'AppsController.show').as('vue_article');
Route.post('/article/:id', 'AppsController.update').as('update_article');
Route.delete('/article/:id', 'AppsController.destroy').as('supprimer');
Route.get('/modifier/:id', 'AppsController.edit').as('modifier');
Route.get('/creation_article', 'AppsController.creation_article').as('creation_article');
Route.post('/cree_article', 'AppsController.create').as('cree_article');
