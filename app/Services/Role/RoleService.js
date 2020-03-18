/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('Role');

class RoleService {
  static async checkRoleExistAndReturn(id) {
    const role = await Role.find(id);
    if (!role) {
      return undefined;
    }
    return role;
  }
}

module.exports = RoleService;
