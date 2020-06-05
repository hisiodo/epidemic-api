/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class LifeGlobalPosition extends Model {
  static boot() {
    super.boot();
  }

  positions() {
    return this.belongsTo('App/Models/GlobalPosition');
  }

  lives() {
    return this.belongsTo('App/Models/Life');
  }
}

module.exports = LifeGlobalPosition;
