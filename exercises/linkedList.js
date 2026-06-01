class Node 
{
    constructor(value)
    {
        this.head = value;
        this.next = null;
    }
}

class LinkedList 
{
    constructor(value)
    {
        this.head = new Node(value);
        this.tail = this.head;
        this.lenght = 1;
    }

    push(value)
    {
        let newNode = new Node(value);
        this.tail.next = newNode;
        this.tail = newNode;
        this.lenght++;
    }

    pop()
    {
        if(!this.head){
            return undefined;
        }

        let temp = this.head;
        let prev = this.tail;

        while (temp.next)
        {
            prev = temp;
            temp = prev.next;
        }

        this.tail = prev;
        this.tail.next = null;
        this.lenght--;

        if(this.lenght === 0)
        {
            this.head = null;
            this.tail = null;
        }

        return temp;
    }
}

const myLinkedList = new LinkedList(1);
myLinkedList.push(12);
myLinkedList.pop();
console.log(myLinkedList);