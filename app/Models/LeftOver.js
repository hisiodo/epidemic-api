/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class LeftOver extends Model {
  static boot() {
    super.boot();
  }

  static get table() {
    return 'leftovers';
  }

  seller() {
    return this.belongsTo('App/Models/Seller', 'seller_id', 'id');
  }
}

module.exports = LeftOver;
