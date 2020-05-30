/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
const Database = use('Database');
const generator = require('./Generator');

class UserController {
  async index({ response }) {
    const users = await User.query()
      .with('profile')
      .with('roles')
      .fetch();

    return response.status(200).json({ users });
  }

  async show({ response, params }) {
    const user = await User.find(params.id);
    if (!user) {
      return response.status(400).json({ error: 'O usuário não existe' });
    }
    await user.loadMany(['roles', 'permissions', 'profile']);
    return response.status(200).json({ user });
  }

  async store({ request, response }) {
    const userTransaction = await Database.beginTransaction();

    try {
      const { profile, ...userRequest } = request.all();

      await generator.generateUserProfile(
        { userRequest, profile },
        userTransaction
      );
      await userTransaction.commit();
      return response
        .status(201)
        .json({ ok: 'Usuário cadastrado com sucesso' });
    } catch (err) {
      console.log(err);
      if (userTransaction === null) {
        return response.status(400).json({
          error:
            'não foi possível gravar o registro dos dados, valide as informações',
        });
      }
      await userTransaction.rollback();
      return response.status(400).json({
        error:
          'não foi possível gravar o registro dos dados, valide as informações',
      });
    }
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
    const user = await User.find(params.id);
    if (!user) {
      return response.status(400).json({ error: 'Usuário não existe' });
    }

    if (roles) {
      await user.roles().sync(roles);
    }

    if (permissions) {
      await user.permissions().sync(permissions);
    }
    user.merge(dataRequest);
    await user.save();
    await user.loadMany(['roles', 'permissions', 'profile']);

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
