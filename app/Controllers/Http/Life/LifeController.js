/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Life = use('App/Models/Life');
const Database = use('Database');
const generator = require('./Generator');

class LifeController {
  async index({ response }) {
    const lives = await Life.query()
      .with('positions')
      .with('user')
      .fetch();
    return response.status(200).json({ lives });
  }

  async store({ request, response }) {
    const lifeDataRequest = request.all();
    const lifeTransaction = await Database.beginTransaction();
    console.log(lifeDataRequest);

    try {
      const userInstance = await generator.generateUser(
        lifeDataRequest,
        lifeTransaction
      );
      const homePositionInstance = await generator.generateHomePosition(
        lifeDataRequest,
        lifeTransaction
      );
      const { life } = lifeDataRequest;
      const lifeInstance = await Life.create(life, lifeTransaction);
      await lifeTransaction.commit();
      await lifeInstance.user().associate(userInstance);
      await lifeInstance.homePosition().associate(homePositionInstance);
      return response.status(201).json({
        data: {
          life: lifeInstance,
          user: userInstance,
          home_position: homePositionInstance,
        },
      });
    } catch (err) {
      console.log(err);
      if (lifeTransaction === null) {
        return response.status(400).json({
          error:
            'não foi possível gravar o registro dos dados, valide as informações',
        });
      }
      await lifeTransaction.rollback();
      return response.status(400).json({
        error:
          'não foi possível gravar o registro dos dados, valide as informações',
      });
    }
  }
}

module.exports = LifeController;
