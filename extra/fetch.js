// Exemple d'appel asynchrone fetch via l'api https://jsonplaceholder.typicode.com/todos/1
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((data) => {
    console.log("fetch", data);
    document
      .getElementById("root")
      .appendChild(
        document.createTextNode("fetch " + data.id + " " + data.title)
      );
  });

function axios(url, options) {
  // interceptor request
  return fetch(url, options).then((response) => {
    // interceptor response
    if (response.headers.get("Content-Type") === "application/json")
      return response.json();
    return response.text();
  });
}
