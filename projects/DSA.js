import { setupModal } from "../modal.js";

setupModal("dsaCard", "DSAWindow", "DSACloseBtn");

let myArray = [1, 2, 3, 4, 5];

document.getElementById("dsaCard").addEventListener("click", () => {
  setTimeout(() => {
    renderArray();
  }, 50);
});

function renderArray() {
  const container = document.getElementById("arrayContainer");

  container.innerHTML = "";

  myArray.forEach((val, index) => {
    const box = document.createElement("div");
    box.className = "cell";
    box.innerText = val;

    container.appendChild(box);
  });
}


