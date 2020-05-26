/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Profile = use('App/Models/Profile');

class ProfileController {
  async update({ request, response, params }) {
    const dataProfileUpdate = request.all();

    const profile = await Profile.find(params.id);

    if (!profile) {
      return response.status(400).json({ error: 'Perfil Inexistente' });
    }

    await profile.merge(dataProfileUpdate);

    await profile.user().associate(profile.user_id);

    return response.status(201).json({ profile });
  }
}

module.exports = ProfileController;
