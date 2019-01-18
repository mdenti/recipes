function snakeToCamelCase(value) {
  return value.replace(/_\w/g, m => m[1].toUpperCase());
}

function objectSnakeToCamelCaseProperties(obj) {
  if (Array.isArray(obj)) {
    return obj.map(row => objectSnakeToCamelCaseProperties(row));
  }

  return Object.keys(obj).reduce((prevObj, prop) => {
    const newObj = Object.assign({}, prevObj, { [snakeToCamelCase(prop)]: obj[prop] });
    return newObj;
  }, {});
}

function camelToSnakeCase(value) {
  return value.replace(/[A-Z]/g, m => `_${m.toLowerCase()}`);
}

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
    wrapIdentifier: (value, origImpl) => origImpl(camelToSnakeCase(value)),
    postProcessResponse: result => objectSnakeToCamelCaseProperties(result),
  },
};
