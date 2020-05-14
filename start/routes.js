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
    .middleware(['auth'])
    .validator(new Map([[['users.store'], ['User/StoreUser']]]))
    .apiOnly();
});

Route.group(() => {
  Route.resource('lives', 'Life/LifeController')
    // .middleware(['auth'])
    .apiOnly();
  // .validator(new Map([[['lives.store'], ['User/StoreUser']]]))
});

Route.group(() => {
  Route.resource('sessions', 'Session/SessionController')
    .validator(new Map([[['sessions.store'], ['Session/StoreSession']]]))
    .apiOnly();
});

Route.group(() => {
  Route.resource(
    'life_positions',
    'GlobalPositionLife/GlobalPositionLifeController'
  )
    .except(['show'])
    .middleware(['auth'])
    .validator(
      new Map([
        [['users.store'], ['GlobalPositionLife/StoreGlobalPositionLife']],
      ])
    )
    .apiOnly();
});

Route.get(
  'life_positions/:id',
  'GlobalPositionLife/GlobalPositionLifeController.show'
).middleware(['auth']);

// Route.group(() => {
//   Route.resource('companies', 'Company/CompanyController')
//     .except(['show'])
//     .validator(
//       new Map([
//         [['companies.store'], ['Company/StoreCompany']],
//         [['companies.update'], ['Company/UpdateCompany']],
//       ])
//     )
//     .apiOnly();
// }).middleware(['auth', 'is:(administrator||moderator)']);

// Route.get('/companies/:id', 'Company/CompanyController.show').middleware([
//   'auth',
//   'is:(administrator||moderator||seller)',
// ]);

Route.group(() => {
  Route.resource('permissions', 'Permission/PermissionController').apiOnly();
}).middleware(['auth', 'is: administrator']);

Route.group(() => {
  Route.resource('roles', 'Role/RoleController').apiOnly();
}).middleware(['auth', 'is: administrator']);
