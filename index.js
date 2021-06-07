////////////////////////////////////////////
///                                      ///
///            PIG DICE GAME             ///
///                                      ///
////////////////////////////////////////////

/*
TO DO:

(1) Relabel the inner function and then invoke the relabeled inner function.

const play = russianRoulette(3);
console.log(play()); // should log: ‘click’
console.log(play()); // should log: ‘click’
console.log(play()); // should log: ‘bang’
console.log(play()); // should log: ‘reload to play again’
console.log(play()); // should log: ‘reload to play again’

// Note: not the same as above.  You must store the function definition of the inner function in a new variable and then invoke the relabeled inner function.
console.log(russianRoulette(3)()); // 'click'
console.log(russianRoulette(3)()); // 'click'
console.log(russianRoulette(3)()); // 'click'
console.log(russianRoulette(3)()); // 'click'
console.log(russianRoulette(3)()); // 'click'

(2) Try to make it work as a 90-minute exam.

(3) Figure out how to make a method work
*/

/////////////////////////////////
// 1. New Version with Objects //
/////////////////////////////////

// Closure now working because I created a variable (a method) to store the inner function first i.e. players.player1.player1Turn = playerTurn()

// Pros: The number of players is dynamic.  We can add as many as possible, and iterate to create the objects and properties (name, score, turn, etc) and use the new ES6 class syntax to automatically create new objects.  We can choose 2, up to 10 or more and have the object creation, properties and functions be dynamic.

class PlayerGenerator {
  constructor (name, cummulativeScore) {
    this.name = name;
    this.cummulativeScore = cummulativeScore;
  }
}

function playerTurn() { 
  let roundScore; 
  let totalScore = 0;
  return function addScore(roundScore = 0, dieRoll = Math.ceil(Math.random() * 6)) {
    if (dieRoll === 1) {
      roundScore = 0;
      alert(`\nYou rolled a ${dieRoll}. That concludes your turn and your score for this round is ${roundScore}`);
      return roundScore;
    }
    else {
      totalScore += dieRoll;
      if (totalScore >= targetScore) { 
        console.log(`\nYou rolled a ${dieRoll}. Your current score for this round is ${roundScore + dieRoll}`);
        return roundScore + dieRoll;
      } 
      hold = prompt(`\nYou rolled a ${dieRoll}. Your current score for this round is ${roundScore + dieRoll} and your cummulative score for the game if you hold now would be ${totalScore}. Do you want to roll again or hold? Please enter roll or hold.`, `roll`);
      if (hold === "hold" || hold === "h") return roundScore + dieRoll;
      return addScore(roundScore + dieRoll);
    }
  }
}

const players = {};

let rulesRequest = prompt(`Hi! Welcome to 'The Pig Dice Game'. Do you want to know the rules of the game? Please enter yes or no.`, `yes`);

if (rulesRequest === `yes`) alert(`\nGAME RULES:
\n- The game can have up to 10 players playing in rounds.
\n- In each round, a player rolls a dice as many times as they wish. Each result gets added to the player's round score.
\n- If the player rolls a 1, their round score becomes zero and it's the next player's turn.
\n- The player can choose to 'hold', which means that their round score gets added to their cummulative score for the game. After that, it's the next player's turn.
\n- The first player whose cummulative score reaches the selected target score (between 20 and 100) wins the game.`);

let numPlayers = prompt(`\nHow many players will be playing this game? Please enter a number between 2 and 10:`, `3`)

for (let i = 1; i <= numPlayers; i++) {
  players[`player${i}`] = new PlayerGenerator(`Player ${i}`, 0);
  players[`player${i}`].name = prompt(`\nPlayer ${i}, please enter your name:`, `Player ${i}`);
  players[`player${i}`].state = prompt(`\nPlayer ${i}, please enter the state in which you live:`, `Your state`);
  players[`player${i}`][`player${i}Turn`] = playerTurn(); // assigning method to inner function, with closure
}

let targetScore = prompt(`\nFor this game, you will need a target score to determine the winner of the game. Please pick a number between 20 and 100:`, `25`)

