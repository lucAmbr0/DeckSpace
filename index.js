/* 
    DeckSpace - JavaScript Functions
    Made with <3 by @lucAmbr0 
*/

// ---------------  SERVICE WORKER  ---------------

serviceWorker();
function serviceWorker() {
  if ('serviceWorker' in navigator) {
    console.log('Service worker compatible');
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('https://lucambr0.github.io/DeckSpace/service_worker.js')
        .then(reg => {
          console.log('Service worker registered');
        })
        .catch(err => {
          console.log(err);
        })
    })
  }
}


// ---------------  FORCE CARD ASSETS PRE-LOAD  ---------------

const cardImages = [];
const seedNames = ["0", "1", "2", "3"];
for (let value = 1; value <= 13; value++) {
  for (let seed of seedNames) {
    cardImages.push(`assets/deck1/${value}.${seed}.png`);
  }
}
function preloadImages() {
  cardImages.forEach(src => {
    const img = new Image();
    img.src = src;  // Triggers the image to load
  });
}
window.onload = preloadImages();

// ---------------  DEBUG VARIABLES  ---------------

const startAnimation = true;
const openSettingsAtStart = false;
const startCards = 6;

function drawStartCards() {
  for (let i = 0; i < startCards; i++) drawRandomCard();
}


// ---------------  SPLASHSCREEN ANIMATION  ---------------

splashscreen();
function splashscreen() {
  if (!startAnimation) {
    try {
      document.getElementById("splashScreenBox").style.animation = "exitUp 0s ease-in-out forwards"
    }
    catch (e) {
      console.log(e);
    }
    return;
  }
  document.body.style.height = "100vh";
  setTimeout(() => {
    document.getElementById("splashScreenBox").style.animation = "exitUp 0.5s ease-in-out forwards"
  }, 1500);
}


// --------------- SETTINGS OPEN AT APP START ---------------

const settingsContainer = document.getElementById("settingsContainer");
if (openSettingsAtStart) openSettings();



// --------------- BALANCE / BETS - CONTROL BARS ---------------


// BALANCE BAR VARIABLES
const balanceControls = document.getElementById("balanceControlsContainer");
const userBalanceBtn = document.getElementById("userBalanceBtn");
const mirroredBalanceTxt = document.getElementById("mirroredBalanceTxt");
const userBalanceAmountContainer = document.getElementById("userBalanceAmountContainer");
const balanceButtons = balanceControls.querySelectorAll('button');

// BET BAR VARIABLES
const betControls = document.getElementById("betControlsContainer");
const userBetBtn = document.getElementById("userBetBtn");
const mirroredBetTxt = document.getElementById("mirroredBetTxt");
const userBetAmountContainer = document.getElementById("userBetAmountContainer");
const betButtons = betControls.querySelectorAll('button');

// ANIMATIONS VARIABLES
const barAnimation = "balanceControlsEntrance forwards ease-in-out .2s";
const buttonsAnimation = "buttonsZoomIn 0.2s ease-in-out forwards";

function toggleBalanceControls() {
  if (balanceControls.classList.contains("controlsHIDDEN")) {
    closeBetBar();
    openBalanceBar();
  }
  else
    closeBalanceBar();
}

function toggleBetControls() {
  if (betControls.classList.contains("controlsHIDDEN")) {
    closeBalanceBar();
    openBetBar();
  }
  else
    closeBetBar();
}

function openBalanceBar() {
  // Open bar
  balanceControls.classList.remove("controlsHIDDEN");
  userBalanceAmountContainer.style.animation = barAnimation;
  userBalanceAmountContainer.classList.remove("semiTransp");
  userBalanceBtn.parentElement.classList.add("userBalanceBtnACTIVE");
  // Buttons animation
  balanceButtons.forEach((button, index) => {
    button.style.animation = buttonsAnimation;
    button.style.animationDelay = `${(0.8 + index) * 0.05}s`;
  });
}

function closeBalanceBar() {
  balanceButtons.forEach((button, index) => {
    button.style.animation = "none";
  });
  balanceControls.classList.add("controlsHIDDEN");
  userBalanceBtn.parentElement.classList.remove("userBalanceBtnACTIVE");
  userBalanceAmountContainer.style.animation = "none";
  userBalanceAmountContainer.classList.add("semiTransp");
}

