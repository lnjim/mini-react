const rootElem = document.getElementById("root");

function Page1() {
  const data = JSON.parse(localStorage.getItem("tableData") || "{}");
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
  const structure = {
    type: "table",
    children: [
      {
        type: "tbody",
        children: new Array(5).fill().map((_, indexRow) => ({
          type: "tr",
          children: new Array(5).fill().map((_, indexCol) => ({
            type: "td",
            dataset: {
              position: indexRow + "-" + indexCol,
            },
            attributes: {
              onClick: handleTdClick,
            },
            children: [data[indexRow + "-" + indexCol] ?? "Default value"],
          })),
        })),
      },
    ],
  };

  return generateStructure(structure);
}

function Page2() {
  const structure = {
    type: "h1",
    children: ["Page 2"],
  };
  return generateStructure(structure);
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
  if (struct.attributes) {
    if (
      struct.type.propTypes &&
      !typecheck(struct.attributes, struct.type.propTypes)
    ) {
      throw new Error("Invalid attributes");
    }
    for (const attribute of Object.entries(struct.attributes)) {
      if (/on([A-Z].*)/.test(attribute[0])) {
        const res = attribute[0].match(/on([A-Z].*)/);
        const eventName = res[1].toLowerCase();
        node.addEventListener(eventName, attribute[1]);
      } else node.setAttribute(attribute[0], attribute[1]);
    }
  }
  if (struct.children)
    for (const child of struct.children) {
      if (typeof child === "string") {
        node.appendChild(
          document.createTextNode(child.interpolate(struct.attibutes))
        );
      } else {
        node.appendChild(generateStructure(child));
      }
    }
  if (struct.dataset)
    for (const attribute of Object.entries(struct.dataset)) {
      node.dataset[attribute[0]] = attribute[1];
    }
  return node;
}
