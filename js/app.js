/*
 * Create a list that holds all of your cards
 */


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
function cardsMatch () {
  if(
      cardList[0].firstElementChild.className ===
      cardList[1].firstElementChild.className
  ) {
      cardList[0].classList.toggle('match');
      cardList[1].classList.toggle('match');
      cardList = [];
      console.log("match");
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
