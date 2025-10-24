// Background Variables
var level1Background = document.getElementById("level1Background");
var level1BackgroundPositionX = 0;

//Game Variables
var gameScoreH1 = document.createElement("h1");
var gameScoreText = document.createElement("div");
var gameScoreBG = document.createElement("div");
var gameScore = 0;

//Game Audios
const coinPick = new Audio("level1/PickedCoinEcho.wav");
const bulletLaserSound = new Audio("level1/laserfire01.mp3");
const meleeLaserSound = new Audio("level1/laserfire02.mp3");
const lightBulletHit = new Audio("level1/lightBulletHit.wav");
const lightBulletDestroing = new Audio("level1/lightBulletDestroing.mp3");
const gameOverSound1 = new Audio("level1/GameOver_1.wav");
const gameOverSound2 = new Audio("level1/GameOver_2.mp3");
const missile2Destroing = new Audio("level1/missile2_destroing.wav");
const missile2Hit = new Audio("level1/missile2_hit.mp3");
const youWonMusic1 = new Audio("level1/you_Won_Music_1.wav");
var l1Audio = new Audio("level1/level1music.mp3");
l1Audio.loop = true;

//Game Identifying Variables
var xpIdentifier = "coin"; // coin // missile 

//Game Changing Variables
var backgroundMoveSpeed = 10; // Background Moving Speed When Charactor Moving
var coinMoveWithBackgroundSpeed = 18; // Speed of Coins
var missleMovingSpeed = 36; // Speed of Missiles 

// Start Playing Variables
var startPlayingNo = 3;
var startPlayAnimationNumber = 0;

var heroRobotDeathAnimation = 0;

var gameChecker = 0;

function onloadFunction() { // onload Here

    gameScreenCheck();
    heroRobotCharactor();
    heroRobotHealthStart();

    gameScoreAppend();

    for (var i = 0; i < 100; i++) { // 100 Coins
        coinsForLevel1();
    }

    gameChecker = setInterval(function() {

        var hint1 = document.createElement("h1");
        hint1.className = "hint1";

        if (level1BackgroundPositionX == -400) { //Hint
            hint1.innerHTML = "COLLECT 10000XP TO COMPLETE LEVEL 1";
            level1Background.appendChild(hint1);
            setTimeout(function() {
                hint1.remove();
            }, 2000);
        }

        if (level1BackgroundPositionX == -800) { //Hint
            hint1.className = "hint1";
            hint1.innerHTML = "USE MELEE ATTACK - ENTER KEY - TO DESTROY MISSILES AND GAIN XP";
            level1Background.appendChild(hint1);
            setTimeout(function() {
                hint1.remove();
            }, 2000);
        }

        if (level1BackgroundPositionX == -1200) { //Missiles

            for (var x = 0; x < 70; x++) { // 70 Missiles of "missile1"
                missile1Shoot();
            }
            for (var missile2Id = 0; missile2Id < 50; missile2Id++) { // 50 Missiles of "missile2"
                missile2Shoot(missile2Id);
            }
        }

        if (level1BackgroundPositionX == -1300) { //Hint DON'T LET MISSILES HIT YOU
            hint1.className = "hint1";
            hint1.innerHTML = "DON'T LET MISSILES HIT YOU";
            level1Background.appendChild(hint1);
            setTimeout(function() {
                hint1.remove();
            }, 3000);
        }

        if (gameScore >= 10000) { // YOU WON
            l1Audio.pause();
            youWon();
        }

    }, 200);

    var robotDeathCheck = setInterval(function() { //Hero Robot Health 0 Check & if 0 Die

        if (heroRobotHealthWidth <= 0) { // Hero Death, Game Over, You Lose
            keyEnable = false; //Disable All Keys
            heroRobotAnimationName = 10;
            clearInterval(heroRobotAnimationNumber);
            heroRobotCharactorId.style.backgroundPositionX = "0px";

            if (heroRobotAnimationName == 10) { // Hero Death Animation

                heroRobotCharactorId.style.backgroundImage = "url('level1/10_robotfree_Dead.png')";

                heroRobotBackgroundPositionX = heroRobotBackgroundPositionX - 562; //Death Animation
                heroRobotCharactorId.style.backgroundPositionX = heroRobotBackgroundPositionX + "px";

                if (heroRobotBackgroundPositionX <= -5058) {

                    heroRobotCharactorId.style.backgroundPositionX = heroRobotBackgroundPositionX + "px";
                    l1Audio.pause();
                    youLose();
                    clearInterval(heroRobotDeathAnimation);
                    clearInterval(robotDeathCheck);
                }
            }
        }

        heroRobotHealthBarWidthId.style.width = heroRobotHealthWidth + "px"; //Set Hero Robot Health
    }, 200);
}

