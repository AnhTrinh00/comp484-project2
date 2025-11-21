$(function () {
  // Initialize UI
  checkAndUpdatePetInfoInHtml();

  // Button handlers
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".sleep-button").click(clickedSleepButton);
});

/* ---------------------------
   Core pet data
---------------------------- */
var pet_info = {
  name: "Rover",
  weight: 10,      // pounds
  happiness: 5,    // tail wags per min
  energy: 6        // zzz units (0–10)
};

/* ---------------------------
   Actions
---------------------------- */
function clickedTreatButton() {
  pet_info.happiness += 1;
  pet_info.weight += 1;
  pet_info.energy += 1;
  afterAction("Yum! Thanks for the treat!");
}

function clickedPlayButton() {
  // 🚫 Prevent playing when energy is 0
  if (pet_info.energy <= 0) {
    afterAction("I'm too tired to play right now...");
    return;
  }

  pet_info.happiness += 2;
  pet_info.weight -= 1;
  pet_info.energy -= 2;

  // Wrap the image when playing (unique method #1)
  const $img = $(".pet-image");
  if (!$img.parent().hasClass("pet-frame")) {
    $img.wrap("<div class='pet-frame'></div>");
  }

  wigglePet();
  afterAction("That was fun! Wanna play again?");
}

function clickedExerciseButton() {
  pet_info.happiness -= 1;
  pet_info.weight -= 2;
  pet_info.energy -= 2;

  // Remove the wrap when exercising
  if ($(".pet-image").parent().hasClass("pet-frame")) {
    $(".pet-image").unwrap(); // counterpart to .wrap()
  }

  wigglePet();
  afterAction("Phew... great workout!");
}

function clickedSleepButton() {
  pet_info.energy += 3;        // main effect
  pet_info.happiness += 1;     // well-rested = happier
  afterAction("Zzz... I feel rested!");
}

/* ---------------------------
   Shared post-action flow
---------------------------- */
function afterAction(commentText) {
  checkAndUpdatePetInfoInHtml();
  showComment(commentText);
  blinkPet(); // subtle feedback using .queue() (unique method #2)
}

/* ---------------------------
   UI + Constraints
---------------------------- */
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

/* ---------------------------
   Feedback & Animations
---------------------------- */
// Comment bubble without using classmate-claimed methods
function showComment(msg) {
  const $c = $(".pet-comment");
  $c.stop(true, true);
  $c.text(msg);
  $c.css("display", "block");
  // hide after a short delay (no jQuery effects used here)
  setTimeout(() => $c.css("display", "none"), 1400);
}

// CSS transform-based shake (no layout drift)
function wigglePet() {
  const $img = $(".pet-image");
  $img.removeClass("shake");
  // force reflow so the CSS animation restarts
  void $img[0].offsetWidth;
  $img.addClass("shake");
}

// Subtle blink using .queue() (unique method #2)
function blinkPet() {
  $(".pet-image")
    .queue(function (next) {
      $(this).css("opacity", 0.3);
      setTimeout(next, 120);
    })
    .queue(function (next) {
      $(this).css("opacity", 1);
      setTimeout(next, 120);
    });
}
