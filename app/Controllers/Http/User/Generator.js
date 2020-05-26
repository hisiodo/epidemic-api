/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Profile = use('App/Models/Profile');

class Generator {
  static async generateUserProfile(data, transaction) {
    const { userRequest } = data;
    const { email, name, identifier, password } = userRequest;
    const { profile } = data;

    try {
      const userInstance = await User.create(
        { email, name, identifier, password },
        transaction
      );

      await userInstance.roles().attach(userRequest.roles, null, transaction);

      if (userRequest.permissions) {
        await userInstance
          .permissions()
          .attach(userRequest.permissions, null, transaction);
      }
      console.log(userInstance);

      await Profile.create(
        { ...profile, user_id: userInstance.id },
        transaction
      );

      return userInstance;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Generator;