function youWon() {
    youWonMusic1.play();

    var youWon = document.createElement("div");
    youWon.className = "youWon";

    var youWonStar1 = document.createElement("div");
    youWonStar1.className = "youWonStar";

    var youWonStar2 = document.createElement("div");
    youWonStar2.className = "youWonStar youWonStar2";

    var youWonStar3 = document.createElement("div");
    youWonStar3.className = "youWonStar youWonStar3";

    level1Background.appendChild(youWon);
    youWon.appendChild(youWonStar1);
    youWon.appendChild(youWonStar3);
    youWon.appendChild(youWonStar2);

    clearInterval(gameChecker);
}

function youLose() {

    var youLose = document.createElement("div");
    youLose.className = "youLose";
    level1Background.appendChild(youLose);
    gameOverSound1.play();

    setTimeout(function() {
        var youLoseStar1 = document.createElement("div");
        youLoseStar1.className = "youLoseStar";
        youLose.appendChild(youLoseStar1);

        var youLoseStar3 = document.createElement("div");
        youLoseStar3.className = "youLoseStar youLoseStar3";
        youLose.appendChild(youLoseStar3);
        gameOverSound1.play();
    }, 500);

    setTimeout(function() {
        var youLoseStar2 = document.createElement("div");
        youLoseStar2.className = "youLoseStar youLoseStar2";
        youLose.appendChild(youLoseStar2);
        gameOverSound1.play();
        gameOverSound2.play();
    }, 1000);

}

function gameScreenCheck() {

    setInterval(function() { // Hero Robot Margin Left,Top Set to Screen Size Change, Game Speed 
        var screenWidth = screen.width;
        var screenHeight = screen.height;

        var body = document.body;
        html = document.documentElement;

        var bodyHeight = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        //alert(bodyHeight);

        if (screenHeight <= 1080 & bodyHeight >= 979 & screenWidth == 1920) { //MarginTop
            heroRobotCharactorId.style.marginTop = "680px";
        }
        if (screenHeight == 1080 & bodyHeight == 1080 & screenWidth == 1920) { //MarginTop
            heroRobotCharactorId.style.marginTop = "650px";
        }

        if (screenWidth <= 1280) { //MarginLeft & Game Speed
            heroRobotCharactorId.style.marginLeft = "-750px";
            backgroundMoveSpeed = 10;
            coinMoveWithBackgroundSpeed = 18;
            missleMovingSpeed = 36;

        } else if (screenWidth > 1280 & screenWidth <= 1366) { //MarginLeft, Top & Game Speed
            heroRobotCharactorId.style.marginLeft = "-800px";
            heroRobotCharactorId.style.marginTop = "480px";
            backgroundMoveSpeed = 15;
            coinMoveWithBackgroundSpeed = 23;
            missleMovingSpeed = 46;

        } else if (screenWidth > 1366 & screenWidth <= 1920) { //MarginLeft & Game Speed
            heroRobotCharactorId.style.marginLeft = "-1100px";
            backgroundMoveSpeed = 25;
            coinMoveWithBackgroundSpeed = 38;
            missleMovingSpeed = 66;

        } else if (screenWidth > 1920 & screenWidth <= 3840) { //MarginLeft, Top & Game Speed
            heroRobotCharactorId.style.marginLeft = "-2100px";
            heroRobotCharactorId.style.marginTop = "34%";
            backgroundMoveSpeed = 50;
            coinMoveWithBackgroundSpeed = 70;
            missleMovingSpeed = 86;
        }
    }, 200);
}