function openBetBar() {
  // Open bar
  betControls.classList.remove("controlsHIDDEN");
  userBetAmountContainer.style.animation = barAnimation;
  userBetAmountContainer.classList.remove("semiTransp");
  userBetBtn.parentElement.classList.add("userBalanceBtnACTIVE");
  // Buttons animation
  betButtons.forEach((button, index) => {
    button.style.animation = buttonsAnimation;
    button.style.animationDelay = `${(0.8 + index) * 0.05}s`;
  });
}

function closeBetBar() {
  betButtons.forEach((button, index) => {
    button.style.animation = "none";
  });
  betControls.classList.add("controlsHIDDEN");
  userBetBtn.parentElement.classList.remove("userBalanceBtnACTIVE");
  userBetAmountContainer.style.animation = "none";
  userBetAmountContainer.classList.add("semiTransp");
}


// --------------- BALANCE ACTION BUTTONS ---------------

// Variables
let balance = 0;
let appStartBalance = 150;
let allowNegativeBalance = false;
let defaultBalanceRemove = 10;
let defaultBalanceAdd = 10;
let maxBalance = 99999;
let minBalance = -99999;

// 0 = delete
// 1 = remove
// 2 = add
// 3 = edit

function balanceAction(i) {
  switch (i) {
    case 0:
      balanceDelete();
      break;
    case 1:
      balanceRemove(defaultBalanceRemove);
      break;
    case 2:
      balanceAdd(defaultBalanceAdd);
      break;
    case 3:
      balanceEdit();
      break;
    default:
      console.error("balanceAction argument doesn't exist");
      break;
  }
}

balance = appStartBalance
balanceWrite(appStartBalance);

function balanceDelete() {
  if (balance != 0) {
    balance = 0;
    balanceWrite(0);
  }
  else
    shakeElement(userBalanceBtn)
}

function balanceEdit() {
  let newBalance = parseInt(window.prompt("Insert new balance value (" + minBalance + " - " + maxBalance + ")"));
  if ((newBalance < 0 && !allowNegativeBalance) || newBalance < minBalance || newBalance > maxBalance || isNaN(newBalance)) {
    window.alert("Invalid amount");
  }
  else {
    balance = newBalance;
    balanceWrite(newBalance);
  }
}

function shakeElement(element) {
  element.style.animation = "shakeHorizontal 0.2s forwards";
  setTimeout(() => {
    element.style.animation = "none";
  }, 300);
}

function balanceRemove(amount) {
  if (!isNaN(amount))
    balanceChange(0 - amount);
  else console.error(amount + " is NaN");
}
function balanceAdd(amount) {
  if (!isNaN(amount))
    balanceChange(amount);
  else console.error(amount + " is NaN");
}

function balanceChange(change) {
  if (balance + change > maxBalance || balance + change < minBalance) {
    shakeElement(userBalanceBtn);
  }
  else if (balance + change >= 0 || allowNegativeBalance) {
    balance += change;
    balanceWrite(parseInt(userBalanceBtn.textContent) + change);
  }
  else if (balance + change < 0 && !allowNegativeBalance) {
    balance = 0;
    shakeElement(userBalanceBtn);
  }
}

function balanceWrite(newBalance) {
  const oldBalance = userBalanceBtn.textContent;
  if (newBalance > oldBalance) {
    userBalanceBtn.style.animation = "cashUpExit 0.1s forwards";
    setTimeout(() => {
      userBalanceBtn.textContent = newBalance;
      mirroredBalanceTxt.textContent = newBalance;
      userBalanceBtn.style.animation = "cashUpEntrance 0.15s forwards";
    }, 100);
  }
  else {
    userBalanceBtn.style.animation = "cashDownExit 0.1s forwards";
    setTimeout(() => {
      userBalanceBtn.textContent = newBalance;
      mirroredBalanceTxt.textContent = newBalance;
      userBalanceBtn.style.animation = "cashDownEntrance 0.15s forwards";
    }, 100);
  }
}


