const { StatusCodes } = require('http-status-codes');

const INVALID_ENTRIES = (message) => ({
    status: StatusCodes.BAD_REQUEST,
    message,
});

const ALREADY_REGISTERED = {
  status: StatusCodes.CONFLICT,
  message: 'User already registered',
};

const INVALID_FIELDS = {
  status: StatusCodes.BAD_REQUEST,
  message: 'Invalid fields',
};

const USER_NOT_EXIST = {
  status: StatusCodes.NOT_FOUND,
  message: 'User does not exist',
};

const POST_NOT_EXIST = {
  status: StatusCodes.NOT_FOUND,
  message: 'Post does not exist',
};

const CATEGORIES_NOT_FOUND = {
  status: StatusCodes.BAD_REQUEST,
  message: '"categoryIds" not found',
};

module.exports = {
  INVALID_ENTRIES,
  ALREADY_REGISTERED,
  INVALID_FIELDS,
  USER_NOT_EXIST,
  CATEGORIES_NOT_FOUND,
  POST_NOT_EXIST,
};
