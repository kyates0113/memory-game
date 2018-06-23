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
  if (clickTarget.classList.contains('card') && cardList.length <2) {
    flipCard(clickTarget);
    addCardToList(clickTarget);
    cardsMatch();
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

//


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
