/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
class SessionController {
  async store({ request, response, auth }) {
    const { identifier, password } = request.all();

    const { token } = await auth.attempt(identifier, password);

    const user = await User.findBy({ identifier });
    await user.load('roles');

    const { name, profile_exist, authorized, roles } = user.toJSON();

    const { slug } = roles[0];

    if (!slug) {
      return response.status(400).json({
        error: 'usuário não tem credenciais para acesso',
      });
    }
    console.log('chegou aqui');

    return response.status(200).json({
      user: { name, identifier, profile_exist, authorized, role: slug },
      token,
    });
  }
}

module.exports = SessionController;
