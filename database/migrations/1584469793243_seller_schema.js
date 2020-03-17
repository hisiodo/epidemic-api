/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SellerSchema extends Schema {
  up() {
    this.create('sellers', table => {
      table.increments();
      table.timestamps();
      table.string('name', 50).notNullable();
      table.string('lastName', 50).notNullable();
      table
        .integer('company_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('companies');
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users');
    });
  }

  down() {
    this.drop('sellers');
  }
}

module.exports = SellerSchema;
