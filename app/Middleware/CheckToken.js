/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CheckToken {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, auth, response }, next) {
    if (request.url() !== '/sessions') {
      try {
        await auth.check();
      } catch (error) {
        return response
          .status(400)
          .json({ error: 'Token inválido ou não fornecido' });
      }
    }

    await next();
  }
}

module.exports = CheckToken;
