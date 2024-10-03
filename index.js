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
for (let i = 1; i < 8; i++)
  cardImages.push(`assets/covered/back${i}.png`);
function preloadImages() {
  cardImages.forEach(src => {
    const img = new Image();
    img.src = src;  // Triggers the image to load
  });
}
window.onload = preloadImages();

// ---------------  DEBUG VARIABLES  ---------------

let appData = {
  useBalance: undefined,
  appStartBalance: undefined,
  appStartBet: undefined,
  startCards: undefined,
  useBadges: undefined,
  balance: undefined,
  allowNegativeBalance: undefined,
  defaultBalanceAdd: undefined,
  defaultBalanceRemove: undefined,
  maxBalance: undefined,
  minBalance: undefined,
  bet: undefined,
  appStartBet: undefined,
  defaultBetRemove: undefined,
  defaultBetAdd: undefined,
  maxBet: undefined,
  minBet: undefined,
  frontSkin: 1,
  backCover: 1
};

function recoverAppData() {
  const storedData = localStorage.getItem('appData');

  if (storedData) {
    appData = JSON.parse(storedData);
  } else {
    appData = {
      useBalance: true,
      appStartBalance: 150,
      startCards: 6,
      useBadges: true,
      balance: 150,
      allowNegativeBalance: false,
      defaultBalanceAdd: 10,
      defaultBalanceRemove: 10,
      maxBalance: 99999,
      minBalance: -99999,
      bet: 0,
      appStartBet: 0,
      defaultBetRemove: 5,
      defaultBetAdd: 5,
      maxBet: 99999,
      minBet: 0,
      frontSkin: 1,
      backCover: 1
    };
  }
  saveAppData();
}

function saveAppData() {
  if (JSON.stringify(localStorage.getItem('appData')) != JSON.stringify(appData))
    localStorage.setItem('appData', JSON.stringify(appData)); // Save data as a string
}
recoverAppData();

const startAnimation = true;
const openSettingsAtStart = false;

function drawStartCards() {
  for (let i = 0; i < appData.startCards; i++) drawRandomCard();
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
const darkOverlay = document.getElementById("darkOverlay");
if (openSettingsAtStart) {
  openSettings();
}


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
      balanceRemove(appData.defaultBalanceRemove);
      break;
    case 2:
      balanceAdd(appData.defaultBalanceAdd);
      break;
    case 3:
      balanceEdit();
      break;
    default:
      console.error("balanceAction argument doesn't exist");
      break;
  }
}

appData.balance = appData.appStartBalance
balanceWrite(appData.appStartBalance);

function balanceDelete() {
  if (appData.balance != 0) {
    appData.balance = 0;
    balanceWrite(0);
  }
  else
    shakeElement(userBalanceBtn)
}

