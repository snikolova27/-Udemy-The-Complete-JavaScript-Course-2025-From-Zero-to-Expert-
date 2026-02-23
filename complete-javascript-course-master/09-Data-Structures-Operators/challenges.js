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
// Odd of vicotry Borrussia Dortmund: 6.5

console.log(Object.entries(game.odds));
for (const [team, odd] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${team !== 'x' ? 'victory' : 'draw'} ${game[team] ?? ''}: ${odd}`,
  );
}
