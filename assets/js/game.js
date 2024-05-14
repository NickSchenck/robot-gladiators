/* GAME FUNCTIONS */

// function to generate a random numeric value
function randomNumber(min, max) {
    let value = Math.floor(Math.random() * (max - min) + min);
  
    return value;
  };
  
  // function to check if player wants to fight or skip
function fightOrSkip() {
    // ask player if they'd like to fight or run
    let promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    // validate prompt answer
    if (promptFight === `` || promptFight === null) {
      window.alert(`You need to provide a valid answer! Please try again.`);
      // uses return to call the function again and stop the rest of the function from running
      return fightOrSkip();
    };
  
    // convert promptFight to all lowercase so we can validate input easier
    promptFight = promptFight.toLowerCase();
  
    if (promptFight === `skip`) {
      // confirm player wants to skip, triggered by progressing promptFight to the SKIP option
      let confirmSkip = window.confirm(`Are you sure you'd like to skip?`);
  
      // if true, leave fight
      if (confirmSkip) {
        window.alert(`${playerInfo.name} has decided to skip this fight.`);
        // subtract money from playerMoney for skipping, but don't let them go into the negative
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        // stop while() loop using break; and enter next fight
  
        // return true if player wants to leave
        return true;
      };
    };
    return false;
  };
  
  // fight function (now with parameter for enemy's object holding name, health, and attack values)
function fight(enemy) {
    // keep track of who goes first
    let isPlayerTurn = true;
  
    // randomly change turn order
    if (Math.random() > 0.5) {
      isPlayerTurn = false;
    };
  
    while (playerInfo.health > 0 && enemy.health > 0) {
      if (isPlayerTurn) {
        // ask player if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
          // if true, leave fight by breaking loop. fightOrSkip only evals to true if SKIP option was chosen
          break;
        }
        //remeber, randomNumber is a function
        let damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
  
        // remove enemy's health by subtracting the amount we set in the damage variable
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(`${playerInfo.name} attacked ${enemy.name}. ${enemy.name} now has ${enemy.health} health remaining.`);
  
        // check enemy's health
        if (enemy.health <= 0) {
          window.alert(`${enemy.name} has died!`);
  
          // award player money for winning
          playerInfo.money = playerInfo.money + 20;
  
          // leave while() loop since enemy is dead
          break;
        } else {
          window.alert(`${enemy.name} still has ${enemy.health} health left.`);
        }
        // player gets attacked first
      } else {
        let damage = randomNumber(enemy.attack - 3, enemy.attack);
  
        // remove enemy's health by subtracting the amount we set in the damage variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(`${enemy.name} attacked ${playerInfo.name}. ${playerInfo.name} now has ${playerInfo.health} health remaining.`);
  
        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(`${playerInfo.name} has died!`);
          // leave while() loop if player is dead
          break;
        } else {
          window.alert(`${playerInfo.name} still has ${playerInfo.health} health left.`);
        }
      }
      // switch turn order for next round, likely going to randomize this
      isPlayerTurn = !isPlayerTurn;
    }; // end of while loop
  }; // end of fight function
  
  // function to start a new game
function startGame() {
    // reset player stats
    playerInfo.reset();
  
    // fight each enemy robot by looping over them and fighting them one at a time
    for (let i = 0; i < enemyInfo.length; i++) {
      // check player stats
      console.log(playerInfo);
  
      // if player is still alive, keep fighting
      if (playerInfo.health > 0) {
        // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        //Edit #1 - changing this string into template literal as to match the rest of file
        window.alert(`Welcome to Robot Gladiators! Round ${i + 1}, fight!`/*"Welcome to Robot Gladiators! Round " + (i + 1)*/);
  
        // pick new enemy to fight based on the index of the enemyInfo array
        let pickedEnemyObj = enemyInfo[i];
  
        // set health for picked enemy
        pickedEnemyObj.health = randomNumber(40, 60);
  
        console.log(pickedEnemyObj);
  
        // pass the pickedEnemyObj object variable's value into the fight function, where it will assume the value of the enemy parameter
        fight(pickedEnemyObj);
  
        // if player is still alive after the fight and we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
          // ask if player wants to use the store before next round
          let storeConfirm = window.confirm(`The fight is over, visit the store before the next round?`);
  
          // if yes, take them to the store() function
          if (storeConfirm) {
            shop();
          }
        }
      }
      // if player is not alive, break out of the loop and let endGame function run
      else {
        window.alert(`You have lost your robot in battle! Game Over!`);
        break;
      }
    }
  
    // after loop ends, we are either out of player.health or enemies to fight, so run the endGame function
    endGame();
  };
  
  // function to end the entire game
function endGame() {
    window.alert(`The game has now ended. Let's see how you did!`);
  
    // check localStorage for high score, if it's not there, use 0
    let highScore = localStorage.getItem(`highscore`);
    if (highScore === null) {
      highScore = 0;
    }
  
    // if player has more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
      localStorage.setItem(`highscore`, playerInfo.money);
      localStorage.setItem(`name`, playerInfo.name);
  
      alert(`${playerInfo.name} now has the highscore of ${playerInfo.money}!`);
    } else {
      alert(`${playerInfo.name} did not beat the highscore of ${highScore}.`);
    }
  
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm(`Would you like to play again?`);
  
    if (playAgainConfirm) {
      startGame();
    } else {
      window.alert(`Thank you for playing Robot Gladiators! Come back soon!`);
    }
  };
  
  // go to shop between battles function
function shop() {
    // ask player what they'd like to do
    let shopOptionPrompt = window.prompt(`Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.`);
  
    // convert answer from prompt to an actual number
    shopOptionPrompt = parseInt(shopOptionPrompt);
  
    // use switch case to carry out action
    switch (shopOptionPrompt) {
      case 1:
        playerInfo.refillHealth();
        break;
      case 2:
        playerInfo.upgradeAttack();
        break;
      case 3:
        window.alert(`Leaving the store.`);
        break;
      default:
        window.alert(`You did not pick a valid option. Try again.`);
        shop();
        break;
    }
  };
  
  // function to set name
function getPlayerName() {
    let name = ``;
  
    while (name === `` || name === null) {
      name = prompt(`What is your robot's name?`);
    }
    console.log(`Your robot's name is ${name}.`);
    return name;
  };
  
  /* END GAME FUNCTIONS */
  
  /* GAME INFORMATION / VARIABLES */
  
  let playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
      this.health = 100;
      this.money = 10;
      this.attack = 10;
    },
    refillHealth: function() {
      if (this.money >= 7) {
        window.alert(`Refilling player's health by 20 for 7 dollars.`);
        this.health += 20;
        this.money -= 7;
      } else {
        window.alert(`You don't have enough money!`);
      }
    },
    upgradeAttack: function() {
      if (this.money >= 7) {
        window.alert(`Upgrading player's attack by 6 for 7 dollars.`);
        this.attack += 6;
        this.money -= 7;
      } else {
        window.alert(`You don't have enough money!`);
      }
    }
  };
  
  var enemyInfo = [
    {
      name: `Roborto`,
      attack: randomNumber(10, 14)
    },
    {
      name: `Amy Android`,
      attack: randomNumber(10, 14)
    },
    {
      name: `Robo Trumble`,
      attack: randomNumber(10, 14)
    }
  ];
  
  /* END GAME INFORMATION / VARIABLES */
  
  /* RUN GAME */
  startGame();
  