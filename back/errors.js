class InputError extends Error {}
InputError.prototype.statusCode = 400;

class UnauthenticatedError extends Error {}
UnauthenticatedError.prototype.statusCode = 401;

class UnauthorizedError extends Error {}
UnauthorizedError.prototype.statusCode = 403;

class NotFoundError extends Error {}
NotFoundError.prototype.statusCode = 404;

module.exports = {
  InputError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
};
