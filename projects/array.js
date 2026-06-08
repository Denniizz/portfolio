import { setupModal } from "../modal.js";
import { elements } from "../dom.js";

setupModal("arrayCard", "arrayWindow", "arrayCloseBtn", resetDSA);

document.getElementById("pushBtn").addEventListener("click", push);
document.getElementById("getBtn").addEventListener("click", get);
document.getElementById("popBtn").addEventListener("click", pop);
document.getElementById("shiftBtn").addEventListener("click", shift);
document.getElementById("deleteBtn").addEventListener("click", deleteByIndex);


const DEFAULT_ARRAY = [1, 2, 3, 4];
let myArray = [...DEFAULT_ARRAY];

function resetDSA() 
{
  myArray = [...DEFAULT_ARRAY];

  document.getElementById("valueInput").value = "";

  methodDescription("Choose an operation to see how arrays work.");
  renderArray();
}

document.getElementById("arrayCard").addEventListener("click", () => {
  renderArray();
});

function push() {
  const input = document.getElementById("valueInput");
  const value = Number(input.value);

  if (input.value === "") {
    methodDescription("Please enter a value first.");
    return;
  }

  myArray.push(value);

  methodDescription(
    `push(${value}) → added [${value}] to the end of the array.`
  );

  input.value = "";

  renderArray();
}

function get(){
  const input = document.getElementById("valueInput");
  const index = Number(input.value);

  if (input.value === ""){
    methodDescription("Please enter the index of the number.");
    return;
  }

  if (index < 0 || index >= myArray.length) 
  {
    methodDescription(`Index ${index} is out of bounds.`);
    return;
  }

  const value = myArray[index];

  methodDescription(`get(${index}) → value at index ${index} is [${value}]`);

  input.value = "";
}

function pop()
{
  if (myArray.length === 0) {
    methodDescription("Array is already empty.");
    return;
  }

  const removed = myArray.pop();
  
  methodDescription(`pop() → removes the last element [${removed}]`);
  renderArray();
}

function shift()
{
  if (myArray.length === 0) {
    methodDescription("Array is already empty.");
    return;
  }

  const shifted = myArray.shift();

  methodDescription(`shift() → removes the first element [${shifted}]`);
  renderArray();
}

function deleteByIndex(){
  const input = document.getElementById("valueInput");
  const index = Number(input.value);

  if (input.value === ""){
    methodDescription("Please enter an index to be deleted.");
    return;
  }

  if (index < 0 || index >= myArray.length) 
  {
    methodDescription(`Index ${index} is out of bounds.`);
    return;
  }

  const deleted = myArray.splice(index, 1)[0];

  methodDescription(`delete(${index}) → removed value [${deleted}]`);

  input.value = "";

  renderArray();
}

function renderArray() 
{
  const container = document.getElementById("arrayContainer");

  container.innerHTML = "";

  myArray.forEach((value, index) => 
  {
    const cell = elements("div", "cell", [
      elements("div", "value", value),
      elements("div", "index", index)
    ]);

    container.appendChild(cell);
  });
}

function methodDescription(text)
{
  document.getElementById("explanation").textContent = text;
}
