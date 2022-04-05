const lib = require("./cjs_library");
const lib2 = require("./cjs_library");

console.log(lib.ucfirst("hello"));
console.log(lib.capitalize("hello world"));
console.log(JSON.stringify(lib.myValue));
console.log(JSON.stringify(lib2.myValue));
console.log(lib.myValue === lib2.myValue);