while(Object.keys(players).every(player => players[player].cummulativeScore < targetScore)) {
  for (let i = 1; i <= numPlayers; i++) {
    console.log(`\nIt is ${players[`player${i}`].name}'s turn:`);
    players[`player${i}`].cummulativeScore += players[`player${i}`][`player${i}Turn`](); 
    if(players[`player${i}`].cummulativeScore >= targetScore) break;
    console.log(`\n${players['player' + i].name}, you have a cummulative score of ${players['player' + i].cummulativeScore}!`);
  }
}

for (let i = 1; i <= numPlayers; i++) {
  if(players[`player${i}`].cummulativeScore >= targetScore) console.log(`\n${players['player' + i].name} is the winner! ${players['player' + i].state} is proud.\n`);
}

console.log(players);
/*
{
  player1: PlayerGenerator {
    name: 'Lillian',
    cummulativeScore: 9,
    state: 'California',
    player1Turn: [Function: addScore]
  },
  player2: PlayerGenerator {
    name: 'Armah',
    cummulativeScore: 22,
    state: 'Georgia',
    player2Turn: [Function: addScore]
  }
}
*/

////////////////////////////////////////
// 2. Simple, Basic (Older) Version (created by David Zhang //  
//////////////////////////////////////// 

// Cons: The number of players is not dynamic. There must be two players.  We have static variable labels for name, score and turn of two players.

/*
function playerTurn() { 
  let roundScore; 
  let totalScore = 0;
  return function addScore(roundScore = 0, dieRoll = Math.ceil(Math.random() * 6)) {
    if (dieRoll === 1) {
      roundScore = 0;
      alert(`You rolled a ${dieRoll}. That concludes your turn and your score for this round is ${roundScore}`);
      return roundScore;
    }
    else {
      totalScore += dieRoll;
      if (totalScore >= targetScore) { 
        console.log(`You rolled a ${dieRoll}. Your current score for this round is ${roundScore + dieRoll}`);
        return roundScore + dieRoll;
      } 
      hold = prompt(`You rolled a ${dieRoll}. Your current score for this round is ${roundScore + dieRoll} and your cummulative score for the game if you hold now would be ${totalScore}. Do you want to roll again or hold? Please enter roll or hold.`, `roll`);
      if (hold === "hold") return roundScore + dieRoll;
      return addScore(roundScore + dieRoll);
    }
  }
}

let rulesRequest = prompt(`Hi! Welcome to 'The Pig Dice Game'. Do you want to know the rules of the game? Please enter yes or no.`, `yes`);

if (rulesRequest === `yes`) alert(`GAME RULES:
\n- The game has two players playing in rounds.
\n- In each round, a player rolls a dice as many times as they wish. Each result gets added to the player's round score.
\n- If the player rolls a 1, their round score becomes zero and it's the next player's turn.
\n- The player can choose to 'hold', which means that their round score gets added to their cummulative score for the game. After that, it's the next player's turn.
\n- The first player whose cummulative score reaches the selected target score (between 20 and 100) wins the game.`);

let targetScore = prompt(`For this game, you will need a target score to determine the winner of the game. Please pick a number between 20 and 100:`, `25`)


let player1totalScore = 0;
let player2totalScore = 0;
let player1Turn = playerTurn(); 
let player2Turn = playerTurn();
let player1Name = prompt(`Player 1: Please enter your name`, `Player 1`);
let player2Name = prompt(`Player 2: Please enter your name`, `Player 2`);

while(player1totalScore < targetScore && player2totalScore < targetScore) {
  console.log(`It is ${player1Name}'s turn`);
  player1totalScore += player1Turn();
  console.log(`${player1Name}, you have a cummulative score of ${player1totalScore}!`)
  if(player1totalScore >= targetScore) break;
  console.log(`It is ${player2Name}'s turn`);
  player2totalScore += player2Turn();
  console.log(`${player2Name}, you have a cummulative score of ${player2totalScore}!`);
}

if(player1totalScore >= targetScore) console.log(`${player1Name} is the winner!`);
if(player2totalScore >= targetScore) console.log(`${player2Name} is the winner!`);
*/