function gameScoreCreate() { //Score Adding & Appending 

    var gameScoreXP = document.createElement("div");

    if (xpIdentifier == "coin") { //CoinXP
        gameScore = gameScore + 10;
        gameScoreXP.className = "gameScoreXPx10";
    }

    if (xpIdentifier == "missile1") { //Missile 1 XP
        gameScore = gameScore + 100;
        gameScoreXP.className = "gameScoreXPx100";
        setTimeout(function() {
            xpIdentifier = "coin";
        }, 1500);
    }
    if (xpIdentifier == "missile2") { //Missile 2 XP
        gameScore = gameScore + 1000;
        gameScoreXP.className = "gameScoreXPx1000";
        setTimeout(function() {
            xpIdentifier = "coin";
        }, 1500);
    }

    gameScoreH1.innerHTML = gameScore;

    gameScoreText.appendChild(gameScoreXP);
    setTimeout(function() {
        gameScoreXP.remove();
    }, 500);

    if (gameScore != 0) {
        level1Background.appendChild(gameScoreText);
        gameScoreText.appendChild(gameScoreBG);
        gameScoreText.appendChild(gameScoreH1);
    }

}

function gameScoreAppend() { // Game Score Changes
    //Score Text PNG
    gameScoreText.className = "gameScoreText";

    //Score H1
    gameScoreH1.className = "gameScoreH1";
    gameScoreH1.innerHTML = gameScore;

    //Score H1 BG
    gameScoreBG.className = "gameScoreBG";

}

function onKeyUp(event) { // on Key Up
    var keyPressed = event.key;

    if (keyEnable == true) {
        if (keyPressed == "a" || keyPressed == "A" || keyPressed == "ArrowLeft") {
            heroRobotAnimationName = 1; // 1 == Idle
            heroRobotCharactorId.style.backgroundImage = "url('level1/1_robotfree_Idle.png')";
            heroRobotBackgroundPositionX = 0;
            heroRobotAnimationSpeed = 200;
            keyDownCheck = false;
        }
        if (keyPressed == "d" || keyPressed == "D" || keyPressed == "ArrowRight") {
            heroRobotAnimationName = 1; // 1 == Idle
            heroRobotCharactorId.style.backgroundImage = "url('level1/1_robotfree_Idle.png')";
            heroRobotBackgroundPositionX = 0;
            heroRobotAnimationSpeed = 200;
            keyDownCheck = false;
        }

        if (keyPressed == "x" || keyPressed == "X" || keyPressed == "Enter") {
            keyDownCheck = false;
        }
    }
}

var screenWidthCheck = screen.width;

var keyEnable = false;
var keyDownCheck = false;

