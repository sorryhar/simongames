var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Detect user click input
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Detect user keyboard input
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }
});

// Generate random sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

// Play sounds
function playSound(colour) {
  var audio = new Audio('sounds/' + colour + '.mp3');
  audio.play();
}

// Animate user on pressed
function animatePress(currentColour) {
  $("#" + currentColour)
    .addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Check user's sequence
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
          nextSequence();
        },
        1000);
    }

  } else {
    playSound("wrong");
    $("body")
      .addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over, Press Any Key to Restart");
    startOver();
  }
}

// Restart the game
function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}
