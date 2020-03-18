/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('Role');

class RoleController {
  async index({ response }) {
    const roles = await Role.query()
      .with('permissions')
      .fetch();

    return response.status(200).json({ roles });
  }

  async show({ response, params }) {
    const role = await Role.findOrFail(params.id);
    if (!role) {
      return response.status(400).json({ error: 'Role does not exist' });
    }
    await role.load('permissions');

    return response.status(200).json({ role });
  }

  async store({ request, response }) {
    const { permissions, ...data } = request.only([
      'name',
      'slug',
      'description',
      'permissions',
    ]);
    const role = await Role.create(data);
    if (permissions) {
      await role.permissions().attach(permissions);
    }
    await role.load('permissions');
    return response.status(201).json({ role });
  }

  async update({ request, response, params }) {
    const { permissions, ...data } = request.only([
      'name',
      'slug',
      'description',
      'permissions',
    ]);
    const role = await Role.findOrFail(params.id);
    if (!role) {
      return response.status(400).json({ error: 'Role does not exist' });
    }
    role.merge(data);
    await role.save();

    if (permissions) {
      await role.permissions().sync(permissions);
    }
    await role.load('permissions');
    return role;
  }

  async destroy({ response, params }) {
    const role = await Role.findOrFail(params.id);
    if (!role) {
      return response.status(400).json({ error: 'Role does not exist' });
    }

    await role.delete();
    return response.status(204).json({ ok: 'Role deleted ' });
  }
}

module.exports = RoleController;
