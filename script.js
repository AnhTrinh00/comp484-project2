$(function () {
  // Initialize UI
  checkAndUpdatePetInfoInHtml();

  // Button handlers
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".sleep-button").click(clickedSleepButton);
});

// Core pet data (numbers, not strings)
var pet_info = {
  name: "Rover",
  weight: 10,
  happiness: 5,
  energy: 6
};

// Action handlers
function clickedTreatButton() {
  pet_info.happiness += 1;
  pet_info.weight += 1;
  pet_info.energy += 1;
  afterAction("Yum! Thanks for the treat!");
}

function clickedPlayButton() {
  pet_info.happiness += 2;
  pet_info.weight -= 1;
  pet_info.energy -= 2;
  afterAction("That was fun! Wanna play again?");
  wigglePet();

  // Unique jQuery method: .wrap()
  // Adds a fun frame when playing
  $(".pet-image").wrap("<div class='pet-frame'></div>");
}

function clickedExerciseButton() {
  pet_info.happiness -= 1;
  pet_info.weight -= 2;
  pet_info.energy -= 2;
  afterAction("Phew... great workout!");
  wigglePet();

  // Unique jQuery method: .unwrap()
  // Removes the frame when exercising
  $(".pet-image").unwrap();
}


// NEW ACTION + BEHAVIOR
function clickedSleepButton() {
  pet_info.energy += 3;
  pet_info.happiness += 1;
  afterAction("Zzz... I feel rested!");
}

// Shared post-action flow
function afterAction(commentText) {
  checkAndUpdatePetInfoInHtml();
  showComment(commentText);
}

// Keep values sensible before painting UI
function checkWeightAndHappinessBeforeUpdating() {
  // Lower bounds
  pet_info.weight = Math.max(0, pet_info.weight);
  pet_info.happiness = Math.max(0, pet_info.happiness);
  pet_info.energy = Math.max(0, pet_info.energy);

  // Optional upper caps to avoid runaway numbers
  pet_info.happiness = Math.min(20, pet_info.happiness);
  pet_info.energy = Math.min(10, pet_info.energy);

  // Visual cue if exhausted
  if (pet_info.energy === 0) {
    $(".pet-image").addClass("sad");
  } else {
    $(".pet-image").removeClass("sad");
  }
}

function updatePetInfoInHtml() {
  $(".name").text(pet_info["name"]);
  $(".weight").text(pet_info["weight"]);
  $(".happiness").text(pet_info["happiness"]);
  $(".energy").text(pet_info["energy"]);
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

// Visual notification from the pet WITHOUT alert/console
function showComment(msg) {
  $(".pet-comment")
    .stop(true, true)
    .hide()
    .text(msg)
    .fadeIn(200)
    .delay(1200)
    .fadeOut(400);
}

// Fun little wiggle animation for “play”/“exercise”
function wigglePet() {
  const $img = $(".pet-image");
  $img.removeClass("shake");
  void $img[0].offsetWidth;
  $img.addClass("shake");
}

function clickedPlayButton() {
  pet_info.happiness += 2;
  pet_info.weight -= 1;
  pet_info.energy -= 2;
  afterAction("That was fun! Wanna play again?");
  wigglePet();

  // unique method: .wrap()
  $(".pet-image").wrap("<div class='pet-frame'></div>");
}

function blinkPet() {
  $(".pet-image")
    .queue(function (next) {
      $(this).css("opacity", 0.3);
      next();
    })
    .queue(function (next) {
      $(this).css("opacity", 1);
      next();
    });
}

