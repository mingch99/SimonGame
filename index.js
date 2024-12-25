var newSeq = [];
var plySeq = [];
var level;
var gaming = false;
 
//Start Game
function startGame() {
    level = 0;
    newSeq = [];
    plySeq = [];
    gaming = true;

    nextLevel();
}

//Next Level
function nextLevel() {
    newSeq = [];
    plySeq = [];
    level++;
    $("h1").html("Level " + level);

    buttonAnimation();
}

function flashButton(index) {
    var colors = ["green", "red", "yellow", "blue"];
    var sounds = ["green-sound", "red-sound", "yellow-sound", "blue-sound"];
    $("#" + colors[index]).addClass("pressed");
    document.getElementById(sounds[index]).play();
    setTimeout(function () {
        $("#" + colors[index]).removeClass("pressed");
    }, 100);
}

function buttonAnimation() {
    for (var i = 0; i < level; i ++) {
        var randomNumber = Math.floor(Math.random() * 4);

        if (i === 0) {
            newSeq.push(randomNumber);
            continue;
        }
        
        while (newSeq[i-1] === randomNumber) {
            randomNumber = Math.floor(Math.random() * 4);
        }
        newSeq.push(randomNumber);
    }

    let n = 0;
    function animateButton() {
        if (n < newSeq.length) {
            flashButton(newSeq[n]); // Flash each button with a delay
            n++;
            setTimeout(animateButton, 100); // Add delay between each button flash
        }
    }
    animateButton();
}

function handlePlayerClick(buttonID) {
    if (!gaming) return;
    
    var buttonValue;
    switch (buttonID) {
        case "#green": buttonValue = 0; break;
        case "#red": buttonValue = 1; break;
        case "#yellow": buttonValue = 2; break;
        case "#blue": buttonValue = 3; break;
    }
    flashButton(buttonValue);

    if (buttonValue !== newSeq[plySeq.length]) {
        gameOver();
        return;
    }

    plySeq.push(buttonValue);

    if (plySeq.length === newSeq.length) {
        setTimeout(nextLevel, 200); // Proceed to the next level with a short delay
    }
}

//Game Over
function gameOver() {


    $("body").addClass("game-over");
    document.getElementById("wrong-sound").play();
    setTimeout(function() {$("body").removeClass("game-over");}, 100);
    
    $("h1").html("Game Over, Press Any Key to Restart");
    gaming = false;
}

$("#green").click(function() {handlePlayerClick("#green");});
$("#red").click(function() {handlePlayerClick("#red");});
$("#yellow").click(function() {handlePlayerClick("#yellow");});
$("#blue").click(function() {handlePlayerClick("#blue");});

$(document).keypress(function() {
    if (!gaming) {
        startGame();
    }
});