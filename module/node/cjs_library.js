exports.ucfirst = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.capitalize = function (str) {
  return str.split(" ").map(exports.ucfirst).join(" ");
};

exports.myValue = {};

/**
 * module.exports = {ucfirst: ucfirst, capitalize: capitalize, myValue: myValue};
 */
/**
 * module.exports = ucfirst;
 */
