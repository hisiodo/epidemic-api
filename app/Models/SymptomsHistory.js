/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class SymptomsHistory extends Model {
  static boot() {
    super.boot();
  }

  life() {
    return this.belongsTo('App/Models/Life', 'life_id', 'id');
  }
}

module.exports = SymptomsHistory;
