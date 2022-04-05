/**
 * options: {
 * method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS",
 * headers
 * body
 * interceptors: {
 *  request
 *  response
 * }
 * errorHandler
 * }
 */

function axios(
  url,
  {
    method = "GET",
    headers = {},
    body = null,
    interceptors: {
      request: irequest = () => {},
      response: iresponse = () => {},
    } = {},
    errorHandler = (e) => console.error(e),
  }
) {
  return new Promise(function (res, rejec) {
    const xhrasync = new XMLHttpRequest();
    // interceptor request
    irequest(xhrasync);
    xhrasync.open(method, url, true);
    for (let header in headers) {
      xhrasync.setRequestHeader(header, headers[header]);
    }
    xhrasync.onload = function () {
      // interceptor response
      iresponse(xhrasync);
      if (xhrasync.status >= 400) {
        errorHandler(xhrasync);
        rejec({ response: xhrasync.responseText, status: xhrasync.status });
      } else {
        res({ response: xhrasync.responseText, status: xhrasync.status });
      }
    };
    if (body) {
      xhrasync.send(body);
    } else xhrasync.send();
  });
}
