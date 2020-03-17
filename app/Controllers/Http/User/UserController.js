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
    return response.status(200).json({ user });
  }

  async store({ request, response }) {
    const data = request.only(['email', 'password', 'authorized']);
    const user = await User.create(data);
    return response.status(201).json({ user });
  }

  async update({ request, response, params }) {
    const dataRequest = request.all();
    if (!dataRequest) {
      return response.status(400).send({ error: 'Dados não enviados' });
    }
    const user = await User.findOrFail(params.id);
    if (!user) {
      return response.status(400).json({ error: 'User does not exist' });
    }
    await user.merge(dataRequest);
    await user.save();
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
