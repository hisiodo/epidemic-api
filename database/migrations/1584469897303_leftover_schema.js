/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LeftoverSchema extends Schema {
  up() {
    this.create('leftovers', table => {
      table.increments();
      table.timestamps();
      table.float('value', { precision: 2 });
      table
        .integer('seller_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sellers');
    });
  }

  down() {
    this.drop('leftovers');
  }
}

module.exports = LeftoverSchema;
