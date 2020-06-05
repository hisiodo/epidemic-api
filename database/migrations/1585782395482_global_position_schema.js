/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class GlobalPositionSchema extends Schema {
  up() {
    this.create('global_positions', table => {
      table.increments();
      table.string('latitude', 100).notNullable();
      table.string('longitude', 100).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('global_positions');
  }
}

module.exports = GlobalPositionSchema;
