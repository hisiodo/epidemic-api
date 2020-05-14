/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async index({ response }) {
    const users = await User.all();
    return response.status(200).json({ users });
  }

  async show({ response, params }) {
    const user = await User.findOrFail(params.id);
    if (!user) {
      return response.status(400).json({ error: 'User does not exist' });
    }
    await user.loadMany(['roles', 'permissions']);
    return response.status(200).json({ user });
  }

  async store({ request, response }) {
    const { permissions, roles, ...data } = request.only([
      'email',
      'password',
      'permissions',
      'roles',
      'name',
      'identifier',
    ]);

    console.log({ permissions, roles, ...data });

    const user = await User.create(data);

    if (roles) {
      await user.roles().attach(roles);
    }

    if (permissions) {
      await user.permissions().attach(permissions);
    }

    await user.loadMany(['roles', 'permissions']);

    return response.status(201).json({ user });
  }

  async update({ request, response, params }) {
    const { permissions, roles, ...dataRequest } = request.only([
      'email',
      'password',
      'permissions',
      'roles',
      'name',
      'identifier',
    ]);
    if (!dataRequest) {
      return response.status(400).send({ error: 'Dados não enviados' });
    }
    const user = await User.findOrFail(params.id);
    if (!user) {
      return response.status(400).json({ error: 'User does not exist' });
    }

    if (roles) {
      await user.roles().sync(roles);
    }

    if (permissions) {
      await user.permissions().sync(permissions);
    }
    user.merge(dataRequest);
    await user.save();
    await user.loadMany(['roles', 'permissions']);

    return response.status(200).json({ user });
  }

  async destroy({ response, params }) {
    const user = await User.findOrFail(params.id);
    if (!user) {
      return response.status(400).json({ error: 'User does not exist' });
    }
    await user.delete();
    return response.status(200).json({ delete: 'User deleted with sucess' });
  }
}

module.exports = UserController;
