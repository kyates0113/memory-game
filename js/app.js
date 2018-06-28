/*
 * Create a list that holds all of your cards
 */
deckCards = []

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// event listener - <event-target>.addEventListener(<event-to-listen-for>, <function-to-run-when-an-event-happens>);


//flip cards
const wholeDeck = document.querySelector('.deck')
wholeDeck.addEventListener('click', function(event) {
  const clickTarget = event.target;
  if (clickTarget.classList.contains('card')
      && cardList.length <2
      && !cardList.includes(clickTarget)
      && !clickTarget.classList.contains('match'))
      {
    flipCard(clickTarget);
    addCardToList(clickTarget);
    if (cardList.length === 2) {
      addMove();
      cardsMatch();
      checkScore();
    };
  }
});

//flips a card by toggling class
function flipCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
};

//build a blank list to keep the open cards
let cardList = [];

//add cards to that list when clicked
function addCardToList(clickTarget){
  cardList.push(clickTarget);
  console.log(cardList);
};

//check if this cards in the list match and clears the list
let matches = 0;
function cardsMatch () {
  if(
      cardList[0].firstElementChild.className ===
      cardList[1].firstElementChild.className
  ) {
      cardList[0].classList.toggle('match');
      cardList[1].classList.toggle('match');
      cardList = [];
      console.log("match");
      matches = matches +1;

    } else {
      setTimeout(function() {
        flipCard(cardList[0]);
        flipCard(cardList[1]);
        cardList = [];
      }, 1000);
    }
}

//move counter to count moves and replace text
let moveCount = 0;
function addMove(){
  moveCount++;
  const numMovesText = document.querySelector('.moves');
  numMovesText.innerHTML = moveCount;
};

//reduce stars as more moves happen
function checkScore(){
  if (moveCount === 7 || moveCount === 21 || moveCount === 14) {
    removeStar();
  }
}
function removeStar() {
  const stars = document.querySelectorAll('.stars li');
  for (star of stars) {
    if(star.style.display !== 'none'){
      star.style.display = 'none';
      break;
    }
  }
}

//set timer by listening for first click on deck and then incrmeenting secs
var time = 0;
wholeDeck.addEventListener('click', function(event) {
  console.log("firstClick");
  increment();
}, {once : true});
function increment(){
        setTimeout(function(){
            time++;
            var mins = Math.floor(time/10/60);
            var secs = Math.floor(time/10 % 60);
            if(mins < 10){
                mins = "0" + mins;
            }
            if(secs < 10){
                secs = "0" + secs;
            }
            document.getElementById("clock").innerHTML = mins + ":" + secs;
            increment();
        },100)
};
//reset game functionality
function resetGame(){
  resetClock();
  resetBoard();
  resetStars();
  resetMoves();
  console.log("reset");
};
function resetClock(){
  document.getElementById("clock").innerHTML = "00.00";
};


function resetBoard(){
  const deckReset =  document.querySelector(".deck");
  deckReset.classList.toggle('open');
  deckReset.classList.toggle('show');
  deckReset.classList.toggle('match');
};
function resetStars(){
  const stars = document.querySelector('.stars li');
  stars.style.display = "";
};
function resetMoves(){
  const numMovesText = document.querySelector('.moves');
  numMovesText.innerHTML = "0";
};
const replay = document.querySelector('.restart');
replay.addEventListener('click', resetGame);

//modal pop up if game is over, or all matches are found.
// var modal = document.querySelector(".modal");
// var closeButton = document.querySelector(".close-button");
// function toggleModal() {
//      modal.classList.toggle("show-modal");
// }
// closeButton.addEventListener("click", toggleModal);
// const totalMatches = 2;
// if(matches === totalMatches) {
//    toggleModal()
//   };
