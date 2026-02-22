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

team1 < team2 && console.log("Team 1 is more likely to win")
team2 < team1 && console.log("Team 2 is more likely to win")
team1 === team2 && console.log("Draw between teams")
