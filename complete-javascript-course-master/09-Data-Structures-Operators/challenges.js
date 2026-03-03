const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

console.log('----- CHALLENGE 1 -----');

// 1. Create one player array for each team (players1 and players2)

const [players1, players2] = game.players;

// 2. First player is goal keeper, rest are field players
const [goalKeeper, ...fieldPlayers] = players1;
console.log({ players1, goalKeeper, fieldPlayers, players2 });

// 3. Array of all players
const allPlayers = [...players1, ...players2];

// 4. Team 1 used 3 substitute players, create new array (players1Final) containing
// all original players + Thiago, Coutinho, Perisic
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// 5. Based on the game.odds object, create one variable for each odd
// (called team1, draw and team2)
const { team1, x: draw, team2 } = game.odds;

// 6. printGoals that receives an arbitrary number of player names, not an array!,
// and prints each of them to the console, along with the number of goals
// that were scored (number of player names passed in)

const printGoals = (...playerNames) => {
  for (let i = 0; i < playerNames.length; i++) {
    console.log(`Player ${playerNames[i]} scored ${playerNames.length} goals`);
  }
};

printGoals(...game.scored);
printGoals('Muller', 'Davis');

team1 < team2 && console.log('Team 1 is more likely to win');
team2 < team1 && console.log('Team 2 is more likely to win');
team1 === team2 && console.log('Draw between teams');

// CHALLENGE 2

console.log('----- CHALLENGE 2 -----');
// 1. Loop over the game.scored array and print each player name to the console, along with the goal number
// (e.g. "Goal 1: Lewandowski")

for (const [idx, player] of game.scored.entries()) {
  console.log(`Goal ${idx + 1}: ${player}`);
}

// 2. Use a loop to calculate the average odd and log it to the console
let total = 0;
for (const odd of Object.values(game.odds)) {
  total += odd;
}
console.log({ total });
const avgOdd = total / Object.values(game.odds).length;
console.log({ avgOdd });

// 3. Print the 3 odds to the console but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5

console.log(Object.entries(game.odds));
for (const [team, odd] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${team !== 'x' ? 'victory' : 'draw'} ${game[team] ?? ''}: ${odd}`,
  );
}

// CHALLENGE 3

/*
1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
console.log({ events });

gameEvents.delete(64);
console.log({ gameEvents });

const time = [...gameEvents.keys()].pop();
console.log({ time });
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`,
);

for (const [key, value] of gameEvents) {
  console.log(`[${key <= 45 ? 'FIRST' : 'SECOND'} HALF]: ${value}`);
}

// Coding Challenge #4

/*
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const clickHandler = () => {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [index, r] of rows.entries()) {
    const splitRow = r.toLowerCase().trim().split('_');
    const final = [];

    // Works for more than 2 words in the variable name
    for (const s of splitRow) {
      if (s === splitRow[0]) {
        final.push(s);
      } else {
        final.push(s[0].toUpperCase() + s.slice(1));
      }
    }

    console.log(final.join('').padEnd(20) + '✅'.repeat(index + 1));
  }
};

document.querySelector('button').addEventListener('click', clickHandler);

///////////////////////////////////////
// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const processLine = line => {
  const [type, from, to, timeSpan] = line.split(';');
  const status = type.replaceAll('_', ' ').trim();
  const source = from.slice(0, 3).toUpperCase();
  const dest = to.slice(0, 3).toUpperCase();
  const time = timeSpan.replace(':', 'h');

  console.log(
    `${status.startsWith('Delayed') ? '🔴' : ''} ${status} from ${source} to ${dest} (${time})`.padStart(
      45,
    ),
  );
};

const processFlightsMessage = message => {
  const lines = message.split('+');
  for (line of lines) {
    processLine(line);
  }
};

processFlightsMessage(flights);
