const country="Bulgaria";
const continent="Europe";
let population=7000000;

console.log(country);
console.log(continent);
console.log(population);


const isIsland=false;
const language="Bulgarian";

console.log(typeof isIsland)
console.log(typeof population)
console.log(typeof country)
console.log(typeof language)

console.log("half the population: ", population/2);

population++;
console.log("population after increment: ", population);

console.log("Is Bulgaria more populous than Finland? ", population > 6000000);
console.log("Is Bulgaria less populous than average? ", population < 33000000);

const description = country + " is in " + continent + ", and its " + population + " people speak " + language;
console.log(description);

const descriptionTemplateLiteral = `${country} is in ${continent}, and its ${population} people speak ${language}`;
console.log(descriptionTemplateLiteral);

if(population > 33000000) {
    console.log(`${country}'s population is above average`);
}else{
    console.log(`${country}'s population is ${33000000 - population} below average`);
}


const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);


if(BMIMark > BMIJohn){
    console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
}else{
    console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
}


let numNeighbours = Number(prompt('How many neighbour countries does your contry have?'));

if(numNeighbours === 1){
    console.log('Only 1 border!');
}else if(numNeighbours > 1){
    console.log('More than 1 border');
}else{
    console.log('No borders');
}