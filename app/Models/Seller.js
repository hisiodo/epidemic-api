/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const LeftOverService = require('../Services/LeftOverService');
// TODO: quando o vendedor for criado, deve-se associa-lo
// a um usuário pré definido ou já recuperado do ShopCOntrol9
class Seller extends Model {
  static boot() {
    super.boot();

    this.addHook('afterCreate', async userInstance => {
      LeftOverService.store(userInstance.id);
    });
  }

  user() {
    return this.belongsTo('App/Models/User', 'user_id', 'id');
  }

  company() {
    return this.belongsTo('App/Models/Company', 'company_id', 'id');
  }

  leftover() {
    return this.hasOne('App/Models/LeftOver');
  }
}
module.exports = Seller;
