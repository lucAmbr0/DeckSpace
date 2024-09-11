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
const userBalanceAmountContainer = document.getElementById("userBalanceAmountContainer");
const balanceButtons = balanceControls.querySelectorAll('button');

// BET BAR VARIABLES
const betControls = document.getElementById("betControlsContainer");
const userBetBtn = document.getElementById("userBetBtn");
const userBetAmountContainer = document.getElementById("userBetAmountContainer");
const betButtons = betControls.querySelectorAll('button');

// ANIMATIONS VARIABLES
const barAnimation = "balanceControlsEntrance forwards ease-in-out .3s";
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
  userBalanceBtn.classList.add("userBalanceBtnACTIVE");
  // Buttons animation
  balanceButtons.forEach((button, index) => {
    button.style.animation = buttonsAnimation;
    button.style.animationDelay = `${(1 + index) * 0.07}s`;
  });
}

function closeBalanceBar() {
  balanceButtons.forEach((button, index) => {
    button.style.animation = "none";
  });
  balanceControls.classList.add("controlsHIDDEN");
  userBalanceBtn.classList.remove("userBalanceBtnACTIVE");
  userBalanceAmountContainer.style.animation = "none";
  userBalanceAmountContainer.classList.add("semiTransp");
}

function openBetBar() {
  // Open bar
  betControls.classList.remove("controlsHIDDEN");
  userBetAmountContainer.style.animation = barAnimation;
  userBetAmountContainer.classList.remove("semiTransp");
  userBetBtn.classList.add("userBalanceBtnACTIVE");
  // Buttons animation
  betButtons.forEach((button, index) => {
    button.style.animation = buttonsAnimation;
    button.style.animationDelay = `${(1 + index) * 0.07}s`;
  });
}

function closeBetBar() {
  betButtons.forEach((button, index) => {
    button.style.animation = "none";
  });
  betControls.classList.add("controlsHIDDEN");
  userBetBtn.classList.remove("userBalanceBtnACTIVE");
  userBetAmountContainer.style.animation = "none";
  userBetAmountContainer.classList.add("semiTransp");
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
  badgeElement.style.animation = "badgeExit 0.2s forwards";
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
    badgeElement.style.animation = "badgeEntrance 0.4s forwards";
  }, 200);
}