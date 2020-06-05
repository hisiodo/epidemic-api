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

// /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// const Permission = use('Permission');

class RoleSeeder {
  async run() {
    // const permissionsData = await Permission.all();

    await Promise.all([
      await Role.create({
        slug: 'administrator',
        name: 'Administrator',
        description: 'System Administrator',
      }),
      await Role.create({
        slug: 'apidemic-agent',
        name: 'Epidemic Agent',
        description: 'Epidemic Agent',
      }),
      await Role.create({
        slug: 'life',
        name: 'Life Monitored',
        description: 'Life Monitored',
      }),
    ]);
  }
}

module.exports = RoleSeeder;
