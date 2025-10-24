//Level 1 Text Variables 
var level1Text = document.getElementById("level1Text");
var level1TextScaleFloot = 3;
var level1TextScaleStatus = false;

//Loading Bar Variables
var levle1LoadingBarBackgroundPositionX = 991;
var level1LoadingPresentage = 0;

function onLoadMethod() {

    setInterval(function() { //Level 1 Text Animation
        if (level1TextScaleStatus == false) {
            level1TextScaleFloot = level1TextScaleFloot + 1;
        } else if (level1TextScaleStatus == true) {
            level1TextScaleFloot = level1TextScaleFloot - 1;
        }
        level1Text.style.transform = "scale(1." + level1TextScaleFloot + ")"; //Level 1 Text Scale

        if (level1TextScaleFloot == 3) {
            level1TextScaleStatus = false;
        } else if (level1TextScaleFloot == 5) {
            level1TextScaleStatus = true;
        }
    }, 200);

    var level1LoadingBar = document.getElementById("level1LoadingBar");
    var level1LoadingBar2 = document.getElementById("level1LoadingBar2");
    var loadingPresentage = document.getElementById("loadingPresentage");

    setInterval(function() { //Loading Bar Animation
        if (levle1LoadingBarBackgroundPositionX != 1) {
            levle1LoadingBarBackgroundPositionX = levle1LoadingBarBackgroundPositionX - 10;
            level1LoadingBar.style.backgroundPositionX = "-" + levle1LoadingBarBackgroundPositionX + "px";
        }

        if (level1LoadingPresentage < 100) { // Loading Precentage
            level1LoadingPresentage = level1LoadingPresentage + 1;
            loadingPresentage.innerHTML = level1LoadingPresentage + "%";
        }

        if (levle1LoadingBarBackgroundPositionX == 1) {
            level1LoadingBar2.remove();
            window.location = "l1.html";
        }
    }, 20);
}