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
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Profile = use('App/Models/Profile');

class UserSeeder {
  async run() {
    const role = 1;
    const user = await User.create({
      email: 'administrator@admin.com',
      identifier: 'girau',
      name: 'Administrador',
      password: 's3TOwcjeF4ePYGxHDvtGNJKTenUszo5m',
    });
    await user.roles().attach([role]);
    await Profile.create({
      last_name: 'Girau',
      phone: '99999999',
      gender: 'M',
      birth_date: '2020-05-31',
      cpf: '00000000000',
      street: 'Rua Girau',
      district: 'Girau',
      city: 'Girau',
      street_number: '0',
      user_id: user.id,
    });
  }
}

module.exports = UserSeeder;
