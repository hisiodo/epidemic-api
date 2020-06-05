class CheckRequest {
  async handle({ request }, next) {
    console.log(request);
    await next();
  }
}
module.exports = CheckRequest;
