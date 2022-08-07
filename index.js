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
  let cheatAnswer = "";
  let cheating = false;

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

  //!-------------------------- GAME CHOICE ------------------------
  //? Human vs. Computer

  let chooseGame = await ask(
    `Who would you like to guess the secret number? (H)uman or (C)omputer?\n`
  );
  chooseGame = chooseGame.toLowerCase();

  //* ------------------ COMPUTER GUESSES ---------------------

  if (chooseGame === "c") {
    console.log(
      "You have chosen for the computer to guess the secret number.\n"
    );

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
        //first loop to continue game

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
            //check to make sure the secretNumber is actually lower than computer guess
            if (computerGuess > secretNumber) {
              max = computerGuess;
              computerGuess = Math.round((min + max) / 2);

              humanResponse2 = await ask(
                `Is is...${computerGuess}?\n> Enter y for yes and n for no.`
              );
              humanResponse2 = humanResponse2.toLowerCase();
              num = num + 1;
            } else {
              console.log("Run cheat detector!");
              cheating = true;

              while (cheating === true) {
                cheatAnswer = await ask(
                  `Are you sure your number is lower than ${computerGuess}?\n Enter (Y)es or (N)o.\n`
                );

                if (cheatAnswer === "n") {
                  cheating = false;
                  console.log("Glad we figured that out. Let's keep playing!");
                  humanResponse2 = await ask(
                    `Is is...${computerGuess}?\n> Enter y for yes and n for no.`
                  );
                }
              }
            }
          } else if (highLow === `h`) {
            if (computerGuess < secretNumber) {
              min = computerGuess;
              computerGuess = Math.round((min + max) / 2);
              humanResponse2 = await ask(
                `Is is...${computerGuess}?\n> Enter y for yes and n for no.`
              );
              humanResponse2 = humanResponse2.toLowerCase();
              num = num + 1;
            } else {
              cheating = true;

              while (cheating === true) {
                cheatAnswer = await ask(
                  `Are you sure your number is higher than ${computerGuess}?\n Enter (Y)es or (N)o.\n`
                );

                if (cheatAnswer === "n") {
                  cheating = false;
                  console.log("Glad we figured that out. Let's keep playing!");
                  humanResponse2 = await ask(
                    `Is is...${computerGuess}?\n> Enter y for yes and n for no.`
                  );
                }
              }
            }
          }
        }
      }
      process.exit();
    }

    //* -------------------- HUMAN GUESSES -----------------------
  } else if (chooseGame === "h") {
    console.log("Run the Human guessing program");

    let computerRandomNum = Math.floor(Math.random() * max + 1);
    console.log(computerRandomNum);

    console.log("You have chosen to guess the secret number.\n");

    let humanGuess = await ask(
      `The number I am thinking of is between 1 and ${max}.\nWhat is your first guess?\n`
    );

    if (humanGuess == computerRandomNum) {
      console.log(`Correct! My number was ${computerRandomNum}`);
    } else {
      console.log("That's not my number. I'll give you a hint...");

      while (keepGuessing === true) {
        if (humanGuess < computerRandomNum) {
          humanGuess = await ask(
            `My number is higher than ${humanGuess}.\nGuess again.\n`
          );
        } else if (humanGuess > computerRandomNum) {
          humanGuess = await ask(
            `My number is lower than ${humanGuess}.\nGuess again.\n`
          );
        } else {
          console.log(`Correct! My number was ${computerRandomNum}`);
          keepGuessing = false;
          newGame = await ask(`Would you like to play again?\n`);
          if (newGame === `y`) {
            newGame = newGame.toLowerCase();
            start();
          } else if (newGame === `n`) {
            process.exit();
          }
        }
      }
    }
  }
}
