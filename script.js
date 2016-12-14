document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded");
});
reset();

///dice roll random numbers
function random(die){
  die = Math.ceil(Math.random() * 6);
  return die;
}

function rollDie(id) {
  var die = $(id);
  if (die.hasClass("active")){
    die.removeClass("face1 face2 face3 face4 face5 face6");
    die.animate({marginLeft: (Math.random()*2.3)* 100}, 130);
    var roll = random(die);
    die.addClass("face" + roll);
    // adds tilt
    if ($("#die1").hasClass("active")){
    $("#die1").addClass("rotate");
  }  if ($("#die3").hasClass("active")){
    $("#die3").addClass("rotate2");
  }  if ($("#die5").hasClass("active")){
    $("#die5").addClass("rotate3");
  }
    return roll;
  }
}

/// roll button rolls dice
$("#roll").click(rollEachDie);

function rollEachDie() {
  var rolls = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0};
  for (var i = 0; i < 6; i++) {
    var roll = rollDie("#die" + i);
    rolls[roll]++;
  }

  displayScores(rolls);

}





//count up number of numbers and add dice faces
var inPlay = {
  "ones": -1,
  "twos": -1,
  "threes": -1,
  "fours": -1,
  "fives": -1,
  "sixes": -1
};

function getLocked(number){
  return inPlay[number];
}


function setLocked(number, value){
  inPlay[number] = value;
}


function displayScores(rolls) {
  console.log(inPlay);
  console.log(getLocked("ones"));
  var ones = getLocked("ones") < 0 ? rolls[1] : getLocked("ones");
  var twos = getLocked("twos") < 0 ? (rolls[2] *2) : getLocked("twos");
  var threes = getLocked("threes") < 0 ? (rolls[3] *3) :getLocked("threes");
  var fours = getLocked("fours") < 0 ? (rolls[4] * 4): getLocked("fours");
  var fives = getLocked("fives") < 0 ? (rolls[5] * 5): getLocked("fives");
  var sixes = getLocked("sixes") < 0 ? (rolls[6] * 6): getLocked("sixes");
  console.log(ones, twos, threes, fours, fives, sixes);

//display on scorecard
  if(ones > 0){ // & card is in play
    $("#ones").text(ones);
    // lockin function here
  } else {
    $("#ones").text("");
  }

  if(twos > 0){
    $("#twos").text(twos);

  } else {
    $("#twos").text("");
  }

  if (threes > 0){
    $("#threes").text(threes);

  } else {
    $("#threes").text("");
  }

  if (fours > 0){
    $("#fours").text(fours);
  } else {
    $("#fours").text("");
  }

  if (fives > 0){
    $("#fives").text(fives);
  } else {
    $("#fives").text("");
  }

  if (sixes > 0){
    $("#sixes").text(sixes);
  } else {
    $("#sixes").text("");
  }
}

$(".inplay").click(function(){
  console.log("inplay fired");
  console.log($(this)[0].id);
  lockin($(this)[0].id);


});

function lockin(score){
  $("#" + score).removeClass("inplay").addClass("checked");
  setLocked(score, $("#" + score)[0].innerHTML);
  console.log($("#" + score)[0].innerHTML);
   //takes cell out of play and turns text black. also should add value and keep the number from being over written by roll
}




function resetDie(id, dieFace) {
  var die = $(id);
  die.removeClass("face1 face2 face3 face4 face5 face6 rotate rotate2 rotate3 held");
  die.addClass(dieFace);
  die.addClass("active");
  die.animate({marginLeft: 5});
}

//reset
$("#reset").click(reset);
function reset(){
  console.log("reset");

  //reset dice
  resetDie("#die1", "face1");
  resetDie("#die2", "face2");
  resetDie("#die3", "face3");
  resetDie("#die4", "face4");
  resetDie("#die5", "face5");

  //reset board
  $("#ones").text("").removeClass("redtext").addClass("inplay");
  $("#twos").text("").removeClass("redtext").addClass("inplay");
  $("#threes").text("").removeClass("redtext").addClass("inplay");
  $("#fours").text("").removeClass("redtext").addClass("inplay");
  $("#fives").text("").removeClass("redtext").addClass("inplay");
  $("#sixes").text("").removeClass("redtext").addClass("inplay");
}

$(".dice").click(function(ev){
  var die = $(ev.target);
  if (die.hasClass("active")){
    die.removeClass("active rotate rotate2 rotate3");
    die.addClass("held");
    die.animate({marginLeft: 5});
  } else if(die.hasClass("held")){
    die.removeClass("held");
    die.addClass("active");
  }
});


/// TO DO tuesday:

// able to click score to confirm, and will not be over written on  next roll



//check if yacht
if (die1 == die2 == die3 == die4 == die5){
  $("#yacht").text(50).addClass("redtext");
}else{}
