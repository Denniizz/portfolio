import { setupModal } from "../modal.js";
import { elements } from "../dom.js";
import { list } from "/exercises/linkedList.js";

setupModal("linkedListCard","linkedListWindow","linkedListCloseBtn");

document.getElementById("linkedListCard").addEventListener("click", () => {
  renderLinkedList();
});

function renderLinkedList()
{
  const container = document.getElementById("linkedListContainer");
  container.innerHTML = "";

  // Make another look for the linkedList
  let current = list.head;

  while (current) {
    const nodeEl = elements("div", "node", [
      elements("div", "value", current.value)
    ]);

    container.appendChild(nodeEl);

    // arrow between nodes
    if (current.next) {
      const arrow = elements("div", "arrow", "→");
      container.appendChild(arrow);
    }

    current = current.next;
  }

  // optional tail indicator
  const nullEl = elements("div", "null", "NULL");
  container.appendChild(nullEl);
}
