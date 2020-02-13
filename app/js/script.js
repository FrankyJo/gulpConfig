let counter = Counter ();

function Counter () {
    let count = 0

    return function(){
        count++;
        return count;
    }
}

console.log(counter());
console.log(counter());


var x = 1; // Инициализируем x
console.log(x + " " + y);  // '1 undefined'
var y = 2;

console.log(typeof(4234234));