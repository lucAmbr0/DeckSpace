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


// ---------------  FUNCTIONS  ---------------

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


const balanceControls = document.getElementById("balanceControlsContainer");
const userBalanceBtn = document.getElementById("userBalanceBtn");
const userBalanceAmountContainer = document.getElementById("userBalanceAmountContainer");

function toggleBalanceControls() {
  if (balanceControls.classList.contains("controlsHIDDEN")) {
    if (!betControls.classList.contains("controlsHIDDEN")) {
      betControls.classList.add("controlsHIDDEN");
      userBetBtn.classList.remove("userBalanceBtnACTIVE");
      userBetAmountContainer.style.animation = "none";
    }
    balanceControls.classList.remove("controlsHIDDEN");
    userBalanceAmountContainer.style.animation = "balanceControlsEntrance forwards ease-out .4s"
    userBalanceBtn.classList.add("userBalanceBtnACTIVE");
  }
  else {
    balanceControls.classList.add("controlsHIDDEN");
    userBalanceBtn.classList.remove("userBalanceBtnACTIVE");
    userBalanceAmountContainer.style.animation = "none";
  }
}

const betControls = document.getElementById("betControlsContainer");
const userBetBtn = document.getElementById("userBetBtn");
const userBetAmountContainer = document.getElementById("userBetAmountContainer");

function toggleBetControls() {
  if (betControls.classList.contains("controlsHIDDEN")) {
    if (!balanceControls.classList.contains("controlsHIDDEN")) {
      balanceControls.classList.add("controlsHIDDEN");
      userBalanceBtn.classList.remove("userBalanceBtnACTIVE");
      userBalanceAmountContainer.style.animation = "none";
    }
    betControls.classList.remove("controlsHIDDEN");
    userBetAmountContainer.style.animation = "balanceControlsEntrance forwards ease-out .3s"
    userBetBtn.classList.add("userBalanceBtnACTIVE");
  }
  else {
    betControls.classList.add("controlsHIDDEN");
    userBetBtn.classList.remove("userBalanceBtnACTIVE");
    userBetAmountContainer.style.animation = "none";
  }
}