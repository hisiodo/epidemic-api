/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Life extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
  }

  user() {
    return this.belongsTo('App/Models/User', 'user_id', 'id');
  }

  positions() {
    return this.belongsToMany('App/Models/GlobalPosition').pivotModel(
      'App/Models/LifeGlobalPosition'
    );
  }

  homePosition() {
    return this.belongsTo(
      'App/Models/GlobalPosition',
      'home_position_id',
      'id'
    );
  }
}

module.exports = Life;
