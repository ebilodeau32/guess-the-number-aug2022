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

    // if(secretNumber === computerGuess) {
    //   console.log(`${secretNumber} <-----this is the secret number.`)
    //   console.log(`${computerGuess} <-----this is the computer guess.`)
    //   console.log("Cheat detector activated!");

    // } else {

    // console.log("run the program as usual")

    // }

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
            //check to make sure the secretNumber is actually lower than computer guess
            if (computerGuess < secretNumber) {
              max = computerGuess;
              humanResponse2 = await ask(
                `Is is...${Math.round(
                  (min + max) / 2
                )}?\n> Enter y for yes and n for no.`
              );
              humanResponse2 = humanResponse2.toLowerCase();
              computerGuess = Math.round((min + max) / 2);
              num = num + 1;
            } else {
              console.log("Run cheat detector!");
              cheating = true;

              while (cheating === true) {
                cheatAnswer = await ask(
                  `Are you sure your number isn't lower than ${computerGuess}?\n Enter (Y)es or (N)o.\n`
                );

                if (cheatAnswer === "y") {
                  cheatAnswer = await ask(
                    `Are you sure your number isn't lower than ${computerGuess}?\n Enter (Y)es or (N)o.\n`
                  );
                } else if (cheatAnswer === "n") {
                  cheating = false;
                  console.log("Glad we figured that out. Let's keep playing!");
                  humanResponse2 = await ask(
                    `Is is...${Math.round(
                      (min + max) / 2
                    )}?\n> Enter y for yes and n for no.`
                  );
                }
              }
            }
          } else if (highLow === `h`) {
            if (computerGuess > secretNumber) {
              min = computerGuess;
              humanResponse2 = await ask(
                `Is is...${Math.round(
                  (min + max) / 2
                )}?\n> Enter y for yes and n for no.`
              );
              humanResponse2 = humanResponse2.toLowerCase();
              num = num + 1;
              computerGuess = Math.round((min + max) / 2);
            } else {
              cheating = true;

              while (cheating === true) {
                cheatAnswer = await ask(
                  `Are you sure your number isn't higher than ${computerGuess}?\n Enter (Y)es or (N)o.\n`
                );

                if (cheatAnswer === "y") {
                  cheatAnswer = await ask(
                    `Are you sure your number isn't higher than ${computerGuess}?\n Enter (Y)es or (N)o.\n`
                  );
                } else if (cheatAnswer === "n") {
                  cheating = false;
                  console.log("Glad we figured that out. Let's keep playing!");
                  humanResponse2 = await ask(
                    `Is is...${Math.round(
                      (min + max) / 2
                    )}?\n> Enter y for yes and n for no.`
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

//!-------------------------- FUNCTIONS ------------------------

async function cheatDetector(computerGuess) {
  let cheatAnswer = "";

  if (highLow === "h") {
    cheatAnswer = await ask(
      `Are you sure your number isn't higher than ${computerGuess}?\n Enter (Y)es or (N)o.\n`
    );
  } else if (highLow === "l") {
    cheatAnswer = await ask(
      `Are you sure your number isn't lower than ${computerGuess}?\n Enter (Y)es or (N)o.\n`
    );
  } else {
    console.log("I'm not sure what that means.");
  }

  if (cheatAnswer === "y") {
    cheatDetector(computerGuess);
  } else if (cheatAnswer === "n") {
    console.log("Glad we figured that out. Let's keep playing!");
  }
}
