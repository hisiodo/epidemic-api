/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.resource('users', 'User/UserController')
    .validator(new Map([[['users.store'], ['User/StoreUser']]]))
    .apiOnly();
});

Route.group(() => {
  Route.resource('sessions', 'Session/SessionController')
    .validator(new Map([[['sessions.store'], ['Session/StoreSession']]]))
    .apiOnly();
});

Route.group(() => {
  Route.resource('sellers', 'Seller/SellerController')
    .except(['show', 'update'])
    .validator(
      new Map([
        [['sellers.store'], ['Seller/StoreSeller']],
        [['sellers.update'], ['Seller/UpdateSeller']],
      ])
    )
    .apiOnly();
}).middleware(['auth', 'is:(administrator||moderator)']);

Route.put('/sellers/:id', 'Seller/SellerController.update').middleware([
  'auth',
  'is:(administrator||moderator||seller)',
]);

Route.get('/sellers/:id', 'Seller/SellerController.show').middleware([
  'auth',
  'is:(administrator||moderator||seller)',
]);

Route.group(() => {
  Route.resource('companies', 'Company/CompanyController')
    .except(['show'])
    .validator(
      new Map([
        [['companies.store'], ['Company/StoreCompany']],
        [['companies.update'], ['Company/UpdateCompany']],
      ])
    )
    .apiOnly();
}).middleware(['auth', 'is:(administrator||moderator)']);

Route.get('/companies/:id', 'Company/CompanyController.show').middleware([
  'auth',
  'is:(administrator||moderator||seller)',
]);

Route.group(() => {
  Route.resource('leftovers', 'Leftover/LeftoverController')
    .except(['show', 'update'])
    .validator(new Map([[['sellers.store'], ['Seller/StoreLeftOver']]]))
    .apiOnly();
}).middleware(['auth', 'is:(administrator||modarator)']);

Route.get('/leftovers/:id', 'Leftover/LeftoverController.show').middleware([
  'auth',
  'is:(administrator||moderator||seller)',
]);

Route.put('/leftovers/:id', 'Leftover/LeftoverController.update').middleware([
  'auth',
  'is:(administrator||moderator||seller)',
]);

Route.group(() => {
  Route.resource('permissions', 'Permission/PermissionController').apiOnly();
}).middleware(['auth', 'is: administrator']);

Route.group(() => {
  Route.resource('roles', 'Role/RoleController').apiOnly();
}).middleware(['auth', 'is: administrator']);
