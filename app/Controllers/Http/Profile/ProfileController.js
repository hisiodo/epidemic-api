/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Profile = use('App/Models/Profile');

class ProfileController {
  async update({ request, response, auth }) {
    const { global_positions, ...data } = request.data();

    const profile = await Profile.create(data);

    await profile.user().associate(auth.user);

    return response.status(201).json({ profile });
  }
}

module.exports = ProfileController;
