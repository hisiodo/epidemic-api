/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Permission = use('Permission');

class PermissionSeeder {
  async run() {
    await Promise.all([
      await Permission.create({
        slug: 'create_permission',
        name: 'Create Permissions',
        description: 'Create Permissions',
      }),
      await Permission.create({
        slug: 'update_permission',
        name: 'Update Permissions',
        description: 'Update Permissions',
      }),
      await Permission.create({
        slug: 'delete_permission',
        name: 'Delete Permissions',
        description: 'Delete Permissions',
      }),
      await Permission.create({
        slug: 'read_permission',
        name: 'Read Permissions',
        description: 'Read Permissions',
      }),
      await Permission.create({
        slug: 'create_roles',
        name: 'Create Roles',
        description: 'Create Roles',
      }),
      await Permission.create({
        slug: 'update_roles',
        name: 'Update Roles',
        description: 'Update Roles',
      }),
      await Permission.create({
        slug: 'delete_roles',
        name: 'Delete Roles',
        description: 'Delete Roles',
      }),
      await Permission.create({
        slug: 'read_roles',
        name: 'Read Roles',
        description: 'Read Roles',
      }),
    ]);
  }
}

module.exports = PermissionSeeder;
