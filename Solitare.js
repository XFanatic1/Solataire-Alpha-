const audio = new Audio('cardDraw.wav')
const backgroundMusic = new Audio('bensound-thelounge.mp3')
const shuffleing = new Audio('shuffling-cards-1.wav')

backgroundMusic.play()

let cardIndex = 0
let deck = ['aS','aD','aC','aH','kS','kD','kC','kH','qS','qD','qC','qH','jS','jD','jC','jH','0S','0D','0C','0H','9S','9D','9C','9H'
,'8S','8D','8C','8H','7S','7D','7C','7H','6S','6D','6C','6H','5S','5D','5C','5H','4S','4D','4C','4H','3S','3D','3C','3H','2S','2D','2C','2H'];
const hierechy = ['k','q','j','0','9','8','7','6','5','4','3','2','a']

let ShuffledDeck = deck;
let column1 = []
let column2 = []
let column3 = []
let column4 = []
let column5 = []
let column6 = []
let column7 = []
let cardsColumns = [column1,column2,column3,column4,column5,column6,column7]
let aceColumn1 = []
let aceColumn2 = []
let aceColumn3 = []
let aceColumn4 = []
const aceSuits = ['C','D','H','S']
let aceStacks = [aceColumn1,aceColumn2,aceColumn3,aceColumn4]
let selectedCard //start
let theColor
let preSlot
let theStack = []
let preTheCard
let dummy = false
document.getElementById('aceSlot1').onclick = function() {selectCard(false,false,1,true)}
document.getElementById('aceSlot2').onclick = function() {selectCard(false,false,2,true)}
document.getElementById('aceSlot3').onclick = function() {selectCard(false,false,3,true)}
document.getElementById('aceSlot4').onclick = function() {selectCard(false,false,4,true)}
document.getElementById('btn').onclick = function() {unSelect()}
function shuffle(array) {
    let ii = array.length, i;
    while (ii != 0) {
      i = Math.floor(Math.random() * ii)
      ii--;
      [array[ii], array[i]] = [
        array[i], array[ii]];
    }
    return array; //28
}
function getColor (theCard) {
  if ((theCard[1] === 'S') || (theCard[1] === 'C')) {
    return 0
  } else {
    return 1
  }
}
shuffle(ShuffledDeck)
for (let i = 1; i < 8; i++) {
  for (let ii = 0; ii < i; ii++) {
    cardsColumns[i-1][ii] = ShuffledDeck[ShuffledDeck.length-1]
    ShuffledDeck.pop()
  }
  // console.log(cardsColumns[i-1][cardsColumns[i-1].length - 1])
  document.getElementById('slot' + i).lastElementChild.src = cardsColumns[i-1][cardsColumns[i-1].length - 1] + '.png'
  document.getElementById('slot' + i).lastElementChild.onclick = function() {selectCard(cardsColumns[i-1][cardsColumns[i-1].length - 1],true, i)}
}
function appendClone(card, slot, ace=false) {
  let elem = document.getElementById('dummy');
  let clone = elem.cloneNode(true);
  clone.src = card + '.png'
  let x = card
  clone.onclick = function() {selectCard(x,true, slot)}
  clone.id = x
  if (ace) {
    let count = -270
    document.getElementById('aceSlot' + slot).appendChild(clone)
    clone.style = '--main-color: ' + (count) + 'px;'
  } else {
    var count = -20
    if (cardsColumns[slot-1]) {
      count = (document.getElementById('slot' + slot).childElementCount * 30) -20
    }
    document.getElementById('slot' + slot).appendChild(clone)
    clone.style = '--main-color: ' + (count) + 'px;'
  }
}
function selectCard(theCard, placedOnAble = false, slot = '',ace,empty=false) {
  console.log(theCard)
  if (empty) {
    if ((selectedCard[0] === 'k') && (theCard !== selectedCard)) {
      console.log(preSlot,slot)
      if (!preSlot) { //move card begins
        cardIndex--
        ShuffledDeck.splice(ShuffledDeck.indexOf(selectedCard), 1)
        document.getElementById('cardPile').src = ''
        appendClone(selectedCard, slot)
        cardsColumns[slot-1].push(selectedCard)
        if (document.getElementById('slot' + slot).lastChild.previousElementSibling !== undefined) {
          document.getElementById('slot' + slot).lastChild.previousElementSibling.onclick = function() {selectCard(cardsColumns[slot-1][cardsColumns[slot-1].length-2],true, slot)}
        }
      } else {
        var hit = false
        for (let i = 0; i < cardsColumns[preSlot-1].length; i++) { //this makes cards into a stack of cards into a array
          if (selectedCard === cardsColumns[preSlot-1][i]) {
            preTheCard = i
            hit = true
          }
          if (hit) {
            theStack.push(cardsColumns[preSlot-1][i]) 
          }
        }
        for (let i = 0; i < cardsColumns[preSlot-1].length; i++) { //this makes cards into a stack of cards into a array
          if (selectedCard === cardsColumns[preSlot-1][i]) { // make this optimized later
            if (document.getElementById('slot' + preSlot).children[i-1] !== undefined) {
              document.getElementById('slot' + preSlot).children[i-1].src = cardsColumns[preSlot-1][i-1] + '.png'
              document.getElementById('slot' + preSlot).children[i-1].onclick = function() {selectCard(cardsColumns[preSlot-1][i-1],true, preSlot)}
            }
          }
        }
        for (let i = 0; i < theStack.length; i++) {
          cardsColumns[slot-1].push(theStack[i])
          cardsColumns[preSlot-1].pop(theStack[i])
          document.getElementById('slot' + preSlot).lastElementChild.remove()
          appendClone(theStack[i], slot)
        }
        theStack = []
      } // mov card ends
    }
  } else {
    if (ace) { // make sure thats it the last child of slot   
      if ((selectedCard[0] === 'a') || (hierechy[(hierechy.indexOf(aceStacks[slot-1][aceStacks[slot-1].length-1][0])-1)] === selectedCard[0])) {
        if ((selectedCard[1] === aceSuits[slot-1])) {
          if (preSlot) {
            if (selectedCard === cardsColumns[preSlot-1][cardsColumns[preSlot-1].length-1]) { //check to see if last child
              cardsColumns[preSlot-1].splice(cardsColumns[preSlot-1].indexOf(selectedCard), 1)
              aceStacks[slot-1].push(selectedCard)
              appendClone(selectedCard,slot,true)
              document.getElementById('slot' + preSlot).lastElementChild.remove()
              if (document.getElementById('slot' + preSlot).children[cardsColumns[preSlot-1].length-1] !== undefined) {
                document.getElementById('slot' + preSlot).children[cardsColumns[preSlot-1].length-1].src = cardsColumns[preSlot-1][cardsColumns[preSlot-1].length-1] + '.png'
                document.getElementById('slot' + preSlot).children[cardsColumns[preSlot-1].length-1].onclick = function() {selectCard(cardsColumns[preSlot-1][cardsColumns[preSlot-1].length-1],true, preSlot)}
              }

              if (!cardsColumns[preSlot-1][0]) {
                console.log('found empty slot!')
                document.getElementById('slot' + preSlot).onclick = function() {selectCard(false,false,z,false,true)}
              }
            }
          } else {
            cardIndex--
            ShuffledDeck.splice(ShuffledDeck.indexOf(selectedCard), 1)
            aceStacks[slot-1].push(selectedCard)
            appendClone(selectedCard,slot,true)
            document.getElementById('cardPile').src = ''
          }
          console.log(cardsColumns)
          selectedCard = ''
          if ((aceStacks[0][12]) && (aceStacks[1][12]) && (aceStacks[2][12]) && (aceStacks[3][12])) {
            alert('Poggers You Won!')
          }
        }
      }
    } else {
      if ((selectedCard) && (theCard !== selectedCard) && placedOnAble) {
        if (getColor(selectedCard) !== getColor(theCard)) {
          if (hierechy[(hierechy.indexOf(theCard[0])+1)] === selectedCard[0]) {
            //for the deck only
            //splice one from the card collumns too!
            if (!preSlot) { //move card begins
              cardIndex--
              ShuffledDeck.splice(ShuffledDeck.indexOf(selectedCard), 1)
              document.getElementById('cardPile').src = ''
              appendClone(selectedCard, slot)
              cardsColumns[slot-1].push(selectedCard)
              if (document.getElementById('slot' + slot).lastChild.previousElementSibling !== undefined) {
                document.getElementById('slot' + slot).lastChild.previousElementSibling.onclick = function() {selectCard(cardsColumns[slot-1][cardsColumns[slot-1].length-2],true, slot)}
              }
            } else {
              var hit = false
              for (let i = 0; i < cardsColumns[preSlot-1].length; i++) { //this makes cards into a stack of cards into a array
                if (selectedCard === cardsColumns[preSlot-1][i]) {
                  preTheCard = i
                  hit = true
                }
                if (hit) {
                  theStack.push(cardsColumns[preSlot-1][i]) 
                }
              }
              for (let i = 0; i < cardsColumns[preSlot-1].length; i++) { //this makes cards into a stack of cards into a array
                if (selectedCard === cardsColumns[preSlot-1][i]) { // make this optimized later
                  let c = cardsColumns[slot-1][cardsColumns[slot-1].length-1]
                  if (document.getElementById('slot' + preSlot).children[i-1] !== undefined) {
                    document.getElementById('slot' + preSlot).children[i-1].src = cardsColumns[preSlot-1][i-1] + '.png'
                    document.getElementById('slot' + preSlot).children[i-1].onclick = function() {selectCard(cardsColumns[preSlot-1][i-1],true, preSlot)}
                  }
                  if (document.getElementById('slot' + slot).lastElementChild !== undefined) {
                    document.getElementById('slot' + slot).lastElementChild.onclick = function() {selectCard(c,true, slot)}
                  }
                }
              }
              for (let i = 0; i < theStack.length; i++) {
                cardsColumns[slot-1].push(theStack[i])
                cardsColumns[preSlot-1].pop(theStack[i])
                document.getElementById('slot' + preSlot).lastElementChild.remove()
                appendClone(theStack[i], slot)
              }
              theStack = []
              if (!cardsColumns[preSlot-1][0]) {
                console.log('found empty slot!')
                document.getElementById('slot' + preSlot).onclick = function() {selectCard(false,false,preSlot,false,true)}
              }
            } // mov card ends
          }
        }
      } else {
        console.log(cardsColumns)
        preSlot = slot
        selectedCard = theCard
      }
    }
  }
  
}
function music() {
  backgroundMusic.play()
}
function unSelect () {
  selectedCard = ''
  console.log('unselected')
}
function sound() {
  var audio2 = audio.cloneNode();
  audio2.play()
}
function drawCard() {
  console.log(ShuffledDeck)
  unSelect ()
  if (cardIndex === -1) {
    shuffleing.play()
  }
  cardIndex++
  console.log(ShuffledDeck[cardIndex])
  console.log(cardIndex)
  if (!ShuffledDeck[cardIndex]) {
    document.getElementById('cardPile').src = ''
  } else {
    document.getElementById('cardPile').onclick = function() {selectCard(ShuffledDeck[cardIndex])}
    document.getElementById('cardPile').src = ShuffledDeck[cardIndex] + '.png'
  }
  if (cardIndex >= ShuffledDeck.length) {
    console.log('set to zero')
    cardIndex = -1
  }
}


