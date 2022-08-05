const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  let min = 1;
  let max;
  let num = 1;
  let humanResponse;
  let humanResponse2 = "";
  let newGame = "";
  let computerGuess = Math.round((min + max) / 2);

  //ORIGINAL GAME

  max = await ask(
    `Let's play a game where one of us picks a number and the other tries to guess it. Please set the highest number. It should be any number greater than 1.\n`
  );

  console.log(`You set ${max} as the highest number\n`);

  //console.log(`This is the max:` + max);
  //console.log(`This is the min:` + min);
  //console.log(`This is the BOTTOM computerGuess:` + computerGuess);

  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );

  console.log("You entered: " + secretNumber);

  humanResponse = await ask(
    `Is is...${Math.round((max - min)/2)}***humanResponse?\n> Enter y for yes and n for no.`
  );
  humanResponse = humanResponse.toLowerCase();


  if (humanResponse === `y`) {

    console.log(
      `Your number was ${computerGuess}! It took me ${num} tries to guess your number.`
    );
    newGame = await ask(`Would you like to play again?`);
    if (newGame === `y`) {
      newGame = newGame.toLowerCase();
      start();
    } else if (newGame === `n`) {
      process.exit();
    }
  } else if (humanResponse === `n`) {
    while (num < max) {                          //change the while loop to true/false?
      //first loop

      while (humanResponse === `n`) {
        //second loop when human says guess is not correct, keep looping

        if (humanResponse2 === `y`) {
          console.log(
            `Your number was ${computerGuess}! It took me ${num} attempt(s) to guess your number.`
          );
          newGame = await ask(`Would you like to play again?`);
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
          max = computerGuess;            //CHECK OUT USE OF MAX AND MIN IN THESE BLOCKS
          humanResponse2 = await ask(
            `Is is...${Math.round(
              (min + max) / 2
            )}?\n> Enter y for yes and n for no. **THIS IS IF LOW`
          );
          humanResponse2 = humanResponse2.toLowerCase();
          computerGuess = Math.round((min + max) / 2);
          num = num + 1;
        } else if (highLow === `h`) {
          min = computerGuess;
          humanResponse2 = await ask(
            `Is is...${Math.round((max - min)/2)}***humanResponse2?\n> Enter y for yes and n for no.**THIS IS IF HIGH` 
          );
          humanResponse2 = humanResponse2.toLowerCase();
          num = num + 1;
          computerGuess = Math.round((min + max) / 2);
        }
      }
    }
    process.exit();
  }
}
