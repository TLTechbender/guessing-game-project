const readline = require('node:readline');
// This reads creates an interface to read input and output,
// and this case out interface will be the terminal.
const rl = readline.createInterface({
    input: process.stdin,
    output : process.stdout
});

/*The askLimit() function is the initializer function,
 * It's the beginning of the program, It asks for how many turns the user wants at guessing*/
function askLimit(){
    rl.question("How many turns you want at guessing? ", attempts=>{
       let numAttempts = Number(attempts);
          askRange(numAttempts);
    });
};


/*The askLimit() function calls the askRange() function which is the second function in this call tree,
 * The askRange() function takes in numAttempts as the number of turns the user wants and then proceeds to ask the user for the range of numbers the computer has to guess from*/


function askRange(numAttempts){
    rl.question("Enter a Max Number: ", answer1=>{
       let maxNum = Number(answer1);

        rl.question("Enter a Min Number: ", answer2=>{
        let minNum = Number(answer2);


            /*The if...else block in this section determines whether the user enters the wrong kind of number for any of the questions asked,I.e if the user mistakenly enters a higher numerical value for min and a lesser one for max, the computer knows this and asks the user to correct his/her mistake(s) and try again*/


            if(minNum < maxNum){
             console.log(`I'm thinking of a number between ${minNum} and ${maxNum}...`);

           let computerGuess= randomInRange(minNum, maxNum);

                /*At this point the askGuess function calls the randomInRange() function and assingns the output of that function to a variable*/

                askGuess(computerGuess,numAttempts);
            }

                 else{
                console.log("Error!!, Wrong input.... Please try again");
                 askRange(numAttempts);
            }

        });
    });

};


/* The randomInRange() function is called by askRange(),
 * and what it does is basically guess for a random value between already specified values given by the user*/

function randomInRange(min,max){
min = Math.ceil(min);
    max = Math.floor(max);
return Math.floor(Math.random() * (max - min +1)) + min;

}


/*The askGuess() function is the last function in this function tree,
 * It takes in the number already guessed by the computer and the number of attempts the user asked for.
 * It then uses the both values to determine is the user's guess and the computer's guess match, if they don't match, It allows the user to keep guessing until the user exhausts the number of attempts available*/

function askGuess(n,numAttempts){
if(numAttempts>0){// This has to be one of the most complicated conditional nests ever....


    /*The first if block has a lot of conditions in it,
 * but what it essentially does is to find out whether the number of attempts has not been reached*/


    rl.question("Enter your guess; ", myGuess=>{
        let myNum = Number(myGuess);
        if(n===myNum){
            console.log("Correct answer......... YOU Win!");
            rl.close();//Hooray the user wins!!!!!!!
        }else{
         /*This else block which is nested in this complicated if block makes sure that if the user guesses wrong,
    * It allows the user to keep trying until the user exhausts his/her number of attempts*/

            console.log("Awww snap!!, Your guess was incorrect!")
           numAttempts--;
            console.log(`You have ${numAttempts} attempt(s) left`)
            askGuess(n, numAttempts);
        }

    })


}

// This if techincally the base case for this function,
// when the user continues to guess wrongly and exhausts his/her available number of attempts, it ends the program.


else if(numAttempts<=0){
    console.log("You snooze, You lose!!!!!!!!!!!!");
    rl.close();
}

};



//


askLimit();// returns an output