// --------------- BET ACTION BUTTONS ---------------

// Variables
let bet = 0;
let appStartBet = 10;
let defaultBetRemove = 5;
let defaultBetAdd = 5;
let maxBet = 99999;
let minBet = 0;

// 0 = undo bet
// 1 = remove
// 2 = add
// 3 = lose bet
// 4 = double bet

function betAction(i) {
  switch (i) {
    case 0:
      betDelete();
      break;
    case 1:
      betRemove(defaultBetRemove);
      break;
    case 2:
      betAdd(defaultBetAdd);
      break;
    case 3:
      betLose();
      break;
    case 4:
      betDouble();
      break;
    default:
      console.error("betAction argument doesn't exist");
      break;
  }
}

bet = appStartBet
betWrite(appStartBet);

function betDelete() {
  if (bet != 0) {
    bet = 0;
    betWrite(0);
  }
  else
    shakeElement(userBetBtn);
}

function betLose() {
  if (bet != 0) {
    balance -= bet;
    bet = 0;
    betWrite(0);
  }
  else {
    shakeElement(userBetBtn);
  }
}

function betDouble() {
  if (bet != 0) {
    balance += (bet)
    bet = 0;
    betWrite(0);
  }
  else {
    shakeElement(userBetBtn);
  }
}

function betRemove(amount) {
  if (!isNaN(amount))
    betChange(0 - amount);
  else console.error(amount + " is NaN");
}
function betAdd(amount) {
  if (!isNaN(amount))
    betChange(amount);
  else console.error(amount + " is NaN");
}

function betChange(change) {
  if (bet + change > maxBet || bet + change < 0) {
    shakeElement(userBetBtn);
  }
  else if (change > balance) {
    shakeElement(userBalanceBtn);
  }
  else {
    bet += change;
    betWrite(parseInt(userBetBtn.textContent) + change);
  }
}

function betWrite(newBet) {
  const oldBet = userBetBtn.textContent;
  balance += (oldBet - newBet);
  if (balance != parseInt(userBalanceBtn.textContent))
    balanceWrite(balance);
  if (newBet > oldBet) {
    userBetBtn.style.animation = "cashUpExit 0.1s forwards";
    setTimeout(() => {
      userBetBtn.textContent = newBet;
      mirroredBetTxt.textContent = newBet;
      userBetBtn.style.animation = "cashUpEntrance 0.15s forwards";
    }, 100);
  }
  else {
    userBetBtn.style.animation = "cashDownExit 0.1s forwards";
    setTimeout(() => {
      userBetBtn.textContent = newBet;
      mirroredBetTxt.textContent = newBet;
      userBetBtn.style.animation = "cashDownEntrance 0.15s forwards";
    }, 100);
  }
}



// --------------- BADGE SWITCHER ---------------

let badge = 0;
const badgeElement = document.getElementById("badgeElement");

// Badges: PLAYER / DEALER / TABLE / SPECTATOR
function switchBadge() {
  badge++
  if (badge >= 4) {
    badge = 0;
  }
  badgeElement.style.animation = "badgeExit 0.15s forwards";
  setTimeout(() => {
    switch (badge) {
      case 0:
        badgeElement.innerHTML = `<span class="material-symbols-outlined" id="badgeIcon"> account_circle </span>PLAYER`;
        badgeElement.style.backgroundColor = "rgb(128, 170, 212)";
        document.getElementById("actionsContainer").style.visibility = "visible";
        break;
      case 1:
        badgeElement.innerHTML = `<span class="material-symbols-outlined" id="badgeIcon"> poker_chip </span>DEALER`;
        badgeElement.style.backgroundColor = "rgb(255, 206, 108)";
        break;
      case 2:
        badgeElement.innerHTML = `<span class="material-symbols-outlined" id="badgeIcon"> tablet </span>TABLE`;
        badgeElement.style.backgroundColor = "rgb(186, 139, 215)";
        document.querySelectorAll(".amountTxt").forEach((e) => e.style.visibility = "hidden");
        break;
      case 3:
        badgeElement.innerHTML = `<span class="material-symbols-outlined" id="badgeIcon"> no_accounts </span>SPECTATOR`;
        badgeElement.style.backgroundColor = "rgb(201, 201, 201)";
        document.querySelectorAll(".amountTxt").forEach((e) => e.style.visibility = "visible");
        document.getElementById("actionsContainer").style.visibility = "hidden";
        break;
    }
    badgeElement.style.animation = "badgeEntrance 0.1s forwards";
  }, 150);
}


