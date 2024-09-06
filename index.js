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

// splashscreen();
function splashscreen() {
  const splashscreen =
    `
  <div id="splashScreenBox">
  <img src="icons/icon-any-512x512.png" alt="App Logo">
  <div id="splashScreenAppInfo">
    <h1>DeckSpace</h1>
    <h3>by lucAmbr0</h2>
    <h4>vx.x.x</h4>
  </div>
  </div>
  `
  const page = document.body.innerHTML;
  document.body.innerHTML = splashscreen;
  setTimeout(() => {
    
  }, 500);
}