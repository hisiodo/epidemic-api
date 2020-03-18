const Permission = use('Permission');

class PermissionController {
  async index({ response }) {
    const permissions = await Permission.all();
    return response.status(200).json({ permissions });
  }

  async show({ response, params }) {
    const permission = await Permission.findOrFail(params.id);

    if (!permission) {
      return response.status(400).json({ error: 'Permision does not exist ' });
    }

    return response.status(200).json({ permission });
  }

  async store({ request }) {
    const dataPermissionRequest = request.only(['name', 'slug', 'description']);

    const permission = await Permission.create(dataPermissionRequest);

    return permission;
  }

  async update({ request, response, params }) {
    const dataPermissionRequest = request.only(['name', 'slug', 'description']);

    const permission = await Permission.findOrFail(params.id);

    if (!permission) {
      return response.status(400).json({ error: 'Permision does not exist ' });
    }

    permission.merge(dataPermissionRequest);
    await permission.save();
    return permission;
  }

  async destroy({ response, params }) {
    const permission = await Permission.findOrFail(params.id);

    if (!permission) {
      return response.status(400).json({ error: 'Permision does not exist ' });
    }

    await permission.delete();
    return response.status(204).json({ ok: 'Permission deleted' });
  }
}

module.exports = PermissionController;