function onKeyDown(event) { // on Key Down

    var keyPressed = event.key;

    if (keyEnable == true) {
        if (keyPressed == "a" || keyPressed == "A" || keyPressed == "ArrowLeft") {

            if (keyDownCheck == false) {
                // Run Backward - a or A or Arrow Left
                heroRobotAnimationName = 0; // 0 == Run Backward
                heroRobotCharactorId.style.backgroundImage = "url('level1/2_robotfree_Run.png')";

                if (screenWidthCheck == 3840) {
                    heroRobotCharactorId.style.transform = "scaleX(-1.2) scaleY(1.2)";
                } else if (screenWidthCheck == 1920) {
                    heroRobotCharactorId.style.transform = "scaleX(-0.6) scaleY(0.6)";
                } else if (screenWidthCheck == 1366) {
                    heroRobotCharactorId.style.transform = "scaleX(-0.4) scaleY(0.4)";
                } else {
                    heroRobotCharactorId.style.transform = "scaleX(-0.4) scaleY(0.4)";
                }

                heroRobotBackgroundPositionX = 0;
                heroRobotAnimationSpeed = 300;
                keyDownCheck = true;
            }

        }

        if (keyPressed == "d" || keyPressed == "D" || keyPressed == "ArrowRight") {

            if (keyDownCheck == false) {
                // Run Forward - d or D or ArrowRight
                heroRobotAnimationName = 2; // 2 == Run
                heroRobotCharactorId.style.backgroundImage = "url('level1/2_robotfree_Run.png')";
                if (screenWidthCheck == 3840) {
                    heroRobotCharactorId.style.transform = "scaleX(1.2) scaleY(1.2)";
                } else if (screenWidthCheck == 1920) {
                    heroRobotCharactorId.style.transform = "scaleX(0.6) scaleY(0.6)";
                } else if (screenWidthCheck == 1366) {
                    heroRobotCharactorId.style.transform = "scaleX(0.4) scaleY(0.4)";
                } else {
                    heroRobotCharactorId.style.transform = "scaleX(0.4) scaleY(0.4)";
                }

                heroRobotBackgroundPositionX = 0;
                heroRobotAnimationSpeed = 300;
                keyDownCheck = true;
            }
        }

        if (keyPressed == "s" || keyPressed == "S" || keyPressed == "ArrowDown") {
            // Stop - s or S or Arrow Down
            heroRobotAnimationName = 1; // 1 == Idle
            heroRobotCharactorId.style.backgroundImage = "url('level1/1_robotfree_Idle.png')";
            heroRobotBackgroundPositionX = 0;
            heroRobotAnimationSpeed = 200;
        }

        if (keyPressed == " " || keyPressed == "ArrowUp") {
            // Shoot - Space or ArrowUp
            heroRobotAnimationName = 3; // 3 == Shoot
            heroRobotCharactorId.style.backgroundImage = "url('level1/3_robotfree_Shoot.png')";
            heroRobotBackgroundPositionX = 0;
            heroRobotAnimationSpeed = 250;

            bulletCandA();
            bulletLaserSound.play();

        }

        if (keyPressed == "x" || keyPressed == "X" || keyPressed == "Enter") {

            if (keyDownCheck == false) {
                // Melee Attack - x or X or Enter
                heroRobotAnimationName = 6; // 6 == Melee Attack
                heroRobotCharactorId.style.backgroundImage = "url('level1/6_robotfree_Melee.png')";
                heroRobotBackgroundPositionX = 0;
                heroRobotAnimationSpeed = 100;
                setTimeout(function() {
                    meleeLaserSound.play();
                }, 200);
                keyDownCheck = true;
            }

        }

        if (keyPressed == "o") {
            heroRobotHealthWidth = -5;
        }

        // if (keyPressed == "f" || keyPressed == "F" || keyPressed == "Enter") {}
    }

}

function bulletCandA() {
    var heroRobotBullet = document.createElement("div"); // Bullet Creating
    heroRobotBullet.className = "heroRobotBullet";
    heroRobotCharactorId.appendChild(heroRobotBullet);
    heroRobotBullet.style.marginLeft = "370px";

    heroRobotBulletChaningId = heroRobotBulletChaningId + 1;
    heroRobotBullet.id = "heroRobotBullet" + heroRobotBulletChaningId;

    var heroBullet = document.getElementById("heroRobotBullet" + heroRobotBulletChaningId);

    var bulletHit = setInterval(function() { // Bullet Animation setInterval
        var heroBulletML = parseInt(heroBullet.style.marginLeft) + 100;
        heroBullet.style.marginLeft = heroBulletML + "px";

        if (heroBulletML > 7670) {
            heroBullet.remove();
        }

    }, 200);

}

// Game Playing Start in This Function
function gamePlayStartCounter() { // Start Counter

    var startPlayingH1 = document.createElement("h1");
    startPlayingH1.className = "startPlayingH1";

    startPlayingH1.innerHTML = startPlayingNo;

    startPlayAnimationNumber = setInterval(function() { // Playing Number Animation

        startPlayingNo--;

        if (startPlayingNo == 0) {
            // Start Text Appearing
            startPlayingH1.innerHTML = "Start";
        } else {
            startPlayingH1.innerHTML = startPlayingNo;
        }
        if (startPlayingNo == -1) {
            // Start Game Here         
            startPlayingH1.remove();

            // GameStart
            heroRobotAnimationStart(); // Hero Robot Animation Start
            keyEnable = true;
            l1Audio.play();

            // Endline
            clearInterval(startPlayAnimationNumber);
        }
    }, 800);

    level1Background.appendChild(startPlayingH1);
}


