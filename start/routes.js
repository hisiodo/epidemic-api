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
    .except(['update'])
    .middleware(['auth'])
    .apiOnly();
  // .validator(new Map([[['lives.store'], ['User/StoreUser']]]))
});
Route.put(
  'lives/symptoms/:id',
  'Life/LifeController.updateSymptoms'
).middleware(['auth']);
Route.put('lives/:id', 'Life/LifeController.update').middleware(['auth']);

Route.group(() => {
  Route.resource('sessions', 'Session/SessionController')
    .validator(new Map([[['sessions.store'], ['Session/StoreSession']]]))
    .apiOnly();
});

Route.group(() => {
  Route.resource(
    'life_positions',
    'CurrentPositionLife/CurrentPositionLifeController'
  )
    .except(['show'])
    .middleware(['auth'])
    .validator(
      new Map([
        [['users.store'], ['CurrentPositionLife/StoreGlobalPositionLife']],
      ])
    )
    .apiOnly();
});

Route.get(
  'life_positions/:id',
  'CurrentPositionLife/CurrentPositionLifeController.show'
).middleware(['auth']);

Route.put('profiles/:id', 'Profile/ProfileController.update').middleware([
  'auth',
]);

Route.group(() => {
  Route.resource('permissions', 'Permission/PermissionController').apiOnly();
}).middleware(['auth', 'is: administrator']);

Route.group(() => {
  Route.resource('roles', 'Role/RoleController').apiOnly();
}).middleware(['auth', 'is: administrator']);
