/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Profile extends Model {
  static boot() {
    super.boot();
  }

  user() {
    return this.belongsTo('App/Models/User', 'user_id', 'id');
  }
}

module.exports = Profile;
