/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProfileSchema extends Schema {
  up() {
    this.create('profiles', table => {
      table.increments();
      table.string('name', 100).notNullable();
      table.string('last_name', 100).notNullable();
      table.string('phone', 100).notNullable();
      table.string('gender', 10);
      table.date('birth_date');
      table.string('cpf', 254).unique();
      table
        .integer('user_id')
        .unsigned()
        .index()
        .references('id')
        .on('users')
        .onDelete('cascade');
      table.timestamps();
    });
  }

  down() {
    this.drop('profiles');
  }
}

module.exports = ProfileSchema;
