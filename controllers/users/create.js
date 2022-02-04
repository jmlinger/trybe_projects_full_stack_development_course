const Services = require('../../services/users');

module.exports = async (req, res, _next) => {
  const user = req.body;

  const result = await Services.create(user);

  return res.status(result.status)
    .json(result.message.length < 100
      ? { message: result.message }
      : { token: result.message });
};
