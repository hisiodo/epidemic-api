/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class GlobalPosition extends Model {
  static boot() {
    super.boot();
  }
}

module.exports = GlobalPosition;