// Hero Robot Bullet Variables 
var heroRobotBulletMarginLeft = 68;
var heroRobotBulletAnimationId = 0;
var heroRobotBulletChaningId = 0;

// Bullet Muzzle Variables
var heroRobotBulletMuzzle = document.createElement("div");
heroRobotBulletMuzzle.className = "heroRobotBulletMuzzle";
heroRobotBulletMuzzleBackgroundPositionX = 0;
heroRobotBulletMuzzleAnimationId = 0;

// Hero Robot Charactor Variables
var heroRobotCharactorId = document.createElement("div");
heroRobotCharactorId.style.marginLeft = "";
heroRobotCharactorId.style.marginTop = "";
heroRobotCharactorId.className = "heroRobotCharactorId";

function heroRobotCharactor() { // Hero Robot Charactor Creator
    level1Background.appendChild(heroRobotCharactorId);
}

// Hero Robot Animation Variables
var heroRobotBackgroundPositionX = 0;
var heroRobotBackgroundPositionY = 0;

var heroRobotAnimationName = 1;
//0 == Backward Run
//1 == Idle
//2 == Forward Run
//3 == Shoot
//6 == Melee
//10 == Dead, 

var heroRobotAnimationNumber = 0;
var heroRobotAnimationSpeed = 200;

function heroRobotAnimationStart() {

    heroRobotBackgroundPositionY = 0;

    heroRobotAnimationNumber = setInterval(function() { // Hero Robot Animation Start

        heroRobotCharactorId.style.backgroundPositionX = heroRobotBackgroundPositionX + "px";
        heroRobotCharactorId.style.backgroundPositionY = heroRobotBackgroundPositionY + "px";

        if (heroRobotAnimationName == 0) {
            heroRobotBackgroundPositionX = heroRobotBackgroundPositionX + 567; // Backward Animation
        } else {
            heroRobotBackgroundPositionX = heroRobotBackgroundPositionX - 567; // Forward Animation
        }

        if (heroRobotAnimationName == 0) { // Background Move when Backward Running
            level1BackgroundPositionX = level1BackgroundPositionX + backgroundMoveSpeed;
            level1Background.style.backgroundPositionX = level1BackgroundPositionX + "px";
        }

        if (heroRobotAnimationName == 2) { // Background Move when Forward Running
            level1BackgroundPositionX = level1BackgroundPositionX - backgroundMoveSpeed;
            level1Background.style.backgroundPositionX = level1BackgroundPositionX + "px";
        }

        if (heroRobotAnimationName == 3) { // Shoot Muzzle Effect & Bullet Append & Animation

            heroRobotCharactorId.appendChild(heroRobotBulletMuzzle); // Bullet Muzzle Append
            heroRobotBulletMuzzleBackgroundPositionX = 0;

            heroRobotBulletMuzzleAnimationId = setInterval(function() { // Shoot Muzzle Animation setInterval
                heroRobotBulletMuzzle.style.backgroundPositionX = heroRobotBulletMuzzleBackgroundPositionX + "px";
                heroRobotBulletMuzzleBackgroundPositionX = heroRobotBulletMuzzleBackgroundPositionX - 19;
                if (heroRobotBulletMuzzleBackgroundPositionX == -95) {
                    heroRobotBulletMuzzleBackgroundPositionX = 0;
                }
            }, 200);
        }


        if (heroRobotBackgroundPositionX == -2268 & heroRobotAnimationName == 3) { // Shoot Reset to Idle

            heroRobotAnimationName = 1; // 1 == Idle
            heroRobotCharactorId.style.backgroundImage = "url('level1/1_robotfree_Idle.png')";
            heroRobotBackgroundPositionX = 0;
            heroRobotAnimationSpeed = 200;

            // Bullet Muzzle
            clearInterval(heroRobotBulletMuzzleAnimationId);
            heroRobotBulletMuzzle.remove();
            heroRobotBulletMuzzleBackgroundPositionX = 0;
        }

        if (heroRobotBackgroundPositionX == -4536 & heroRobotAnimationName == 6) { // Melee Attack Reset to Idle
            heroRobotAnimationName = 1; // 1 == Idle
            heroRobotCharactorId.style.backgroundImage = "url('level1/1_robotfree_Idle.png')";
            heroRobotBackgroundPositionX = 0;
            heroRobotAnimationSpeed = 200;
        }

        if (heroRobotAnimationName == 0 & heroRobotBackgroundPositionX == 4536) { // Backward Run Background PositionX Reset
            heroRobotBackgroundPositionX = 0;
        }

        if (heroRobotAnimationName == 1 & heroRobotBackgroundPositionX == -5670) { // Idle Background PositionX Reset
            heroRobotBackgroundPositionX = 0;
        }

        if (heroRobotAnimationName == 2 & heroRobotBackgroundPositionX == -4536) { // Forward Run Background PositionX Reset
            heroRobotBackgroundPositionX = 0;
        }

        if (heroRobotAnimationName == 3 & heroRobotBackgroundPositionX == -2268) { // Shoot Background PositionX Reset
            heroRobotBackgroundPositionX = 0;
        }

        if (heroRobotAnimationName == 6 & heroRobotBackgroundPositionX == -4536) { // Melee Background PositionX Reset
            heroRobotBackgroundPositionX = 0;
        }

    }, heroRobotAnimationSpeed);
}

