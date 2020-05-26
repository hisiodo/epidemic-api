/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const GlobalPosition = use('App/Models/GlobalPosition');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Profile = use('App/Models/Profile');

class Generator {
  static async generateUser(data, transaction) {
    const { user } = data;
    const { profile } = data;
    try {
      const userInstance = await User.create(user, transaction);
      await userInstance.roles().attach([3], null, transaction);

      await Profile.create(
        { ...profile, user_id: userInstance.id },
        transaction
      );

      return userInstance;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async generateHomePosition(data, transaction) {
    const { home_position } = data;

    try {
      const homePosition = await GlobalPosition.create(
        home_position,
        transaction
      );

      return homePosition;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Generator;
