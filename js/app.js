//list of all cards
var cards = ['fa-anchor', 'fa-diamond', 'fa-paper-plane-o', 'fa-bicycle', 'fa-leaf', 'fa-bolt', 'fa-bomb', 'fa-cube',
            'fa-anchor', 'fa-diamond', 'fa-paper-plane-o', 'fa-bicycle', 'fa-leaf', 'fa-bolt', 'fa-bomb', 'fa-cube'];
let cardList = [];
const totalMatches = 8;
let matches = 0;
//start game and shuffle/generate all cards in the deck
function generateCard(card) {
    return `<li class="card"><i class="fa ${card}"></i></li>`;
};

function initGame() {
  var deck = document.querySelector('.deck');
  var cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  deck.innerHTML =cardHTML.join('');
};
initGame();

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


//flip cards if they're a match
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

//initial flips a card by toggling class
function flipCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
};

//add cards to the array cardList when clicked
function addCardToList(clickTarget){
  cardList.push(clickTarget);
  console.log(cardList);
};

//check if this cards in the list match and clears the list, add to matches
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
      checkMatches();
      setStats();
    } else {
      setTimeout(function() {
        flipCard(cardList[0]);
        flipCard(cardList[1]);
        cardList = [];
      }, 1000);
    }
};


//move counter to count moves and replace text in the html with # Moves
let moveCount = 0;
function addMove(){
  moveCount++;
  const numMovesText = document.querySelector('.moves');
  numMovesText.innerHTML = moveCount;
};

//reduce stars as more moves happen
function checkScore(){
  if (moveCount === 2 || moveCount === 21 || moveCount === 14) {
    removeStar();
  }
}

var starRating = 3;
function removeStar() {
  const stars = document.querySelectorAll('.stars li');
  for (star of stars) {
    if(star.style.display !== 'none'){
      star.style.display = 'none';
      starRating --;
      break;
    }
  }
}

//set timer by listening for first click on deck and then incrmeenting secs
let time = 0;
const replay = document.querySelector('.restart');
wholeDeck.addEventListener('click', function(event) {
  console.log("firstClick");
  replay.addEventListener('click', resetGame);
  increment();
}, {once : true});

var trackTime = null;
var mins;
var secs;

function increment(){
        trackTime = setTimeout(function(){
            time++;
            mins = Math.floor(time/10/60);
            secs = Math.floor(time/10 % 60);
            if(mins < 10){
                mins = "0" + mins;
            }
            if(secs < 10){
                secs = "0" + secs;
            }
            document.getElementById("clock").innerHTML = mins + ":" + secs;

            increment();
        },100);
};

//stop timer & reset clock
function resetClock(){
  document.getElementById("clock").innerHTML = "00.00";
  time = 0;

  wholeDeck.addEventListener('click', function(event) {
    console.log("firstClick");
    replay.addEventListener('click', resetGame);
    increment();
  }, {once : true});
};

function removeResetListener() {

}

function stopClock() {
  clearTimeout(trackTime);
};

//reset functionality - show stars again, reset moves,
function resetStars(){
  const stars = document.querySelectorAll('.stars li');
  for (star of stars) {
    star.style.display = 'inline-block';
  }
};

function resetMoves(){
  const numMovesText = document.querySelector('.moves');
  numMovesText.innerHTML = "0";
  moveCount = 0;
};

//reset all game items
function resetGame(){
  // stopClock();
  resetClock();
  replay.removeEventListener('click', resetGame);
  resetStars();
  resetMoves();
  initGame();
  console.log("reset");
  matches = 0;
  starRating = 3;
  cardList = [];
};


//replay button event listener


//modal pop up if game is over(when all matches are found)
var modal = document.querySelector(".modal");

function toggleModal() {
  modal.classList.toggle("show-modal");
    stopClock();
};

function checkMatches() {
  if(matches === totalMatches) {
    toggleModal();
    console.log("checking matches");
    };
};



//make modal buttons work
var closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", toggleModal);

var okButton = document.querySelector("#ok");
okButton.addEventListener("click", toggleModal);

var restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", function() {
  toggleModal();
  resetGame();
});

// add ratings to modal buttons
var modalTime = document.querySelector(".time");
var modalRating = document.querySelector(".rating");
function setStats() {
  // need to change html of these to be actual time and stars
  modalRating.innerHTML= 'Stars: ' + starRating;
  modalTime.innerHTML =  'Time: ' + mins + ':' + secs;
};
