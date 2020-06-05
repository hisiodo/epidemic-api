/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments();
      table.string('email', 254).unique();
      table
        .string('identifier', 254)
        .unique()
        .notNullable();
      table.string('name', 100).notNullable();
      table.string('password', 60).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
