/**
 * A scratchpad file to experiment with TS coding concepts.
 */
function print(something){
    console.log(something);
}

// fat arrow functions - lambda functions
const times = (x: number, y: number) => x * y;
const double = (x) => times(x, 2);

print(times(4, 5));
print(double(4));

const p1 = {
    name: 'Alex',
    greet: function(){console.log(`Hello ${this.name}`)}
};

p1.greet();

setTimeout(p1.greet, 2000);

const p2 = {
    name: 'Bob',
    greet: () => {console.log(`Hello ${this.name}`)}
}

setTimeout(p2.greet, 2000);
