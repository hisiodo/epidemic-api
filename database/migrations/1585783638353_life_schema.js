/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LifeSchema extends Schema {
  up() {
    this.create('lives', table => {
      table.increments();
      table.string('health_status', 100).notNullable();
      table.date('quarantine_date');
      table.string('comorbidity', 255).notNullable();
      table.string('details', 255).notNullable();
      table.integer('days_to_repeat_exam').unsigned();
      table
        .integer('user_id')
        .unsigned()
        .index()
        .references('id')
        .on('users')
        .onDelete('CASCADE');
      table.timestamps();
      table
        .integer('home_position_id')
        .unsigned()
        .index()
        .references('id')
        .inTable('global_positions')
        .onDelete('CASCADE');
    });
  }

  down() {
    this.drop('lives');
  }
}

module.exports = LifeSchema;
