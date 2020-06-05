/* eslint-disable no-const-assign */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Life = use('App/Models/Life');
const Database = use('Database');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Profile = use('App/Models/Profile');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const GlobalPosition = use('App/Models/GlobalPosition');
const generator = require('./Generator');
const formatDate = require('../../../utils/Utils');

class LifeController {
  async index({ response, request }) {
    const name = request.input('name') ? request.input('name') : '';

    const page = request.input('page');
    let lives = null;

    lives = await Life.query()
      .with('homePosition')
      .with('positions')
      .with('user', builder => builder.whereRaw('name like ?', [`%${name}%`]))
      .paginate(page, 30);
    console.log(lives);
    if (!lives.rows[0].user) {
      return response.status(200).json({ data: [] });
    }

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

    return response.status(200).json({ data: livesChanged });
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

      const profile = await Profile.findBy(
        'user_id',
        `${life.toJSON()[0].user.id}`
      );

      const positions = [
        ...life
          .toJSON()[0]
          .positions.filter(
            position => position.created_at.split(' ')[0] === date
          ),
      ];
      const lifeShow = { ...life.toJSON()[0], positions, profile };

      return response.status(200).json({ life: lifeShow });
    } catch (error) {
      if (error.message.includes('undefined')) {
        return response.status(400).json({ error: 'Vida inexistente' });
      }
      console.log(error);
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

  async update({ request, response, params }) {
    const data = request.all();
    const { life, user, profile, home_position } = data;

    const lifeInstance = await Life.find(params.id);

    if (!lifeInstance) {
      return response.status(400).json({ error: 'Vida Inexistente' });
    }
    const userInstanceUpdate = await User.find(user.id);

    if (userInstanceUpdate) {
      const { identifier, email } = user;
      const userAlreadyExist =
        (await User.findBy('identifier', identifier)) ||
        (await User.findBy('email', email));
      if (userAlreadyExist) {
        return response
          .status(400)
          .json({ error: 'Esse identificador já existe' });
      }
    }

    const profileInstanceUpdate = await Profile.find(profile.id);
    if (profileInstanceUpdate) {
      const { cpf } = profile;
      const profileAlreadyExist = await Profile.findBy('cpf', cpf);

      if (profileAlreadyExist) {
        return response
          .status(400)
          .json({ error: 'Este cpf já está cadastrado' });
      }
    }

    const homePorisionInstance = await GlobalPosition.find(home_position.id);
    const lifeTransaction = await Database.beginTransaction();
    console.log(profile);
    try {
      await Promise.all([
        await homePorisionInstance.merge(home_position),
        await homePorisionInstance.save(lifeTransaction),
        await userInstanceUpdate.merge(user),
        await userInstanceUpdate.save(lifeTransaction),
        await profileInstanceUpdate.merge(profile),
        await profileInstanceUpdate.save(lifeTransaction),
        await lifeInstance.merge(life),
        await lifeInstance.save(lifeTransaction),
      ]);
      await lifeTransaction.commit();
    } catch (error) {
      if (lifeTransaction === null) {
        await lifeTransaction.rollback();

        return response.status(400).json({
          erro: error,
        });
      }
      await lifeTransaction.rollback();
      return response
        .status(400)
        .json({ error: 'Dados não puderam ser atualizados' });
    }

    return response.status(200).json({ ok: 'Vida Atualizada' });
  }
}

module.exports = LifeController;