// Hero Robot Health Bar
var heroRobotHealth = document.createElement("div");
heroRobotHealth.className = "heroRobotHealth";
var heroRobotHealthWidth = 360;

function heroRobotHealthStart() {
    document.body.appendChild(heroRobotHealth);

    var heroRobotHealthDot = document.createElement("div");
    heroRobotHealthDot.className = "heroRobotHealthDot";
    heroRobotHealthDot.id = "heroRobotHealthDot";
    heroRobotHealthDot.style.marginLeft = "-9px";
    heroRobotHealth.appendChild(heroRobotHealthDot);

    /*for (var i = 0; i < 10; i++) {
        var heroRobotHealthDot = document.createElement("div");
        heroRobotHealthDot.className = "heroRobotHealthDot heroRobotHealthDot" + i;
        heroRobotHealthDot.id = "heroRobotHealthDot" + i;
        heroRobotHealth.appendChild(heroRobotHealthDot);
    }*/
}

var coinIdSet = 0;

function coinsForLevel1() { // Coin Create, Animate, Set Random Margin Left, Animate Margin Left

    var coin = document.createElement("div");
    coin.className = "coin";
    level1Background.appendChild(coin);
    coin.style.backgroundPositionX = "0px";

    var coinML = Math.floor(Math.random() * 50000);
    coin.style.marginLeft = coinML + "px";

    coinIdSet++;
    coin.id = "coin" + coinIdSet;
    var coinId = document.getElementById("coin" + coinIdSet);

    var coinAnimationId = setInterval(function() { // Coin Background PositionX Animation

        var coinBackgroundPositionX = parseInt(coinId.style.backgroundPositionX) - 279;
        coinId.style.backgroundPositionX = coinBackgroundPositionX + "px";

        var robotML = parseInt(heroRobotCharactorId.style.marginLeft);
        var coinML = parseInt(coinId.style.marginLeft);

        if (robotML >= coinML) {
            coinId.remove();
            coinPick.play();
            xpIdentifier = "coin"; //Coin Identifier
            clearInterval(coinAnimationId);
            clearInterval(coinMLAnimationId);
            gameScoreCreate();
        }

    }, 200);

    var coinMLAnimationId = setInterval(function() { // Coin Margin Left Animation

        if (heroRobotAnimationName == 0) { // Backward Run Coin Animation
            var coinNewML = parseInt(coinId.style.marginLeft);
            coinNewML = coinNewML + coinMoveWithBackgroundSpeed;
            coinId.style.marginLeft = coinNewML + "px";
        }

        if (heroRobotAnimationName == 2) { // Forward Run Coin Animation
            var coinNewML = parseInt(coinId.style.marginLeft);
            coinNewML = coinNewML - coinMoveWithBackgroundSpeed;
            coinId.style.marginLeft = coinNewML + "px";
        }

    }, 200);
}

var missile1Id = 0;

