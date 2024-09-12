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

// ---------------  DEBUG VARIABLES  ---------------

const startAnimation = true;


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
        break;
      case 1:
        badgeElement.innerHTML = `<span class="material-symbols-outlined" id="badgeIcon"> poker_chip </span>DEALER`;
        badgeElement.style.backgroundColor = "rgb(255, 206, 108)";
        break;
      case 2:
        badgeElement.innerHTML = `<span class="material-symbols-outlined" id="badgeIcon"> tablet </span>TABLE`;
        badgeElement.style.backgroundColor = "rgb(186, 139, 215)";
        break;
      case 3:
        badgeElement.innerHTML = `<span class="material-symbols-outlined" id="badgeIcon"> no_accounts </span>SPECTATOR`;
        badgeElement.style.backgroundColor = "rgb(201, 201, 201)";
        break;
    }
    badgeElement.style.animation = "badgeEntrance 0.1s forwards";
  }, 150);
}