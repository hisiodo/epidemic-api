/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Life = use('App/Models/Life');
const Database = use('Database');
const Profile = use('App/Models/Profile');

const generator = require('./Generator');
const formatDate = require('../../../utils/Utils');

class LifeController {
  async index({ response, request }) {
    const page = request.input('page');
    const lives = await Life.query()
      .with('homePosition')
      .with('user')
      .with('positions')
      .paginate(page, 30);

    const livesFiltered = async () => {
      return Promise.all(
        lives.toJSON().data.map(async live => {
          const profile = await Profile.findBy('user_id', `${live.user.id}`);

          const positions = [live.positions[live.positions.length - 1]];
          return { ...live, positions, profile };
        })
      );
    };

    const livesChanged = await livesFiltered();

    return response.status(200).json(livesChanged);
  }

  async show({ response, params, request }) {
    let date = request.input('date');
    const lifeId = params.id;
    try {
      const life = await Life.query()
        .where({ id: lifeId })
        .with('user')
        .with('homePosition')
        .with('positions')
        .fetch();
      if (!request.input('date')) {
        date = formatDate(new Date());
      }

      const positions = [
        ...life
          .toJSON()[0]
          .positions.filter(
            position => position.created_at.split(' ')[0] === date
          ),
      ];
      const lifeShow = { ...life.toJSON()[0], positions };

      return response.status(200).json({ life: lifeShow });
    } catch (error) {
      if (error.message.includes('undefined')) {
        return response.status(400).json({ error: 'Vida inexistente' });
      }
      return response.status(400).json({ error: 'sua requisição falhou ' });
    }
  }

  async store({ request, response }) {
    const lifeDataRequest = request.all();
    const lifeTransaction = await Database.beginTransaction();
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
      await lifeTransaction.commit();
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

  async updateSymptoms({ request, response, auth }) {
    const lifeDataRequest = request.all();
    const { user } = auth;
    const life = await Life.findBy('user_id', user.id);
    if (!life) {
      return response.status(400).json({ error: 'Vida Inexistente' });
    }

    await life.merge(lifeDataRequest);
    await life.save();

    return response.status(200).json({ ok: 'Sintomas Atualizados' });
  }

  async update({ request, response, params }) {
    const lifeDataRequest = request.all();

    const life = await Life.find(params.id);
    if (!life) {
      return response.status(400).json({ error: 'Vida Inexistente' });
    }

    await life.merge(lifeDataRequest);
    await life.save();

    return response.status(200).json({ ok: 'Vida Atualizada' });
  }
}

module.exports = LifeController;
