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

const startAnimation = false;


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
  if (balanceControls.classList.contains("balanceControlsHIDDEN")) {
    balanceControls.classList.remove("balanceControlsHIDDEN");
    userBalanceAmountContainer.style.animation = "balanceControlsEntrance forwards ease-out .4s"
    userBalanceBtn.classList.add("userBalanceBtnACTIVE");
  }
  else {
    balanceControls.classList.add("balanceControlsHIDDEN");
    userBalanceBtn.classList.remove("userBalanceBtnACTIVE");
    userBalanceAmountContainer.style.animation = "none"
  }
}