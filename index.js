const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  //!------ GLOBAL VARIABLES -------*/

  let min = 0;
  let max;
  let num = 1;
  let newGame = "";
  let humanResponse2 = "";
  let keepGuessing = true;

  //!-------------------------- INITIAL SETUP -----------------
  //? Introduction and setting the max number

  console.log(
    "Let's play a game where one of us picks a number and the other tries to guess it.\n"
  );

  let highestNumber = await ask(
    `Please set the highest number. It should be any number greater than 1.\n`
  );

  max = Number(highestNumber);
  let computerGuess = Math.round((min + max) / 2);

  // DEBUGGING CONSOLE LOGS ------- DELETE LATER
  //console.log(highestNumber + "<---this is the highestNumber");
  //console.log(
    //typeof highestNumber + "<---this is the TYPE of the highestNumber"
  //);

  //console.log(max + "<-- this is the max");
  //console.log(typeof max + "<-- this is the TYPE of the max");
  //console.log(`${min + max} <---this is the min + max`);
  //console.log(`You set ${highestNumber} as the highest number`);

  //!-------------------------- GAME CHOICE ------------------------
  //? Human vs. Computer

  let chooseGame = await ask(
    `Who would you like to guess the secret number? (H)uman or (C)omputer?\n`
  );
  chooseGame = chooseGame.toLowerCase();

  //* ------------------ COMPUTER GUESSES GAME ---------------------

  if (chooseGame === "c") {
    console.log("You have chosen for the computer to guess the secret number.\n");

    let secretNumber = await ask(
      `What is your secret number?\n You can choose a number between 1 and ${max}.\nI won't peek, I promise...\n`
    );
    console.log(`You entered: ${secretNumber}.\n Now let's start the game!`);

    let humanResponse = await ask(
      `Is is...${computerGuess}?\n> Enter y for yes and n for no.`
    );

    humanResponse = humanResponse.toLowerCase();

    if (humanResponse === `y`) {
      console.log(
        `Your number was ${computerGuess}! It took me ${num} tries to guess your number.`
      );
      newGame = await ask(`Would you like to play again?\n`);
      if (newGame === `y`) {
        newGame = newGame.toLowerCase();
        start();
      } else if (newGame === `n`) {
        process.exit();
      }
    } else if (humanResponse === `n`) {
      while (keepGuessing === true) {
        //first loop

        while (humanResponse === `n`) {
          //second loop when human says guess is not correct, keep looping

          if (humanResponse2 === `y`) {
            console.log(
              `Your number was ${computerGuess}! It took me ${num} attempt(s) to guess your number.\n`
            );
            newGame = await ask(`Would you like to play again?\n`);
            if (newGame === `y`) {
              newGame = newGame.toLowerCase();
              start();
            } else if (newGame === `n`) {
              process.exit();
            }
          }

          highLow = await ask(`Is it higher (h) or lower (l)?`);
          highLow = highLow.toLowerCase();

          if (highLow === `l`) {
            max = computerGuess;
            humanResponse2 = await ask(
              `Is is...${Math.round(
                (min + max) / 2
              )}?\n> Enter y for yes and n for no.`
            );
            humanResponse2 = humanResponse2.toLowerCase();
            computerGuess = Math.round((min + max) / 2);
            num = num + 1;
          } else if (highLow === `h`) {
            min = computerGuess;
            humanResponse2 = await ask(
              `Is is...${Math.round(
                (min + max) / 2
              )}?\n> Enter y for yes and n for no.`
            );
            humanResponse2 = humanResponse2.toLowerCase();
            num = num + 1;
            computerGuess = Math.round((min + max) / 2);
          }
        }
      }
      process.exit();
    }

    //* -------------------- HUMAN GUESSES GAME -----------------------
  } else if (chooseGame === "h") {
    console.log("Run the Human guessing program");


  }
}
