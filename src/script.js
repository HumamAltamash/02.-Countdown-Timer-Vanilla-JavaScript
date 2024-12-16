(function () {
  "use strict";

  // Querying DOM elements
  const hour = document.querySelector(".hour");
  const min = document.querySelector(".min");
  const sec = document.querySelector(".sec");

  const startBtn = document.querySelector(".start");
  const stopBtn = document.querySelector(".stop");
  const resetBtn = document.querySelector(".reset");

  let countdownTimer = null;

  // Function declarations
  function startInterval() {
    if (countdownTimer) return;

    // Hide start button and show stop button
    startBtn.style.display = "none";
    stopBtn.style.display = "inline-block";

    countdownTimer = setInterval(() => updateTimer(), 1000);
  }

  function stopInterval(state) {
    // Toggle button states based on the current action
    if (state === "pause") {
      startBtn.textContent = "Continue";
    } else {
      startBtn.textContent = "Start";
    }

    startBtn.style.display = "inline-block";
    stopBtn.style.display = "none";

    clearInterval(countdownTimer);
    countdownTimer = null;
  }

  function resetTimer() {
    hour.value = "";
    min.value = "";
    sec.value = "";
    stopInterval();
  }

  function updateTimer() {
    let hours = parseInt(hour.value, 10) || 0;
    let minutes = parseInt(min.value, 10) || 0;
    let seconds = parseInt(sec.value, 10) || 0;

    if (seconds > 60) {
      minutes += Math.floor(seconds / 60);
      seconds %= 60;
    }

    if (minutes > 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
    }

    if (hours === 0 && minutes === 0 && seconds === 0) {
      resetTimer();
    } else if (seconds > 0) {
      seconds -= 1;
    } else if (minutes > 0) {
      seconds = 59;
      minutes -= 1;
    } else if (hours > 0) {
      minutes = 59;
      hours -= 1;
    }

    hour.value = String(hours).padStart(2, "0");
    min.value = String(minutes).padStart(2, "0");
    sec.value = String(seconds).padStart(2, "0");
  }

  // Event listeners
  startBtn.addEventListener("click", () => {
    const hours = parseInt(hour.value, 10) || 0;
    const minutes = parseInt(min.value, 10) || 0;
    const seconds = parseInt(sec.value, 10) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) return;

    startInterval();
  });

  stopBtn.addEventListener("click", () => stopInterval("pause"));

  resetBtn.addEventListener("click", resetTimer);
})();
