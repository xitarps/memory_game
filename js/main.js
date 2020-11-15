const path = './assets/'
const type = '.png';
const cardBase = ['bowser','luigi','mario','peach','toad','yoshi'];
let cards1 = [...cardBase];
let cards2 = [...cardBase];
const box = 'box';

const $ = selector => document.querySelector(selector);

let gameCards = [];

let messages = $('.messages');
let domCards;

let hasFlippedCard = false;
let firstCard, secondCard;

let matches = 0;
let mismatches = 0;
let score = 0;



//   ====   Game   ====
window.onload = ()=>{
  startGame();
}




//shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    let t = array[i];
    array[i] = array[j];
    array[j] = t
  }
}

//shuffle and build game deck
function distributeCards(deck1,deck2){

  while(deck1.length > 0 || deck2.length > 0){
    if(Math.random() >= 0.5){

      if(deck1.length >= 0){
        shuffle(deck1)
        gameCards.push(deck1.pop());
      }

    }else{

      if(deck1.length >= 0){
        shuffle(deck2)
        gameCards.push(deck2.pop());
      }

    }
  }
}

//Add deck to DOM
function appendCards(){
    gameCards = gameCards.filter((card)=>card!=undefined)
    gameCards.forEach(card => {
      generateCard(card)
    });
}

//Append single card to DOM
function generateCard(cardname,back='box'){
  let div = document.createElement('div');
  div.classList.add('card');

  let imgFront = document.createElement('img');
  let imgBack = document.createElement('img');

  imgFront.classList.add("card-front")
  imgBack.classList.add("card-back")

  imgFront.alt = "face da carta"
  imgBack.alt = "back da carta"

  imgFront.src = `${path}${cardname}${type}`
  imgBack.src = `${path}${back}${type}`

  div.appendChild(imgFront)
  div.appendChild(imgBack)

  $('.memory-game').appendChild(div)
}

//reset decks
function rebuildDecks(){
  gameCards = []
  cards1 = [...cardBase];
  cards2 = [...cardBase];
}

//clear Dom
function clearTable(){
  $('.memory-game').innerHTML = ''
}

//get cards from DOM
function getDomCards(){
  domCards = [...document.querySelectorAll('.card')]
}

//add flip function to each card at the DOM - using array domCards
function addFlipToCards(){
  domCards.forEach(domCard => {
    domCard.addEventListener('click', flipCard);
  });
}
//remove flip function to each card at the DOM - using array domCards
function removeFlipFromCards(){
  domCards.forEach(domCard => {
    domCard.removeEventListener('click', flipCard);
  });
}

//remove single flip
function removeSingleflipFrom(card){
  card.removeEventListener('click', flipCard);
}

//reset user control -flip
function resetFlipAction(){
  removeFlipFromCards();
  addFlipToCards();
}

//flip the card
function flipCard(){
  this.classList.add('flip');
  if(!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
    removeSingleflipFrom(firstCard)
    return;
  }
  secondCard = this;
  removeFlipFromCards(); //prevent user to go on clicking other cards util check match
  checkIfMatch(firstCard,secondCard)
}

//check if selected cards match
function checkIfMatch(){
  
  let card1Name = firstCard.childNodes[0].src.split('/').pop()
  card1Name = card1Name.split('.').shift()

  let card2Name = secondCard.childNodes[0].src.split('/').pop()
  card2Name = card2Name.split('.').shift()

  if(card1Name == card2Name){
    matches++;
    updateScore();
    domCards = domCards.filter((card)=>card.firstChild.src.split('/').pop().split('.').shift() != card1Name )// prevent multi click / bug
    resetFlipAction();//allows user to keep selecting cards
  }else{
    mismatches++;
    updateScore();
    setTimeout(() => {
      unFlipCards();
      resetFlipAction();//allows user to keep selecting cards
    }, 1000);
  }

  hasFlippedCard = false;
  
  if(domCards <=0)gameOver();
}

//update/view score
function updateScore(){
  messages.innerHTML = `Acertos: ${matches} - Erros: ${mismatches}`
}

//unflip cards
function unFlipCards(){
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip')
  firstCard = null;
  secondCard = null;
}

//build game
function startGame(){
  distributeCards(cards1,cards2);
  appendCards();
  getDomCards();
  addFlipToCards();
}

//destroy game
function clearGame(){
  clearTable();
  rebuildDecks();
}

//When reach the end of the game
function gameOver(){
  
}