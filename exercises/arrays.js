class MyArray {

    constructor() 
    {
        this.lenght = 0;
        this.data = {};
    }

    push(item)
    {
        this.data[this.lenght] = item;
        this.lenght++;
        return this.lenght;
    }

    get(index)
    {
        return this.data[index];
    }

    pop()
    {
        const lastEl = this.data[this.lenght - 1];
        delete this.data[this.lenght - 1];
        this.lenght--;
        return lastEl;
    }

    shift()
    {
        const firstEl = this.data[0];

        // re-indexing
        for (let i = 0; i < this.lenght; i++)
        {
            this.data[i] = this.data[i + 1];
        }

        delete this.data[this.lenght - 1];
        this.lenght--;
        return firstEl;
    }

    deleteByIndex(index)
    {
        const item = this.data[index];

        for(let i = index; i < this.lenght - 1; i++)
        {
            this.data[i] = this.data[i + 1];
        }

        delete this.data[this.lenght - 1];
        this.lenght--;
        return item;
    }
}


const myNewArray = new MyArray();
myNewArray.push("kiwi");
myNewArray.push("grapes");
myNewArray.push("strawberry");
console.log(myNewArray);

