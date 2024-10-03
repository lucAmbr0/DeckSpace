* Worked on this project for: <a href="https://wakatime.com/badge/github/lucAmbr0/DeckSpace"><img src="https://wakatime.com/badge/github/lucAmbr0/DeckSpace.svg?style=flat" alt="wakatime"></a>
# Introduction
> This project is in early stage, many things may change often.
* **DeckSpace** is a customizable web app for managing virtual card games. It allows players to simulate card decks, manage chips, and mirror card displays for easy gameplay without the need for physical cards.

## :ledger: Index

* [About](#beginner-about)
* [Usage](#zap-usage)
  - [Installation](#electric_plug-installation)
* [Development](#wrench-development)
  - [Pre-Requisites](#notebook-pre-requisites)
  - [File Structure](#file_folder-file-structure)
* [Community](#cherry_blossom-community)
  - [Contribution](#fire-contribution)
  - [Branches](#cactus-branches)
  - [Guideline](#exclamation-guideline)  
* [FAQ](#question-faq)
* [Gallery](#camera-gallery)
* [Credit/Acknowledgment](#star2-creditacknowledgment)
* [License](#lock-license)

##  :beginner: About
This repository houses a web application designed to facilitate interactive exploration of various array sorting algorithms. With a focus on educational utility, users can simulate sorting methods such as bubble sort, quick sort, and more, gaining both technical insight and visual comprehension. The interface is carefully crafted for ease of use, providing a pleasant user experience. Notably, the application is highly customizable, allowing users to tweak parameters of both arrays and sorting methods. Built exclusively with vanilla HTML, CSS, and JavaScript, the absence of frameworks ensures simplicity and accessibility, making it an ideal resource for those seeking to delve into the intricacies of sorting algorithms without unnecessary complexity. Whether accessed through a browser or installed as a Progressive Web App (PWA) on Android devices, this repository offers a valuable tool for understanding and experimenting with array sorting techniques.

## :zap: Usage
Key features include:

The app’s main page is designed to leave plenty of space for the cards, ensuring readability not only for you but also for other players around you, each with their own instance of the app running on their devices.

Important information, such as your role (Player, Dealer, Table, or Spectator), your total balance, and the amount bet for the current hand, is displayed mirrored so that other players can read it easily, and vice versa for you. By tapping the "Player" badge, you can switch to Dealer mode, which doesn’t change any technical settings. Switching to Table mode removes the balance and betting indicators and controls, making it perfect for displaying the cards centrally for everyone at the table. Lastly, Spectator mode is mainly intended for games like blackjack or poker, where you might sit out a turn.

In the bottom left corner, you’ll find your total balance and the current bet amount. Tapping the balance allows you to quickly increase, decrease, reset it, or set it with the keyboard. Similarly, tapping the bet amount lets you adjust it, lose it with the "X" button, or double it with the "2x" button. These changes are shared in real-time in the mirrored display for full transparency to the other players.

The table cards are interactive with swipe commands. Swipe down on a card to cover it, swipe up to discard it, and swipe left or right to swap its position with the next or previous card.

In the bottom right, the action buttons let you draw a specific card (useful for adding a card from the table to your hand), draw a random card, hide or reveal all cards, and access the settings.

The settings are extensive and well-organized into categories for easy navigation. You can customize every aspect of the game to fit your preferences, and you can export your settings as text to share with friends, making it quick to set up a game with synchronized rules across multiple screens.

At the bottom of the app, you’ll find some extra information, including credits for resources and the developer.

###  :electric_plug: Installation
You can get this app in many ways.
* Since this app now follows the guidelines to be installed as PWA (Progressive Web App) you can open this app from the github pages link (on top of this page) and then accept the prompt to install or if it doesn't appear for any reason click the three dots on the top-right of your browser and tap "Install App" to get the WebApp available in your Android smartphone. This way usually offers a better experience. You will automatically get most of the updates remotely and you won't need to be connected to the internet to use it normally.
* Otherwise you can always use the link to connect to github pages. Your data is saved in the browser's local storage, so it will always stay on your phone.
* I also plan to make an actual apk application for android using a PWA builder service in the future.

##  :wrench: Development

### :notebook: Pre-Requisites
There are no special prerequisites for this project other than the following:
* A **chromium browser** like Google Chrome, Brave, Edge, Opera... (Not optimised for Safari and Firefox, which may not be compatible with some CSS rules)
* An internet connection (not always required if you install the WebApp)
* Compatibility with browser's local storage functionality

###  :file_folder: File Structure
I will try to keep the repository structure as clean as possible to make maintenance and community contributions clearer

```
. DECKSPACE
│   index.html
│   index.js
│   LICENSE
│   manifest.json
│   README.md
│   service_worker.js
│   style.css
│
├───assets
│   │   emptyPixel.png
│   │   github-mark.svg
│   │
│   ├───covered
│   │       back1.png
│   │       back2.png
│   │       back3.png
│   │       back4.png
│   │       back5.png
│   │       back6.png
│   │       back7.png
│   │       back8.png
│   │
│   └───deck1
│           1.0.png
│           1.1.png
│           1.2.png
│           1.3.png
│           10.0.png
│           10.1.png
│           10.2.png
│           10.3.png
│           11.0.png
│           11.1.png
│           11.2.png
│           11.3.png
│           12.0.png
│           12.1.png
│           12.2.png
│           12.3.png
│           13.0.png
│           13.1.png
│           13.2.png
│           13.3.png
│           2.0.png
│           2.1.png
│           2.2.png
│           2.3.png
│           3.0.png
│           3.1.png
│           3.2.png
│           3.3.png
│           4.0.png
│           4.1.png
│           4.2.png
│           4.3.png
│           5.0.png
│           5.1.png
│           5.2.png
│           5.3.png
│           6.0.png
│           6.1.png
│           6.2.png
│           6.3.png
│           7.0.png
│           7.1.png
│           7.2.png
│           7.3.png
│           8.0.png
│           8.1.png
│           8.2.png
│           8.3.png
│           9.0.png
│           9.1.png
│           9.2.png
│           9.3.png
│
├───fonts
│   ├───Material_Symbols
│   │       MaterialSymbolsOutlined-VariableFont_FILL,GRAD,opsz,wght.ttf
│   │       MaterialSymbolsRounded-VariableFont_FILL,GRAD,opsz,wght.ttf
│   │       MaterialSymbolsSharp-VariableFont_FILL,GRAD,opsz,wght.ttf
│   │
│   ├───Noto_Sans
│   │       NotoSans-Italic-VariableFont_wdth,wght.ttf
│   │       NotoSans-VariableFont_wdth,wght.ttf
│   │
│   └───SUSE
│           SUSE-VariableFont_wght.ttf
│
├───icons
│       icon-any-192x192.png
│       icon-any-512x512.png
│       icon-maskable-192x192.png
│       icon-maskable-512x512.png
│
└───screenshots
        mobile-screenshot1.png
        mobile-screenshot2.png
        mobile-screenshot3.png
        mobile-screenshot4.png
        mobile-screenshot5.png
        mobile-screenshot6.png
```

## :cherry_blossom: Community

Teamwork is important! If you want to contribute and help in this project, fixing bugs, adding features or changing the look and feel of the page feel free to contribute!

 ###  :fire: Contribution

Feel free to contribute as much as you'd like!

 1. **Report a bug** <br>
 If you think you have encountered a bug, and I should know about it, feel free to report it and I will take care of it.

 2. **Request a feature** <br>
 You can also request for a feature and if it will viable, it will be picked for development.  

 3. **Create a pull request** <br>
 It can't get better then this, your pull request will be appreciated by the community. You can get started by picking up any open issues and make a pull request.

 > If you are new to open-source, make sure to check read more about it [here](https://www.digitalocean.com/community/tutorial_series/an-introduction-to-open-source) and learn more about creating a pull request [here](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github).


 ### :cactus: Branches

1. **`stage`** is the development branch.

2. **`master`** is the production branch.

3. No other permanent branches should be created in the main repository, you can create feature branches but they should get merged with the master.

**Steps to work with feature branch**

1. To start working on a new feature, create a new branch prefixed with `feat` and followed by feature name. (ie. `feat-FEATURE-NAME`)
2. Once you are done with your changes, you can raise PR.

### :exclamation: Guideline
There are no particular guidelines to follow to contribute to the project.
<br>
Feel free to change whatever you want however you want, but try to keep the code tidy and readable.


## :question: FAQ
* **Is DeckSpace multiplayer?** <br>
No, DeckSpace is currently designed for offline use only. It allows players to manage cards and chips on their own devices without needing a network connection.

* **Can I customize the cards and layout?** <br>
Yes! DeckSpace offers a wide range of customization options for both the cards and the user interface. You can tailor the app’s appearance and functionality to match your preferences and even share your settings with friends.

* **Will DeckSpace support saving games?** <br>
At the moment, DeckSpace does not have a game-saving feature. It is designed to help players manage cards and chips during a game session, but the history and state of the game are not stored between sessions.

* **Can I suggest new features or report bugs?** <br>
Absolutely! We welcome feature suggestions and bug reports. Feel free to open an issue on GitHub, and we’ll review your input as we continue to improve DeckSpace!
<br>

##  :camera: Gallery
Not ready yet :D
<div style="display: flex">
<!-- <img src="https://github.com/lucAmbr0/SchoolTimetable/blob/master/screenshots/mobile-screenshot1.png?raw=true" width="200" /> -->
<!-- <img src="https://github.com/lucAmbr0/SchoolTimetable/blob/master/screenshots/mobile-screenshot2.png?raw=true" width="200" /> -->
<!-- <img src="https://github.com/lucAmbr0/SchoolTimetable/blob/master/screenshots/mobile-screenshot3.png?raw=true" width="200" /> -->
</div>


## :star2: Credit/Acknowledgment
### [Deck 1 - yuidust's deck-of-cards](https://yuidust.itch.io/deck-of-cards)
<img src="assets/deck1/overview.png" alt="yuidust's deck-of-cards thumbnail" width="350" height="auto">

### [Deck 2 - Kin Pixel Playing Cards](https://the-wild-kin.itch.io/kin-pixel-playing-cards)
<img src="assets/deck2/overview.png" alt="Kin Pixel Playing Cards thumbnail" width="350" height="auto">

##  :lock: License
This project is licensed with the GNU General Public License v3.0, please refer to the file to know more.
