/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CompanySchema extends Schema {
  up() {
    this.create('companies', table => {
      table.increments();
      table.timestamps();
      table.string('social_name', 100).notNullable();
      table
        .string('social_number', 100)
        .notNullable()
        .unique();
    });
  }

  down() {
    this.drop('companies');
  }
}

module.exports = CompanySchema;
