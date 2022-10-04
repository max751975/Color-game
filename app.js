const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let noClicking = false;
let cardsFlipped = 0;
let clickCounter = 0;
const moveCounter = document.querySelector('#counter');
const startBtn = document.querySelector('#start');

const COLORS = [
    "#FF0039",
    "orange",
    "#057DCD",
    "limegreen",
    "#FEFF60",
    "#603F8B",
    "magenta",
    "teal",
    "#FF0039",
    "orange",
    "#057DCD",
    "limegreen",
    "#FEFF60",
    "#603F8B",
    "magenta",
    "teal"
];

moveCounter.innerText = `Clicks: 0;  Matches found: 0`;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
 
}



// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  clickCounter++;
  moveCounter.innerText = `Clicks: ${clickCounter}, Matches found: ${cardsFlipped/2}`;
  if (noClicking) return;
  if (event.target.classList.contains('clicked')) return;
  
  const currentCard = event.target;
  currentCard.style.removeProperty('background-image');
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add('clicked');
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;

    let temp1 = card1.className;
    let temp2 = card2.className;

    if (temp1 === temp2) {
      cardsFlipped +=2;
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
      moveCounter.innerText = `Clicks: ${clickCounter}, Matches found: ${cardsFlipped/2}`;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1.classList.remove('clicked');
        card2.classList.remove('clicked');
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 500);
    }

  }

  // if (cardsFlipped === COLORS.length) alert('Game Over');
  if (cardsFlipped === COLORS.length) {
    gameContainer.innerHTML = `<h2>You won!<br> Total Matches: ${cardsFlipped/2}<br> Total clicks: ${clickCounter}</h2>`;
  }

}
startBtn.addEventListener('click', function(){
  // alert('You clicked start');
  gameContainer.innerHTML = '';
  card1 = null;
  card2 = null;
  noClicking = false;
  cardsFlipped = 0;
  clickCounter = 0;
  createDivsForColors(shuffledColors);
});
// when the DOM loads
createDivsForColors(shuffledColors);

/* */