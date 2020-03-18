/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('Role');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Permission = use('Permission');

class RoleSeeder {
  async run() {
    const permissions = await Permission.all();

    const role = await Role.create({
      slug: 'administrator',
      name: 'Administrator',
      description: 'System Administrator',
    });
    await role.permissions().attach(permissions);
  }
}

module.exports = RoleSeeder;