// --------------- CARDS ---------------

let totalCards = 54;
let useJokers = true;
let cardsCovered = false;

let coverBtnDisabled = false;


// F Clubs
// Q Diamonds
// C Hearts
// P Spades
const seeds = [0, 1, 2, 3];

// Ace
// 2,3,4,5,6,7,8,9,10
// J, Q, K
const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const cardMatrix = {};
values.forEach(value => {
  cardMatrix[value] = {};
  seeds.forEach(seed => {
    cardMatrix[value][seeds] = false;
  });
});


let cards = document.querySelectorAll(".card");
const cardsTable = document.getElementById("cardsTable");

function toggleCoverCards(button) {
  if (coverBtnDisabled) return;
  coverBtnDisabled = true;
  cardsCovered = !cardsCovered;
  if (cardsCovered) {
    button.querySelector('span').textContent = "visibility_off";
    coverCards();
  }
  else {
    button.querySelector('span').textContent = "visibility";
    showCards();
  }
  setTimeout(() => {
    coverBtnDisabled = false;
  }, 1500);
}

function coverCards() {
  cards = document.querySelectorAll(".card");
  let c = 0;
  cards.forEach(card => {
    card.style.animation = "coverCard 0.15s forwards ease-out";
    setTimeout(() => {
      card.firstChild.src = "assets/covered/back2.png";
      card.style.animation = "uncoverCard 0.15s forwards ease-out";
    }, 150 + (c * 120));
    setTimeout(() => {
      card.style.animation = "none";
    }, 2 * (150 + (c * 120)));
    c++;
    card.classList.remove("cardShown");
  })
}

function toggleCoverCard(card) {
  if (card.classList.contains("cardShown")) {
    card.classList.remove("cardShown");
    card.style.animation = "coverCard 0.15s forwards ease-out";
    setTimeout(() => {
      card.firstChild.src = "assets/covered/back2.png";
      card.style.animation = "uncoverCard 0.15s forwards ease-out";
    }, 150);
    setTimeout(() => {
      card.style.animation = "none";
    }, 300);
  }
  else {
    card.style.animation = "coverCard 0.15s forwards ease-out";
    setTimeout(() => {
      card.firstChild.src = `assets/deck1/${card.firstChild.alt}.png`;
      card.style.animation = "uncoverCard 0.15s forwards ease-out";
    }, 150);
    setTimeout(() => {
      card.style.animation = "none";
    }, 300);
    card.classList.add("cardShown");
  }
}

function showCards() {
  cards = document.querySelectorAll(".card");
  let c = 0;
  cards.forEach(card => {
    card.style.animation = "coverCard 0.15s forwards ease-out";
    setTimeout(() => {
      const src = card.firstChild.alt;
      card.firstChild.src = `assets/deck1/${src}.png`;
      card.classList.add("cardShown");
      card.style.animation = "uncoverCard 0.15s forwards ease-out";
    }, 150 + (c * 120));
    setTimeout(() => {
      card.style.animation = "none";
    }, 2 * (150 + (c * 120)));
    c++;
  })
}

function removeCard(card) {
  card.style.animation = "removeCard 0.2s forwards ease";
  setTimeout(() => {
    card.remove();
  }, 200);
}

