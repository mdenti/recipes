class InputError extends Error {}
InputError.prototype.statusCode = 400;

module.exports = {
  InputError,
};
