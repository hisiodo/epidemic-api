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
    .validator(
      new Map([
        [['sellers.store'], ['Seller/StoreSeller']],
        [['sellers.update'], ['Seller/UpdateSeller']],
      ])
    )
    .apiOnly();
}).middleware(['auth']);

Route.group(() => {
  Route.resource('companies', 'Company/CompanyController')
    .validator(
      new Map([
        [['companies.store'], ['Company/StoreCompany']],
        [['companies.update'], ['Company/UpdateCompany']],
      ])
    )
    .apiOnly();
}).middleware(['auth']);

Route.group(() => {
  Route.resource('leftovers', 'Leftover/LeftoverController').apiOnly();
}).middleware(['auth']);
