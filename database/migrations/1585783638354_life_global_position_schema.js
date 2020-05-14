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
        .on('lifes');
      table
        .integer('global_position_id')
        .unsigned()
        .references('id')
        .on('global_positions');
      table.timestamps();
    });
  }

  down() {
    this.drop('life_global_positions');
  }
}

module.exports = LifeGlobalPositionSchema;