function balanceEdit() {
  let newBalance = parseInt(window.prompt("Insert new balance value (" + appData.minBalance + " - " + appData.maxBalance + ")"));
  if ((newBalance < 0 && !appData.allowNegativeBalance) || newBalance < appData.minBalance || newBalance > appData.maxBalance || isNaN(newBalance)) {
    window.alert("Invalid amount");
  }
  else {
    appData.balance = newBalance;
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
  if (appData.balance + change > appData.maxBalance || appData.balance + change < appData.minBalance) {
    shakeElement(userBalanceBtn);
  }
  else if (appData.balance + change >= 0 || appData.allowNegativeBalance) {
    appData.balance += change;
    balanceWrite(parseInt(userBalanceBtn.textContent) + change);
  }
  else if (appData.balance + change < 0 && !appData.allowNegativeBalance) {
    appData.balance = 0;
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
      betRemove(appData.defaultBetRemove);
      break;
    case 2:
      betAdd(appData.defaultBetAdd);
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

appData.bet = appData.appStartBet
betWrite(appData.appStartBet);

function betDelete() {
  if (appData.bet != 0) {
    appData.bet = 0;
    betWrite(0);
  }
  else
    shakeElement(userBetBtn);
}

function betLose() {
  if (appData.bet != 0) {
    appData.balance -= appData.bet;
    appData.bet = 0;
    betWrite(0);
  }
  else {
    shakeElement(userBetBtn);
  }
}

function betDouble() {
  if (appData.bet != 0) {
    appData.balance += (appData.bet)
    appData.bet = 0;
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
  if (appData.bet + change > appData.maxBet || appData.bet + change < 0) {
    shakeElement(userBetBtn);
  }
  else if (change > appData.balance) {
    shakeElement(userBalanceBtn);
  }
  else {
    appData.bet += change;
    betWrite(parseInt(userBetBtn.textContent) + change);
  }
}

function betWrite(newBet) {
  const oldBet = userBetBtn.textContent;
  appData.balance += (oldBet - newBet);
  if (appData.balance != parseInt(userBalanceBtn.textContent))
    balanceWrite(appData.balance);
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
        document.querySelectorAll(".amountTxt").forEach((e) => e.style.visibility = "visible");
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
      card.firstChild.src = `assets/covered/back${appData.backCover}.png`;
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
      card.firstChild.src = `assets/covered/back${appData.backCover}.png`;
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
    card.innerHTML = `<img src="assets/covered/back${appData.backCover}.png" alt="${value}.${seed}" class="${value}.${seed}">`;
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

const emptySettingsPlaceholder = document.getElementById("emptySettingsPlaceholder");
const categoryDetailsContainer = document.querySelectorAll(".categoryDetailsContainer");

function openSettings() {
  settingsContainer.classList.remove("HIDDEN");
  darkOverlay.classList.remove("HIDDEN");
}

function closeSettings() {
  settingsContainer.style.animation = "settingsOut .3s ease forwards";
  darkOverlay.style.animation = "settingsOut .3s ease forwards";
  setTimeout(() => {
    settingsContainer.classList.add("HIDDEN");
    darkOverlay.classList.add("HIDDEN");
    settingsCategory.forEach(e => e.classList.remove("categoryActive"));
    emptySettingsPlaceholder.classList.remove("HIDDEN");
    categoryDetailsContainer.forEach(e => e.classList.add("HIDDEN"))
    settingsContainer.style.animation = "settingsIn .3s ease forwards";
    darkOverlay.style.animation = "settingsIn .3s ease forwards";
  }, 300);
}

settingsCategory = document.querySelectorAll(".settingCategoryBtn");
function selectSettingsCategory(idx) {
  settingsCategory.forEach(e => e.classList.remove("categoryActive"));
  categoryDetailsContainer.forEach(e => e.classList.add("HIDDEN"))
  settingsCategory[idx].classList.add("categoryActive");
  emptySettingsPlaceholder.classList.add("HIDDEN");
  categoryDetailsContainer[idx].classList.remove("HIDDEN");
}

const mirroredBalanceContainer = document.getElementById("mirroredBalanceContainer");
const balanceBetsControlsContainer = document.getElementById("balanceBetsControlsContainer");
const balanceBetsSwitch = document.getElementById("balanceBetsSwitch");
const balanceBetsControlsPlaceholder = document.getElementById("balanceBetsControlsPlaceholder");

function toggleBalanceAndBetsFeatures() {
  if (balanceBetsSwitch.checked) {
    balanceBetsControlsContainer.classList.remove("HIDDEN");
    mirroredBalanceContainer.classList.remove("HIDDEN");
    balanceBetsControlsPlaceholder.classList.add("HIDDEN");
    appData.useBalance = true;
  }
  else {
    mirroredBalanceContainer.classList.add("HIDDEN");
    balanceBetsControlsContainer.classList.add("HIDDEN");
    balanceBetsControlsPlaceholder.classList.remove("HIDDEN");
    appData.useBalance = false;
  }
  saveAppData();
}


const showRoleBadgeSwitch = document.getElementById("showRoleBadgeSwitch");

function toggleShowRoleBadge() {
  if (showRoleBadgeSwitch.checked) {
    badgeElement.classList.remove("HIDDEN");
    appData.useBadges = true;
  }
  else {
    badge = 4;
    switchBadge();
    badgeElement.classList.add("HIDDEN");
    appData.useBadges = false;
  }
  saveAppData();
}


const balanceAtAppStartInput = document.getElementById("balanceAtAppStartInput");

function changeBalanceAtAppStart() {
  const enteredData = parseFloat(balanceAtAppStartInput.value);
  if (!isNaN(enteredData) && enteredData >= 0 && enteredData > maxBalance) appData.appStartBalance = enteredData;
  else {
    appData.appStartBalance = 150;
    balanceAtAppStartInput.value = 150;
  }
  saveAppData();
}


const defaultBetInput = document.getElementById("defaultBetInput");

function changeDefaultBet() {
  const enteredData = parseFloat(defaultBetInput.value);
  if (!isNaN(enteredData) && appData.appStartBet >= 0 && appData.appStartBet <= appData.appStartBalance)
    appData.appStartBet = enteredData;
  else {
    appData.appStartBet = 0;
    defaultBetInput.value = 0;
  }
  saveAppData();
}


const defaultBalanceIncreaseInput = document.getElementById("defaultBalanceIncreaseInput");

function changeBalanceIncrease() {
  const enteredData = parseFloat(defaultBalanceIncreaseInput.value);
  if (!isNaN(enteredData) && enteredData > 0 && enteredData < appData.maxBalance / 2)
    appData.defaultBalanceAdd = enteredData;
  else {
    appData.defaultBalanceAdd = 10;
    defaultBalanceIncreaseInput.value = 10;
  }
  saveAppData();
}


const defaultBalanceDecreaseInput = document.getElementById("defaultBalanceDecreaseInput");

function changeBalanceDecrease() {
  const enteredData = parseFloat(defaultBalanceDecreaseInput.value);
  if (!isNaN(enteredData) && enteredData > 0 && enteredData < appData.maxBalance / 2)
    appData.defaultBalanceRemove = enteredData;
  else {
    appData.defaultBalanceRemove = 10;
    defaultBalanceDecreaseInput.value = 10;
  }
  saveAppData();
}


const defaultBetIncreaseInput = document.getElementById("defaultBetIncreaseInput");

function changeBetIncrease() {
  const enteredData = parseFloat(defaultBetIncreaseInput.value);
  if (!isNaN(enteredData) && enteredData > 0 && enteredData < appData.maxBet / 2)
    appData.defaultBetAdd = enteredData;
  else {
    appData.defaultBetAdd = 10;
    defaultBetIncreaseInput.value = 10;
  }
  saveAppData();
}


const defaultBetDecreaseInput = document.getElementById("defaultBetDecreaseInput");

function changeBetDecrease() {
  const enteredData = parseFloat(defaultBetDecreaseInput.value);
  if (!isNaN(enteredData) && enteredData > 0 && enteredData < appData.maxBet / 2)
    appData.defaultBetRemove = enteredData;
  else {
    appData.defaultBetRemove = 10;
    defaultBetDecreaseInput.value = 10;
  }
  saveAppData();
}


const cardsDrawnAtAppStartInput = document.getElementById("cardsDrawnAtAppStartInput");

function changeCardsDrawnAtAppStart() {
  const enteredData = parseInt(cardsDrawnAtAppStartInput.value);
  if (!isNaN(enteredData) && enteredData >= 0 && enteredData <= 15) {
    appData.startCards = enteredData;
  }
  else {
    appData.startCards = 6;
    cardsDrawnAtAppStartInput.value = 6;
  }
  saveAppData();
}

const backCoverSelect = document.getElementById("backCoverSelect");
const coveredCardPreview = document.getElementById("coveredCardPreview");

function changeBackCover() {
  appData.backCover = parseInt(backCoverSelect.value);
  coveredCardPreview.classList.remove("cardShown");
  coveredCardPreview.style.animation = "coverCard 0.15s forwards ease-out";
  setTimeout(() => {
    coveredCardPreview.src = `assets/covered/back${appData.backCover}.png`;
    coveredCardPreview.style.animation = "uncoverCard 0.15s forwards ease-out";
  }, 150);
  setTimeout(() => {
    coveredCardPreview.style.animation = "none";
  }, 300);
  refreshCardPath();
  saveAppData();
}

function refreshCardPath() {
  cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const pre = card.firstChild.src;
      if (String(pre).includes("back")) {
        card.firstChild.src = `assets/covered/back${appData.backCover}.png`;
      }
  })
}


// --------------- CHANGE HTML ELEMENTS STATE TO LAST SET PREFERENCES IN LOCALSTORAGE ---------------

function recoverSettingsState() {
  // START appData.useBadges
  if (appData.useBadges)
    showRoleBadgeSwitch.checked = true;
  else
    showRoleBadgeSwitch.checked = false;
  toggleShowRoleBadge();
  // END appData.useBadges

  // START appData.useBalance
  if (appData.useBalance)
    balanceBetsSwitch.checked = true;
  else
    balanceBetsSwitch.checked = false;
  toggleBalanceAndBetsFeatures();
  // END appData.useBalance

  // START appData.appStartBalance
  if (isNaN(appData.appStartBalance))
    appData.appStartBalance = 150;
  balanceAtAppStartInput.value = appData.appStartBalance;
  // END appData.appStartBalance

  // START appData.appStartBet
  if (isNaN(appData.appStartBet))
    appData.appStartBet = 0;
  defaultBetInput.value = appData.appStartBet;
  // END appData.appStartBet

  // START appData.defaultBalanceAdd
  if (isNaN(appData.defaultBalanceAdd))
    appData.defaultBalanceAdd = 10;
  defaultBalanceIncreaseInput.value = appData.defaultBalanceAdd;
  // END appData.defaultBalanceAdd

  // START appData.defaultBalanceRemove
  if (isNaN(appData.defaultBalanceRemove))
    appData.defaultBalanceRemove = 10;
  defaultBalanceDecreaseInput.value = appData.defaultBalanceRemove;
  // END appData.defaultBalanceRemove

  // START appData.defaultBetAdd
  if (isNaN(appData.defaultBetAdd))
    appData.defaultBetAdd = 5;
  defaultBetIncreaseInput.value = appData.defaultBetAdd;
  // END appData.defaultBetAdd

  // START appData.defaultBetRemove
  if (isNaN(appData.defaultBetRemove))
    appData.defaultBetRemove = 5;
  defaultBetDecreaseInput.value = appData.defaultBetRemove;
  // END appData.defaultBetRemove
  
  // START appData.startCards
  if (isNaN(appData.startCards))
    appData.startCards = 6;
  cardsDrawnAtAppStartInput.value = appData.startCards;
  // END appData.startCards
  
  // START appData.backCover
  if (isNaN(appData.backCover))
    appData.backCover = 1;
  backCoverSelect.value = appData.backCover;
  // END appData.backCover

  // selectSettingsCategory(1);
  saveAppData();
}
recoverSettingsState();