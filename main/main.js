//Main Div
var mainMenuBackgroundPositionX = 0;
var mainMenuBackground = document.getElementById("mainMenuBackground");

//Character Global Variables
var heroRobotBackgroundPositionX = 0;
var alien9BackgroundPositionX = 0;

//Sound Objects Global Variables
//Click
var menuButtonClickAudio = new Audio("main/main_menu_button_zipclick.mp3");
//Menu_Loop
var menuAudio = new Audio("main/audio_menu.mp3");
menuAudio.loop = true;

//Onload
function onLoad() {

    setInterval(function() { //Background Animation
        mainMenuBackgroundPositionX = mainMenuBackgroundPositionX - 5;
        mainMenuBackground.style.backgroundPositionX = mainMenuBackgroundPositionX + "px";
    }, 200);

    setInterval(function() { //Hero Robot Animaiton
        var heroRobot = document.getElementById("hero-robot");
        heroRobotBackgroundPositionX = heroRobotBackgroundPositionX - 567;
        heroRobot.style.backgroundPositionX = heroRobotBackgroundPositionX + "px";
    }, 200);

    setInterval(function() { //Enemy Alien Animation
        var alien9 = document.getElementById("alien-9");
        alien9BackgroundPositionX = alien9BackgroundPositionX - 689;
        alien9.style.backgroundPositionX = alien9BackgroundPositionX + "px";
    }, 350);
}

//Window Div Global Variables
var spaceWindow = document.createElement("div"); //Space Window
spaceWindow.className = "spaceWindow1";

var infoText = document.createElement("div"); //Info Text
infoText.className = "infoText";

var settingsText = document.createElement("div"); //Settings Text
settingsText.className = "settingsText";

var windowCloseButton = document.createElement("div"); //Window Close Button
windowCloseButton.className = "windowCloseButton";

var fullScreenText = document.createElement("div"); //Full Screen Text
fullScreenText.className = "fullScreenText";

var fullScreenDoc = document.documentElement; //Full Screen Document

var musicText = document.createElement("div"); //Music Text
musicText.className = "musicText";

var loadingPageLoadDelay = 0;

function playClick() { //play Button Click
    menuButtonClickAudio.play();
    setInterval(function() { //Delay
        loadingPageLoadDelay = loadingPageLoadDelay + 1;
        if (loadingPageLoadDelay == 1) {
            window.location = "l1_load.html";
        }
    }, 200);
}


function infoClick() { //info Button Click
    menuButtonClickAudio.play();
    spaceWindow.className = "spaceWindow1 spaceWindow2"
    mainMenuBackground.appendChild(spaceWindow);
    spaceWindow.appendChild(infoText);
    spaceWindow.appendChild(windowCloseButton);

    windowCloseButton.onclick = function() { //info Window Close Button Click
        menuButtonClickAudio.play();
        windowCloseButton.remove();
        infoText.remove();
        spaceWindow.remove();
    }
}

//settings Window Variables
var fullScreenTextclickStatus = false;
var musicTextClickStatus = false;


function settingsClick() { //Settings Button Click
    menuButtonClickAudio.play();

    spaceWindow.className = "spaceWindow1 settingsWindow";
    mainMenuBackground.appendChild(spaceWindow);
    spaceWindow.appendChild(settingsText);
    spaceWindow.appendChild(windowCloseButton);

    spaceWindow.appendChild(fullScreenText);

    fullScreenText.onclick = function() { //Full Screen Text Onclick
        if (fullScreenTextclickStatus == false) {
            fullScreenTextclickStatus = true;
            menuButtonClickAudio.play();
            fullScreenText.style.backgroundImage = "url('main/Full_Screen_Pressed.png')";
            if (fullScreenDoc.requestFullscreen) {
                fullScreenDoc.requestFullscreen();
            } else if (fullScreenDoc.webkitRequestFullscreen) { /* Safari */
                fullScreenDoc.webkitRequestFullscreen();
            } else if (fullScreenDoc.msRequestFullscreen) { /* IE11 */
                fullScreenDoc.msRequestFullscreen();
            }
        } else if (fullScreenTextclickStatus == true) {
            fullScreenTextclickStatus = false;
            menuButtonClickAudio.play();
            fullScreenText.style.backgroundImage = "url('main/Full_Screen_Unpressed.png')";
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
    }

    spaceWindow.appendChild(musicText);

    musicText.onclick = function() { //Music Text Onclick
        if (musicTextClickStatus == false) {
            musicText.style.backgroundImage = "url('main/Music_Text_Pressed.png')";
            musicClick();
            musicTextClickStatus = true;
        } else if (musicTextClickStatus == true) {
            musicText.style.backgroundImage = "url('main/Music_Text_Unpressed.png')";
            musicClick();
            musicTextClickStatus = false;
        }
    }

    windowCloseButton.onclick = function() { //Window Close Button Onclick
        menuButtonClickAudio.play();
        windowCloseButton.remove();
        settingsText.remove();
        fullScreenText.remove();
        spaceWindow.remove();
        musicText.remove();
        spaceWindow.className = "spaceWindow1";
    }

}

//music Button Variables
var musicButtonStatus = false;
var musicButton = document.getElementById("btn-Music");

function musicClick() { //music Button Click
    if (musicButtonStatus == false) {
        menuAudio.play();

        musicButton.style.backgroundImage = "url('main/Music_BTN_Pressed.png')"
        musicButtonStatus = true;

        musicText.style.backgroundImage = "url('main/Music_Text_Pressed.png')";
        musicTextClickStatus = true;

    } else if (musicButtonStatus == true) {
        menuAudio.pause();

        musicButton.style.backgroundImage = "url('main/Music_BTN_Unpressed.png')"
        musicButtonStatus = false;

        musicText.style.backgroundImage = "url('main/Music_Text_Unpressed.png')";
        musicTextClickStatus = false;
    }
}