'use strict';
// we are selecting elements in this first part

//we are creating the const variable becouse to use it repteadly in our code that make it very useful
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score1El = document.getElementById('score--1'); //the above line of code is exactly the same as this one just we use here method getElementById and its faster than querySelector
const score0El = document.querySelector('#score--0'); //we select id of the element this is DOM manipaltion
const diceEl = document.querySelector('.dice'); //we select the dice class to manuplate it

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// we are manuplating here in the second part
/*score0El.textContent = 0; //we set up the score to 0
score1El.textContent = 0; //we set up the score to 0
diceEl.classList.add('hidden'); // the selected class is hidden 
*/

//we will roll the dice at this part
let currentScore, activePlayer, playing, scores; //the scope of this variables is accessible in this program
const intialize = function () {
  //we create this function to minimaize code and it will be called when nedded in the block where it called
  scores = [0, 0]; //we store the scores of both players in array ;
  currentScore = 0; // this current score is set to 0 becose we will update once the function run
  activePlayer = 0;
  playing = true; // at the first  we are playing and true   .. this variable holds true if we are playing

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
intialize();
const swithPlayer = function () {
  // we add this function to minimize the code
  document.getElementById(`current--${activePlayer}`).textContent = 0; // activeplayer1 assigned to 0 becouse player0   is  becomes 0 due to (dice !== 1)  so player one currentscore is 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // this is if else statement
  currentScore = 0;
  //toggle removes class if present and add class if not present;
  player0El.classList.toggle('player--active'); //remove class in player 1 since the class is present  .. in the game this exchange color with the second player
  player1El.classList.toggle('player--active'); // add class in player 2 since the class is not present
};
btnRoll.addEventListener('click', function () {
  if (playing) {
    // if true excute all this code
    const dice = Math.trunc(Math.random() * 6) + 1; // we are generating random number between 1 - 6
    console.log(dice); //we read the random dice number to the console . this is only for checking that we  are in good path
    diceEl.classList.remove('hidden'); // we are removing the hidden class that we add previous in order to display the dice picture to the screen
    diceEl.src = `dice-${dice}.png`; //this displays the number of dices with the picture

    if (dice !== 1) {
      //checking if the dice is not equal to 1
      currentScore += dice; //add dice score to the current score
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore; //assigns active player to the current score
    } else {
      //switch to player number2
      /* document.getElementById(`current--${activePlayer}`).textContent = 0; // activeplayer1 assigned to 0 becouse player0   is  becomes 0 due to (dice !== 1)  so player one currentscore is 0;
    activePlayer = activePlayer === 0 ? 1 : 0; // this is if else statement
    currentScore = 0;
    //toggle removes class if present and add class if not present;
    player0El.classList.toggle('player--active'); //remove class in player 1 since the class is present  .. in the game this exchange color with the second player
    player1El.classList.toggle('player--active'); // add class in player 2 since the class is not present*/

      swithPlayer(); // we call the function and this single function eliminate the above commented out  code;
    }
  }
});

// we are going to hold the score

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore; //we are adding the current score  to the score of active player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; //displayes to the total score to the active player

    //we check if the active player score is greater or equal 20 then if it is  active player won
    if (scores[activePlayer] >= 20) {
      playing = false; // if playing is false  the code below will not execute
      diceEl.classList.add('hidden'); // we are hiding the dice picture  after the winner found
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //this makes the winner color changes .. we take  color  player--winner   from our css class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // this code prevent the active player from accuring the same color with the winner
    }

    //then switch to the next player since the active player is hold and the next active players turn
    /*
  document.getElementById(`current--${activePlayer}`).textContent = 0; // activeplayer1 assigned to 0 becouse player0   is  becomes 0 due to (dice !== 1)  so player one currentscore is 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // this is if else statement
  currentScore = 0;
  //toggle removes class if present and add class if not present;
    player0El.classList.toggle('player--active'); //remove class in player 1 since the class is present  .. in the game this exchange color with the second player
    player1El.classList.toggle('player--active'); // add class in player 2 since the class is not present
  */

    //to make   the code dry means  not repeat the code  since the above code is repeated twice i will comment out and create a function to hold it  named const swichPlayer;
    else {
      swithPlayer();
    } // we call the function
  }
});
//here we restarting the game  from the bigning
btnNew.addEventListener('click', intialize); //we pass the intialize as an argument instead of writing all the code below
/*
btnNew.addEventListener('click', function(){
//score0El.textContent = 0;
 score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
});
  */
