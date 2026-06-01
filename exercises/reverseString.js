const reverseString = (str) => str.split("").reverse().join("");

console.log(reverseString("deniz"));

const capitalize = (str) => {
    return str.toLowerCase()
              .split(" ")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ");
};

console.log(capitalize("deniz"));