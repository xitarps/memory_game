const path = './assets/'
const type = '.png';
const cardBase = ['bowser','luigi','mario','peach','toad','yoshi'];
let cards1 = [...cardBase];
let cards2 = [...cardBase];
const box = 'box';

const $ = selector => document.querySelector(selector);

let gameCards = [];

let domCards;



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
  domCards = document.querySelectorAll('.card')
}

//add flip function to each card at the DOM
function addFlipToCards(){
  domCards.forEach(domCard => {
    domCard.addEventListener('click', flipCard);
  });
}

//flip the card
function flipCard(){
  this.classList.toggle('flip');
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