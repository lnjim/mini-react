const rootElem = document.getElementById("root");

function Page1() {
  const data = JSON.parse(localStorage.getItem("tableData") || "{}");

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  const handleTdClick = (event) => {
    const td = event.currentTarget;
    const input = document.createElement("input");
    input.value = td.textContent;
    td.textContent = "";
    td.appendChild(input);
    td.removeEventListener("click", handleTdClick);

    input.addEventListener("blur", (event) => {
      const text = document.createTextNode(input.value);
      data[td.dataset.position] = input.value;
      localStorage.setItem("tableData", JSON.stringify(data));
      td.removeChild(input);
      td.appendChild(text);
    });
  };

  for (let i = 0; i < 5; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      const td = document.createElement("td");
      td.dataset.position = i + "-" + j;
      td.addEventListener("click", handleTdClick);
      const text = document.createTextNode(
        data[i + "-" + j] ?? "Default value"
      );
      td.appendChild(text);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  return table;
}

function Page2() {
  const h1 = document.createElement("h1");
  const text = document.createTextNode("Page 2");
  h1.appendChild(text);
  return h1;
}

// url: /#/page1
// url: /#/page2
// url: /#
function generatePage() {
  const path = window.location.hash.slice(1);
  let result;
  switch (path) {
    case "/page1":
      result = Page1();
      break;
    case "/page2":
      result = Page2();
      break;
    case "/page3":
      result = Page3();
      break;
  }
  if (rootElem.childNodes.length) {
    rootElem.replaceChild(result, rootElem.childNodes[0]);
  } else {
    rootElem.appendChild(result);
  }
}
window.onhashchange = generatePage;
generatePage();

function Page3() {
  const structure = {
    type: "div",
    attributes: {
      id: "players",
      class: "players red",
    },
    children: [
      {
        type: "h1",
        attributes: {
          class: "capitalize",
        },
        children: ["Hello World"],
      },
    ],
  };
  return generateStructure(structure);
}
/**
 * <=>
 * <div id="players" class="players red">
 *  <h1 class="capitalize">
 *    Hello World
 *  </h1>
 * </div>
 */
function generateStructure(struct) {
  const node = document.createElement(struct.type);
  for (const attribute of Object.entries(struct.attributes)) {
    node.setAttribute(attribute[0], attribute[1]);
  }
  for (const child of struct.children) {
    if (typeof child === "string") {
      node.appendChild(document.createTextNode(child));
    } else {
      node.appendChild(generateStructure(child));
    }
  }
  return node;
}
