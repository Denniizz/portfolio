class Node 
{
   constructor(data) {
       this.data = data;
       this.next = null;
   }
}

class LinkedList {
   constructor() {
       this.head = null; // Points to the first node
   }
   // Add a new node at the end
   append(data) 
   {
       const newNode = new Node(data);

       if (!this.head) {
           this.head = newNode;
           return;
       }
       let current = this.head;
       while (current.next) {
           current = current.next;
       }
       current.next = newNode;
   }

   // Print all nodes in the list
   printList() {
       let current = this.head;
       let result = "";
       while (current) {
           result += current.data + " -> ";
           current = current.next;
       }
       console.log(result + "null");
   }

   // Delete a node by value
   delete(data) {
       if (!this.head) return;
       if (this.head.data === data) {
           this.head = this.head.next;
           return;
       }
       let current = this.head;
       while (current.next && current.next.data !== data) {
           current = current.next;
       }
       if (current.next) {
           current.next = current.next.next;
       }
   }
}

const list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);
list.printList(); // Output: 10 -> 20 -> 30 -> null
list.delete(20);
list.printList(); // Output: 10 -> 30 -> null
export { list };