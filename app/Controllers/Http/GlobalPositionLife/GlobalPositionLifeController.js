/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const GlobalPosition = use('App/Models/GlobalPosition');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Life = use('App/Models/Life');
class GlobalLifePositionController {
  async index() {
    const lives_positions = await Life.query()
      .with('positions')
      .fetch();

    return lives_positions;
  }

  async show({ params }) {
    const { id } = params;
    const life = await Life.find(id);

    await life.load('positions');
    return [life];
  }

  async store({ request, response, auth }) {
    const { positions } = request.all();

    const { user } = auth;
    const life = await Life.findBy({ user_id: user.id });

    console.log(life);

    const globalPosition = await GlobalPosition.createMany(positions);
    console.log(globalPosition);

    await life.positions().saveMany(globalPosition);

    await life.load('positions');

    return response.status(201).json({ life });
  }
}

module.exports = GlobalLifePositionController;
