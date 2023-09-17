let data = fetchData();
async function fetchData() {
  let response = await fetch(`http://localhost:3000/drivers`);
  let data = await response.json();
  return data;
}

// * user input
const div = document.createElement("div");
const input = document.createElement("input");
const buttonSubmit = document.createElement("button");
input.className = "userInput";
buttonSubmit.className = "submit";
div.className = "container";
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Enter the name of the driver to add");
buttonSubmit.innerText = "Add";
div.appendChild(input);
div.appendChild(buttonSubmit);
document.body.appendChild(div);
buttonSubmit.addEventListener("click", submit);
async function submit() {
  let driver = input.value.toString();

  let data = await fetch(`http://localhost:3000/drivers/${driver}`, {
    method: "POST",
  });
  let response = data.json();
  response
    .then((response) => {
      if (response) {
        input.value = "";
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

const message = document.createElement("h1"); // ? message if no items found
// * create list
data
  .then((value) => {
    if (value.length === 0) {
      message.innerText = "No items";
      message.className = "message";
      document.body.appendChild(message);
    }

    value.forEach((element) => {
      h1(element.driver);
    });
  })
  .catch((error) => {
    message.innerText = "No server Found :(";
    message.style.color="red"
    message.className = "message";
    document.body.appendChild(message);
  });

function h1(text) {
  const deleteBtn = document.createElement("button");

  const h1 = document.createElement("h1");
  const div = document.createElement("div");

  deleteBtn.innerText = "Delete";
  deleteBtn.style.display = "inline-block";
  deleteBtn.className = "delete";
  div.className = "list-item";
  h1.innerHTML = text;
  div.style.fontFamily = "sans-serif";

  div.style.margin = "10px";
  div.appendChild(h1);
  div.appendChild(deleteBtn);
  document.body.appendChild(div);

  deleteBtn.addEventListener("click", async () => {
    console.log(h1.innerText);
    const driverName = h1.innerText.toString();
    let data = await fetch(`http://localhost:3000/drivers/${driverName}`, {
      method: "DELETE",
    });
    let response = data.json();
    response.then((data) => {
      div.remove();
    });
  });
}
