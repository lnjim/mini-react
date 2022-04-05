// Exemple d'appel asynchrone xhr via l'api https://jsonplaceholder.typicode.com/todos/1
const xhrasync = new XMLHttpRequest();
xhrasync.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true);
xhrasync.onload = function () {
  console.log("xhrasync", xhrasync.responseText);
  console.log("xhrasync", xhrasync.status);
  document
    .getElementById("root")
    .appendChild(
      document.createTextNode(
        "async " + xhrasync.status + " " + xhrasync.responseText
      )
    );
};
xhrasync.send();

// Exemple d'appel synchrone xhr via l'api https://jsonplaceholder.typicode.com/todos/1
const xhrsync = new XMLHttpRequest();
xhrsync.open("GET", "https://jsonplaceholder.typicode.com/todos/1", false);
xhrsync.send();
console.log("xhrsync", xhrsync.responseText);
console.log("xhrsync", xhrsync.status);
document
  .getElementById("root")
  .appendChild(
    document.createTextNode(
      "sync " + xhrsync.status + " " + xhrsync.responseText
    )
  );

function axios(url, options) {
  return new Promise(function (res, rejec) {
    const xhrasync = new XMLHttpRequest();
    // interceptor request
    xhrasync.open(options.method, url, true);
    xhrasync.onload = function () {
      // interceptor response
      if (xhrasync.status >= 400) {
        rejec({ response: xhrasync.responseText, status: xhrasync.status });
      } else {
        res({ response: xhrasync.responseText, status: xhrasync.status });
      }
    };
    xhrasync.send();
  });
}
