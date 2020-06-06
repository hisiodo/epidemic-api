/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LifeGlobalPositionSchema extends Schema {
  up() {
    this.create('life_global_positions', table => {
      table.increments();
      table
        .integer('life_id')
        .unsigned()
        .references('id')
        .on('lives');
      table
        .integer('global_position_id')
        .unsigned()
        .references('id')
        .on('global_positions');
      table.timestamp('created_at', { useTz: true }).defaultTo(this.fn.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.fn.now());
    });
  }

  down() {
    this.drop('life_global_positions');
  }
}

module.exports = LifeGlobalPositionSchema;
