const hiddenText = document.getElementById("hiddenstate");
const buttons = document.querySelectorAll('.square');
const text = document.getElementById("state");
const start = document.getElementById('hiddenstate2');
let randomNumber;
let colors = ['purple', 'blue', 'red', 'yellow'];
let validSequence = [];
let guessingSequence = [];
let highestScore = 0;
let totalHighestScore = 0;

hiddenText.style.display = 'none';

buttons.forEach(button => button.addEventListener("click", clickHandle));

start.addEventListener('click', startGame);

function clickHandle(event) {
   //GET ID OF THE CLICKED BUTTON
   let clicked = event.target.id;

   fade(event.target);

   //COMPARE THE ID WITH LAST ELEMENT OF ARRAY
   if (clicked == guessingSequence[0]) {
      if (guessingSequence.length === 1) {
         //NEW SQUARE
         guessingSequence.shift()
         setTimeout(() => {
            initialize();
         }, 1000);

         highestScore ++;

         console.log('done');
      } else {
         guessingSequence.shift();
         //GAME STILL ON
      }

      playSound(clicked);
      
   } else {
      let wrongButton = 'wrong';
      playSound(wrongButton);
      //GAME OVER
      if (highestScore > totalHighestScore) {
         totalHighestScore = highestScore;
      }
      text.textContent = "Highest score: " + totalHighestScore;
      guessingSequence = [];
      hiddenText.style.display = 'block';

      hiddenText.addEventListener('click', restart);
   }
}

function initialize() {
   addSquare();
   console.log(validSequence);

   //FADE THEM ALL
   for (let i = 0; i < validSequence.length; i++) {
      const tempButton = document.getElementById(validSequence[i]);
      fadeWithDelay(tempButton, i*350);
   }
}

function startGame() {
   addSquare();
   for (let i = 0; i < validSequence.length; i++) {
      const tempButton = document.getElementById(validSequence[i]);
      fadeWithDelay(tempButton, i*350);
   }

   start.style.display = 'none';
   text.textContent = 'Focus now!';
}

function addSquare() {
   randomNumber = Math.floor(Math.random()*4);
   new_color = colors[randomNumber];
   validSequence.push(new_color);
   guessingSequence = validSequence.slice();
}

function fade(square) {
   $(square).fadeIn(100).fadeOut(100).fadeIn(100);
}

function fadeWithDelay (square, delay) {
   setTimeout(() => {
      fade(square);
      playSound(square.id);
   }, delay);
}

function restart() {
   validSequence = []; 
   guessingSequence = []; 
   hiddenText.style.display = 'none';
   text.textContent = 'Focus now!';
   setTimeout(() => {
      initialize();
   }, 1000);

   highestScore = 0;
}

function playSound(color) {
   let sound = new Audio('sounds/' + color + '.mp3');
   sound.play();
}
