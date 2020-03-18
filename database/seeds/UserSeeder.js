/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserSeeder {
  async run() {
    const role = 1;
    const user = await User.create({
      email: 'administrator@admin.com',
      password: 's3TOwcjeF4ePYGxHDvtGNJKTenUszo5m',
      authorized: true,
    });
    await user.roles().attach([role]);
  }
}

module.exports = UserSeeder;