// Touch handling with smooth dragging
function setupTouchEvents(card) {
  let startY, currentY, deltaY, isDragging = false;

  card.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY; // Record initial Y position on touchstart
    card.style.cursor = "grabbing";
    isDragging = false; // Reset dragging flag

    const onTouchMove = (e) => {
      currentY = e.touches[0].clientY; // Update current Y position while dragging
      deltaY = currentY - startY; // Calculate how far the card has moved
      isDragging = true; // Set dragging flag

      // Apply gradual movement using transform: translateY
      // card.style.transform = `translateY(${deltaY}px)`;
    };

    const onTouchEnd = () => {
      if (isDragging) {
        if (deltaY < -100) {
          // If dragged upwards (negative deltaY), delete the card
          removeCard(card);
        } else if (deltaY > 100) {
          // If dragged downwards (positive deltaY), cover the card
          toggleCoverCard(card);
        }
      }

      // Reset the card's position and cursor
      card.style.transform = ""; // Reset translation
      card.style.cursor = "grab";

      // Remove touch event listeners after drag is complete
      card.removeEventListener('touchmove', onTouchMove);
      card.removeEventListener('touchend', onTouchEnd);
    };

    card.addEventListener('touchmove', onTouchMove, { passive: true });
    card.addEventListener('touchend', onTouchEnd, { passive: true });
  });
}

function setupHorizontalSwipe(card) {
  let startX = 0, currentX = 0, deltaX = 0;

  card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Record initial X position on touchstart
  });

  card.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX; // Get current X position
    deltaX = currentX - startX; // Calculate how far the card has moved horizontally
  });

  card.addEventListener('touchend', () => {
    card.style.transition = 'transform 0.3s ease-out'; // Re-enable transitions

    if (deltaX > 50) {
      // Swiped to the right: move the card to the next position
      moveCardRight(card);
    } else if (deltaX < -50) {
      // Swiped to the left: move the card to the previous position
      moveCardLeft(card);
    }
  });

}

// Move the card to the next position in the DOM (swipe right)
function moveCardRight(card) {
  const nextSibling = card.nextElementSibling;

  if (nextSibling) {
    card.style.animation = "disappearMoveRight .18s ease-in forwards";
    nextSibling.style.animation = "disappearMoveLeft .18s ease-in forwards";

    setTimeout(() => {
      card.style.animation = "opacityIn .1s ease forwards";
      nextSibling.style.animation = "none";
      card.parentElement.insertBefore(nextSibling, card); // Move card after next sibling
    }, 180);
  }
}

// Move the card to the previous position in the DOM (swipe left)
function moveCardLeft(card) {
  const prevSibling = card.previousElementSibling;
  if (prevSibling) {
    card.style.animation = "disappearMoveLeft .18s ease-in forwards";
    prevSibling.style.animation = "disappearMoveRight .18s ease-in forwards";

    setTimeout(() => {
      prevSibling.style.animation = "opacityIn .1s ease forwards";
      card.style.animation = "none";
      card.parentElement.insertBefore(card, prevSibling); // Move card after next sibling
    }, 180);
  }
}


function addCard(value, seed) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add(`card_${value}.${seed}`);
  card.innerHTML = `<img src="" alt="${value}.${seed}" class="${value}.${seed}">`;
  if (cardsCovered) {
    card.innerHTML = `<img src="assets/covered/back2.png" alt="${value}.${seed}" class="${value}.${seed}">`;
    card.classList.remove("cardShown");
    cardsTable.appendChild(card);
  }
  else {
    card.innerHTML = `<img src="assets/deck1/${value}.${seed}.png" alt="${value}.${seed}" class="${value}.${seed}">`;
    card.classList.add("cardShown");
    cardsTable.appendChild(card);
  }
  setTimeout(() => {
    card.style.animation = "none";
  }, 200);
  setupTouchEvents(card);
  setupHorizontalSwipe(card)
}


function drawRandomCard() {
  const randomSeed = Math.floor(Math.random() * 4);
  const randomValue = Math.floor(Math.random() * 13 + 1);
  cardMatrix[randomValue][randomSeed] = true;
  addCard(randomValue, randomSeed);
}
drawStartCards();


// --------------- SETTINGS ---------------

function openSettings() {
  settingsContainer.classList.remove("HIDDEN");
}

function closeSettings() {
  settingsContainer.style.animation = "settingsOut 0.3s ease forwards";
  setTimeout(() => {
    settingsContainer.classList.add("HIDDEN");
    settingsContainer.style.animation = "settingsIn 0.3s ease forwards";
  }, 300);
}

