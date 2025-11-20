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
  weight: 10,      // pounds
  happiness: 5,    // tail wags per min
  energy: 6        // "zzz" units (0–10)
};

// Action handlers
function clickedTreatButton() {
  pet_info.happiness += 1;
  pet_info.weight += 1;
  pet_info.energy += 1; // snacks perk you up a bit
  afterAction("Yum! Thanks for the treat!");
}

function clickedPlayButton() {
  pet_info.happiness += 2;
  pet_info.weight -= 1;
  pet_info.energy -= 2;
  wigglePet();
  afterAction("That was fun! Wanna play again?");
}

function clickedExerciseButton() {
  pet_info.happiness -= 1;
  pet_info.weight -= 2;
  pet_info.energy -= 2;
  wigglePet();
  afterAction("Phew... great workout!");
}

// NEW ACTION + BEHAVIOR
function clickedSleepButton() {
  pet_info.energy += 3;        // main effect
  pet_info.happiness += 1;     // well-rested = happier
  // weight unchanged
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

// Updates your HTML with the current values in your pet_info object
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
  // jQuery method #1: fadeIn/fadeOut for a smooth transient bubble.
  // We also use .stop(true,true) to cancel any queued animations so messages don't stack.
  $(".pet-comment")
    .stop(true, true)
    .hide()
    .text(msg)
    .fadeIn(200)     // <— not used in the starter; smooth entrance
    .delay(1200)
    .fadeOut(400);   // <— smooth exit
}

// Fun little wiggle animation for “play”/“exercise”
function wigglePet() {
  const $img = $(".pet-image");
  // retrigger the CSS animation even if it’s already applied
  $img.removeClass("shake");
  // force a reflow so the class re-add restarts the animation
  // (no layout drift—transform doesn't affect flow)
  void $img[0].offsetWidth;
  $img.addClass("shake");
}