function missile1Shoot() {

    var missile1 = document.createElement("div");

    var missile1Class = Math.floor(Math.random() * 3);
    missile1.className = "missile missile" + missile1Class;

    missile1Id = missile1Id + 1;
    missile1.id = "missile" + missile1Id;
    level1Background.appendChild(missile1);
    missile1.style.backgroundPositionX = "0px";

    var missleML = Math.floor(Math.random() * 50000);
    missile1.style.marginLeft = missleML + "px";

    var missile1ChangeId = document.getElementById("missile" + missile1Id);

    var missile1PXAnimation = setInterval(function() {

        var missile1BackgroundPositionX = parseInt(missile1ChangeId.style.backgroundPositionX) - 512;
        missile1ChangeId.style.backgroundPositionX = missile1BackgroundPositionX + "px";

    }, 200);

    var missile1MLAnimation = setInterval(function() {

        var missile1MLNew = parseInt(missile1ChangeId.style.marginLeft) - missleMovingSpeed;
        missile1ChangeId.style.marginLeft = missile1MLNew + "px";

        var heroRobotML = parseInt(heroRobotCharactorId.style.marginLeft);
        var Diff = heroRobotML - missile1MLNew;

        if (gameScore >= 10000) {
            clearInterval(missile1MLAnimation);
        }

        if (Diff > -260 & heroRobotAnimationName == 6) {
            missile1ChangeId.remove();
            xpIdentifier = "missile1";
            gameScoreCreate();
            lightBulletDestroing.play();
            clearInterval(missile1MLAnimation);
        }

        if (Diff > -200) {
            var heroRobotHealthBarWidthId = document.getElementById("heroRobotHealthDot");
            heroRobotHealthWidth = heroRobotHealthWidth - 10;
            heroRobotHealthBarWidthId.style.width = heroRobotHealthWidth + "px";
            var robotHealthML = parseInt(heroRobotHealthDot.style.marginLeft);
            heroRobotHealthBarWidthId.style.marginLeft = robotHealthML + 1 + "px";
            lightBulletHit.play();
        }
        if (Diff > -120) {
            missile1ChangeId.remove();
            clearInterval(missile1MLAnimation);
        }

        if (heroRobotAnimationName == 10) {
            clearInterval(missile1MLAnimation);
            clearInterval(missile1PXAnimation);
        }
    }, 200);
}


function missile2Shoot(missile2Id) {

    var missile2 = document.createElement("div");
    missile2.className = "missileNew2";

    missile2.id = "missile2New" + missile2Id;
    level1Background.appendChild(missile2);
    missile2.style.backgroundPositionX = "0px";

    var missleML = Math.floor(Math.random() * 150000);
    missile2.style.marginLeft = missleML + "px";

    var missile2ChangeId = document.getElementById("missile2New" + missile2Id);

    var missile2MLAnimation = setInterval(function() {

        var missile2MLNew = parseInt(missile2ChangeId.style.marginLeft) - missleMovingSpeed;
        missile2ChangeId.style.marginLeft = missile2MLNew + "px";

        var heroRobotML = parseInt(heroRobotCharactorId.style.marginLeft);
        var Diff = heroRobotML - missile2MLNew;

        if (Diff > -260 & heroRobotAnimationName == 6) {
            missile2ChangeId.remove();
            xpIdentifier = "missile2";
            gameScoreCreate();
            missile2Destroing.play();
            clearInterval(missile2MLAnimation);
        }

        if (gameScore >= 10000) {
            clearInterval(missile2MLAnimation);
        }

        if (Diff > -200) {
            var heroRobotHealthBarWidthId = document.getElementById("heroRobotHealthDot");
            heroRobotHealthWidth = heroRobotHealthWidth - 30;
            heroRobotHealthBarWidthId.style.width = heroRobotHealthWidth + "px";
            var robotHealthML = parseInt(heroRobotHealthDot.style.marginLeft);
            heroRobotHealthBarWidthId.style.marginLeft = robotHealthML + 1 + "px";
            missile2Hit.play();
        }
        if (Diff > -120) {
            missile2ChangeId.remove();
            clearInterval(missile2MLAnimation);
        }

        if (heroRobotAnimationName == 10) {
            clearInterval(missile2MLAnimation);
            clearInterval(missile2PXAnimation);
        }
    }, 200);
}