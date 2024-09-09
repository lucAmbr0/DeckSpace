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

// ---------------  FUNCTIONS  ---------------

splashscreen();
function splashscreen() {
  document.body.style.height = "100vh";
  setTimeout(() => {
    document.getElementById("splashScreenBox").style.animation = "exitUp 0.5s ease-in-out forwards"
  }, 1500);
  
}