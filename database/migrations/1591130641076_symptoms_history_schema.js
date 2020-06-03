/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SymptomsHistorySchema extends Schema {
  up() {
    this.create('symptoms_histories', table => {
      table.increments();
      table.string('status').notNullable();
      table.text('symptoms').notNullable();
      table
        .integer('life_id')
        .index()
        .references('id')
        .on('lives')
        .onDelete('CASCADE');

      table.timestamps();
    });
  }

  down() {
    this.drop('symptoms_histories');
  }
}

module.exports = SymptomsHistorySchema;
