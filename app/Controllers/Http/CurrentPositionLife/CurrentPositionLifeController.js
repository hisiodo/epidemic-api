/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const GlobalPosition = use('App/Models/GlobalPosition');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Life = use('App/Models/Life');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

class CurrentLifePositionController {
  async store({ request, response, auth }) {
    const { positions } = request.all();
    console.log(positions);

    const { user } = auth;
    const life = await Life.findBy({ user_id: user.id });

    const globalPosition = await GlobalPosition.createMany(positions);

    await life.positions().saveMany(globalPosition);

    await life.load('positions');

    return response.status(201).json({ life });
  }
}

module.exports = CurrentLifePositionController;
