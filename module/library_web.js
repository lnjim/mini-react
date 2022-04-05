export const ucfirst = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalize = function (str) {
  return str.split(" ").map(ucfirst).join(" ");
};

const myValue = {};
export default myValue;
