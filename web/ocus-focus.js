// ================================================================
// OCUS FOCUS
// MAIN APPLICATION LOGIC
// ================================================================


// ================================================================
// PAGE ELEMENTS
// ================================================================

const pages = {

    modeSelection:
        document.getElementById("page-mode-selection"),

    customMode:
        document.getElementById("custom-mode-landing-page"),

    eyeHealth:
        document.getElementById("page-eye-health"),

    activeTimer:
        document.getElementById("page-active-timer")

};


// ================================================================
// PAGE NAVIGATION
// ================================================================

function showPage(page) {

    Object.values(pages).forEach(currentPage => {

        currentPage.hidden = true;

    });


    page.hidden = false;

}


// ================================================================
// MODE SELECTION
// ================================================================

const pomodoro =
    document.getElementById("Pomodoro-container");

const fiftyTwo =
    document.getElementById("FiftyTwoSeventeen-container");

const animedoro =
    document.getElementById("Animedoro-container");

const ultradian =
    document.getElementById("Ultradian-container");

const customMode =
    document.getElementById("custom-mode");


let selectedWorkSeconds = 0;

let selectedBreakSeconds = 0;


function selectMode(workMinutes, breakMinutes) {

    selectedWorkSeconds =
        workMinutes * 60;

    selectedBreakSeconds =
        breakMinutes * 60;


    resetEyeHealthSelection();

    showPage(pages.eyeHealth);

}


pomodoro.addEventListener("click", () => {

    selectMode(25, 5);

});


fiftyTwo.addEventListener("click", () => {

    selectMode(52, 17);

});


animedoro.addEventListener("click", () => {

    selectMode(50, 20);

});


ultradian.addEventListener("click", () => {

    selectMode(90, 20);

});


// ================================================================
// CUSTOM MODE
// ================================================================

const selectedHour =
    document.getElementById("selected-hour");

const selectedMinute =
    document.getElementById("selected-minute");

const selectedSecond =
    document.getElementById("selected-second");


const selectedBreakHour =
    document.getElementById(
        "selected-break-hour-value"
    );

const selectedBreakMinute =
    document.getElementById(
        "selected-break-minute-value"
    );

const selectedBreakSecond =
    document.getElementById(
        "selected-break-second-value"
    );


const keypadButtons =
    document.querySelectorAll(".keypad-button");


const toggleButton =
    document.getElementById("toggle-button");


const customBackButton =
    document.getElementById("custom-back-button");


let timeInput = "";

let breakTimeInput = "";


// false = work
// true = break

let editingBreakTime = false;


// ================================================================
// CUSTOM MODE OPEN
// ================================================================

customMode.addEventListener("click", () => {

    timeInput = "";

    breakTimeInput = "";

    editingBreakTime = false;


    updateTimeDisplay();

    showPage(pages.customMode);

});


// ================================================================
// CUSTOM MODE BACK
// ================================================================

customBackButton.addEventListener("click", () => {

    timeInput = "";

    breakTimeInput = "";

    editingBreakTime = false;

    showPage(pages.modeSelection);

});


// ================================================================
// CUSTOM DISPLAY
// ================================================================

function updateTimeDisplay() {

    const paddedInput =
        timeInput.padStart(6, "0");


    const hours =
        paddedInput.slice(0, 2);

    const minutes =
        paddedInput.slice(2, 4);

    const seconds =
        paddedInput.slice(4, 6);


    selectedHour.textContent = hours;

    selectedMinute.textContent = minutes;

    selectedSecond.textContent = seconds;


    const paddedBreakInput =
        breakTimeInput.padStart(6, "0");


    const breakHours =
        paddedBreakInput.slice(0, 2);

    const breakMinutes =
        paddedBreakInput.slice(2, 4);

    const breakSeconds =
        paddedBreakInput.slice(4, 6);


    selectedBreakHour.textContent =
        breakHours;

    selectedBreakMinute.textContent =
        breakMinutes;

    selectedBreakSecond.textContent =
        breakSeconds;


    // ------------------------------------------------------------
    // BUTTON STATE
    // ------------------------------------------------------------

    if (!editingBreakTime) {

        toggleButton.disabled =
            timeInput.length === 0;

    } else {

        toggleButton.disabled =
            breakTimeInput.length === 0;

    }


    // ------------------------------------------------------------
    // LABELS
    // ------------------------------------------------------------

    const workStatus =
        document.getElementById(
            "work-input-status"
        );

    const breakStatus =
        document.getElementById(
            "break-input-status"
        );


    if (editingBreakTime) {

        workStatus.textContent =
            "COMPLETE";

        workStatus.style.color =
            "var(--green)";


        breakStatus.textContent =
            "ENTER DURATION";

        breakStatus.style.color =
            "var(--accent-light)";

    } else {

        workStatus.textContent =
            timeInput.length > 0
                ? "READY"
                : "ENTER DURATION";

        workStatus.style.color =
            timeInput.length > 0
                ? "var(--green)"
                : "var(--muted)";


        breakStatus.textContent =
            "LOCKED";

        breakStatus.style.color =
            "var(--muted)";
    }

}


// ================================================================
// CUSTOM KEYPAD
// ================================================================

keypadButtons.forEach(button => {

    button.addEventListener("click", () => {

        const key =
            button.dataset.key;


        // --------------------------------------------------------
        // NUMBER
        // --------------------------------------------------------

        if (!isNaN(key)) {

            if (editingBreakTime) {

                if (breakTimeInput.length < 6) {

                    breakTimeInput += key;

                }

            } else {

                if (timeInput.length < 6) {

                    timeInput += key;

                }

            }


            updateTimeDisplay();

            return;

        }


        // --------------------------------------------------------
        // CLEAR
        // --------------------------------------------------------

        if (key === "clear") {

            timeInput = "";

            breakTimeInput = "";

            editingBreakTime = false;

            updateTimeDisplay();

            return;

        }


        // --------------------------------------------------------
        // BACKSPACE
        // --------------------------------------------------------

        if (key === "backspace") {

            if (editingBreakTime) {

                if (breakTimeInput.length > 0) {

                    breakTimeInput =
                        breakTimeInput.slice(
                            0,
                            -1
                        );

                } else {

                    // Once break is empty,
                    // move back to work.

                    editingBreakTime = false;

                }

            } else {

                if (timeInput.length > 0) {

                    timeInput =
                        timeInput.slice(
                            0,
                            -1
                        );

                }

            }


            updateTimeDisplay();

        }

    });

});


// ================================================================
// CUSTOM CONTINUE BUTTON
// ================================================================

toggleButton.addEventListener("click", () => {


    // ------------------------------------------------------------
    // WORK → BREAK
    // ------------------------------------------------------------

    if (!editingBreakTime) {

        if (timeInput.length === 0) {

            return;

        }


        editingBreakTime = true;

        updateTimeDisplay();

        return;

    }


    // ------------------------------------------------------------
    // BREAK → EYE HEALTH
    // ------------------------------------------------------------

    if (breakTimeInput.length === 0) {

        return;

    }


    const workValue =
        timeInput.padStart(6, "0");


    const breakValue =
        breakTimeInput.padStart(6, "0");


    const workHours =
        Number(workValue.slice(0, 2));


    const workMinutes =
        Number(workValue.slice(2, 4));


    const workSeconds =
        Number(workValue.slice(4, 6));


    const breakHours =
        Number(breakValue.slice(0, 2));


    const breakMinutes =
        Number(breakValue.slice(2, 4));


    const breakSeconds =
        Number(breakValue.slice(4, 6));


    selectedWorkSeconds =
        (workHours * 3600) +
        (workMinutes * 60) +
        workSeconds;


    selectedBreakSeconds =
        (breakHours * 3600) +
        (breakMinutes * 60) +
        breakSeconds;


    if (
        selectedWorkSeconds <= 0 ||
        selectedBreakSeconds <= 0
    ) {

        return;

    }


    resetEyeHealthSelection();

    showPage(pages.eyeHealth);

});


// ================================================================
// EYE HEALTH
// ================================================================

const yesButton =
    document.getElementById("yes-button");

const noButton =
    document.getElementById("no-button");

const startSession =
    document.getElementById("btn-start-session");


let eyeHealthEnabled = false;


function resetEyeHealthSelection() {

    eyeHealthEnabled = false;

    yesButton.classList.remove("selected");

    noButton.classList.remove("selected");

    startSession.disabled = true;

}


yesButton.addEventListener("click", () => {

    eyeHealthEnabled = true;

    yesButton.classList.add("selected");

    noButton.classList.remove("selected");

    startSession.disabled = false;

});


noButton.addEventListener("click", () => {

    eyeHealthEnabled = false;

    noButton.classList.add("selected");

    yesButton.classList.remove("selected");

    startSession.disabled = false;

});


// ================================================================
// BACK TO MODES
// ================================================================

const backToModes =
    document.getElementById(
        "btn-back-to-modes"
    );


backToModes.addEventListener("click", () => {

    resetEyeHealthSelection();

    showPage(pages.modeSelection);

});


// ================================================================
// TIMER ELEMENTS
// ================================================================

const timerDisplay =
    document.getElementById(
        "timer-countdown"
    );


const pauseButton =
    document.getElementById(
        "pause-unpause"
    );


const restartButton =
    document.getElementById(
        "restart"
    );


const backToSession =
    document.getElementById(
        "back-to-session"
    );


const phaseLabel =
    document.getElementById(
        "phase-label"
    );


const timerStatus =
    document.getElementById(
        "timer-status"
    );


const sessionPhaseIndicator =
    document.getElementById(
        "session-phase-indicator"
    );


// ================================================================
// OVERLAY ELEMENTS
// ================================================================

const phaseOverlay =
    document.getElementById(
        "phase-overlay"
    );


const overlayKicker =
    document.getElementById(
        "overlay-kicker"
    );


const overlayTitle =
    document.getElementById(
        "overlay-title"
    );


const overlayMessage =
    document.getElementById(
        "overlay-message"
    );


const overlayCountdown =
    document.getElementById(
        "overlay-countdown"
    );


const overlayActions =
    document.getElementById(
        "overlay-actions"
    );


const overlayRestart =
    document.getElementById(
        "overlay-restart"
    );


const overlayContinue =
    document.getElementById(
        "overlay-continue"
    );


    // ================================================================
// SOFT BIRD SOUND
// ================================================================

let audioContext = null;


function playBirdSound() {

    try {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        if (audioContext.state === "suspended") {

            audioContext.resume();

        }


        const now =
            audioContext.currentTime;


        // --------------------------------------------------------
        // Create a soft bird-like two-note call
        // --------------------------------------------------------

        function birdNote(
            frequency,
            startTime,
            duration,
            volume
        ) {

            const oscillator =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();


            oscillator.type = "sine";

            oscillator.frequency.setValueAtTime(
                frequency,
                startTime
            );


            // Very gentle pitch movement

            oscillator.frequency.exponentialRampToValueAtTime(
                frequency * 1.04,
                startTime + duration
            );


            gain.gain.setValueAtTime(
                0,
                startTime
            );


            gain.gain.linearRampToValueAtTime(
                volume,
                startTime + 0.025
            );


            gain.gain.exponentialRampToValueAtTime(
                0.001,
                startTime + duration
            );


            oscillator.connect(gain);

            gain.connect(
                audioContext.destination
            );


            oscillator.start(startTime);

            oscillator.stop(
                startTime + duration
            );

        }


        // First bird note

        birdNote(
            880,
            now,
            0.22,
            0.085
        );


        // Second slightly higher note

        birdNote(
            1174.66,
            now + 0.16,
            0.30,
            0.070
        );


    } catch (error) {

        // Audio is optional.
        // If the browser blocks it, the timer continues normally.

        console.log(
            "Bird sound unavailable:",
            error
        );

    }

}


// Play the existing bird call three times for a noticeable state change.
function playBirdSoundThreeTimes() {

    playBirdSound();

    setTimeout(playBirdSound, 450);

    setTimeout(playBirdSound, 900);

}


// ================================================================
// TIMER STATE
// ================================================================

let timerInterval = null;

let remainingSeconds = 0;

let currentPhase = "work";

let timerRunning = false;

// Absolute end time keeps the countdown accurate when the app is inactive.
let timerDeadline = null;

// Keep both transition timers so they can always be cancelled safely.
let transitionInterval = null;
let transitionTimeout = null;

// Eye reminders are shown after every 20 minutes of active work time.
const EYE_REMINDER_INTERVAL_SECONDS = 20 * 60;
const EYE_REMINDER_DISPLAY_MS = 20000;
let nextEyeReminderAt = EYE_REMINDER_INTERVAL_SECONDS;
let eyeReminderTimeout = null;


// ================================================================
// FORMAT TIME
// ================================================================

function formatTime(totalSeconds) {

    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    const h =
        String(hours).padStart(2, "0");


    const m =
        String(minutes).padStart(2, "0");


    const s =
        String(seconds).padStart(2, "0");


    if (hours === 0) {

        return `${m}:${s}`;

    }


    return `${h}:${m}:${s}`;

}


// ================================================================
// UPDATE TIMER
// ================================================================

function updateTimerDisplay() {

    timerDisplay.textContent =
        formatTime(
            remainingSeconds
        );

}


// ================================================================
// UPDATE PHASE UI
// ================================================================

function updatePhaseUI() {

    if (currentPhase === "work") {

        phaseLabel.textContent =
            "WORK";

        sessionPhaseIndicator.textContent =
            "WORK";

        timerStatus.textContent =
            eyeHealthEnabled
                ? "Eye health reminders enabled"
                : "Deep focus";

    } else {

        phaseLabel.textContent =
            "BREAK";

        sessionPhaseIndicator.textContent =
            "BREAK";

        timerStatus.textContent =
            "Recover and recharge";

    }

}


// ================================================================
// START TIMER
// ================================================================

function startTimer() {

    clearInterval(timerInterval);

    timerRunning = true;
    timerDeadline = Date.now() + (remainingSeconds * 1000);
    pauseButton.textContent = "Ⅱ";

    // Update the display from the deadline rather than subtracting one
    // second per callback. This avoids drift when callbacks are delayed.
    const tick = () => {

        remainingSeconds = Math.max(
            0,
            Math.ceil((timerDeadline - Date.now()) / 1000)
        );

        updateTimerDisplay();

        if (currentPhase === "work") {
            checkEyeHealthReminder();
        }

        if (remainingSeconds <= 0) {

            clearInterval(timerInterval);
            timerInterval = null;
            timerDeadline = null;
            timerRunning = false;

            if (currentPhase === "work") {
                beginWorkCompleteTransition();
            } else {
                beginBreakFinished();
            }
        }

    };

    tick();

    if (timerRunning) {
        timerInterval = setInterval(tick, 250);
    }
}


// ================================================================
// EYE-HEALTH REMINDERS
// ================================================================

function clearEyeReminder() {

    clearTimeout(eyeReminderTimeout);
    eyeReminderTimeout = null;

}


function checkEyeHealthReminder() {

    if (!eyeHealthEnabled || currentPhase !== "work") {
        return;
    }

    const elapsedWorkSeconds =
        selectedWorkSeconds - remainingSeconds;

    if (elapsedWorkSeconds < nextEyeReminderAt) {
        return;
    }

    // Advance the threshold before displaying to prevent duplicate reminders.
    nextEyeReminderAt += EYE_REMINDER_INTERVAL_SECONDS;

    clearEyeReminder();

    playBirdSoundThreeTimes();

    timerStatus.textContent =
        "Eye break: look away at something 20 feet away for 20 seconds.";

    eyeReminderTimeout = setTimeout(() => {

        eyeReminderTimeout = null;

        if (timerRunning && currentPhase === "work") {
            playBirdSoundThreeTimes();
            timerStatus.textContent = "Eye health reminders enabled";
        }

    }, EYE_REMINDER_DISPLAY_MS);

}


// ================================================================
// WORK COMPLETE
// ================================================================

function beginWorkCompleteTransition() {

    timerRunning = false;

    clearInterval(timerInterval);


    // ------------------------------------------------------------
    // THREE-CALL BIRD SOUND: WORK PHASE ENDS
    // ------------------------------------------------------------

    playBirdSoundThreeTimes();


    // ------------------------------------------------------------
    // SHOW FULL SCREEN REMINDER
    // ------------------------------------------------------------

    showPhaseOverlay();


    overlayKicker.textContent =
        "FOCUS COMPLETE";


    overlayTitle.textContent =
        "WORK COMPLETE";


    overlayMessage.textContent =
        "Your break begins shortly.";


    overlayContinue.hidden = true;

    overlayRestart.hidden = true;

    overlayActions.hidden = true;


    let countdown = 3;

    overlayCountdown.textContent = countdown;

    // Clear any older transition before creating a new one.
    clearTransitionTimers();

    transitionInterval = setInterval(() => {

        countdown--;

        if (countdown > 0) {
            overlayCountdown.textContent = countdown;
        }

        if (countdown <= 0) {

            clearInterval(transitionInterval);
            transitionInterval = null;

            transitionTimeout = setTimeout(() => {
                transitionTimeout = null;
                startBreak();
            }, 700);

        }

    }, 1000);

}


function clearTransitionTimers() {

    clearInterval(transitionInterval);
    clearTimeout(transitionTimeout);

    transitionInterval = null;
    transitionTimeout = null;

}


// ================================================================
// START BREAK
// ================================================================

function startBreak() {

    clearTransitionTimers();
    clearEyeReminder();
    hidePhaseOverlay();

    // THREE-CALL BIRD SOUND: BREAK PHASE STARTS
    playBirdSoundThreeTimes();

    currentPhase = "break";

    remainingSeconds =
        selectedBreakSeconds;


    updatePhaseUI();

    updateTimerDisplay();


    startTimer();

}


// ================================================================
// BREAK FINISHED
// ================================================================

function beginBreakFinished() {

    timerRunning = false;

    clearInterval(timerInterval);


    // ------------------------------------------------------------
    // THREE-CALL BIRD SOUND: BREAK PHASE ENDS
    // ------------------------------------------------------------

    playBirdSoundThreeTimes();


    // ------------------------------------------------------------
    // SHOW COMPLETION SCREEN
    // ------------------------------------------------------------

    showPhaseOverlay();


    overlayKicker.textContent =
        "RECOVERY COMPLETE";


    overlayTitle.textContent =
        "BREAK FINISHED";


    overlayMessage.textContent =
        "Your recovery is complete. What would you like to do next?";


    // No countdown

    overlayCountdown.hidden = true;


    // Show both choices

    overlayActions.hidden = false;

    overlayRestart.hidden = false;

    overlayContinue.hidden = false;

}


// ================================================================
// SHOW OVERLAY
// ================================================================


function showPhaseOverlay() {

    phaseOverlay.hidden = false;

    overlayActions.hidden = true;

    overlayContinue.hidden = true;

    overlayRestart.hidden = true;

    overlayCountdown.hidden = false;

}


// ================================================================
// HIDE OVERLAY
// ================================================================

function hidePhaseOverlay() {

    phaseOverlay.hidden = true;

    overlayActions.hidden = true;

    overlayContinue.hidden = true;

    overlayRestart.hidden = true;

    overlayCountdown.hidden = false;

}

// ================================================================
// CONTINUE TO HOME
// ================================================================

overlayContinue.addEventListener("click", () => {

    resetTimer();

    hidePhaseOverlay();

    showPage(pages.modeSelection);

});

// ================================================================
// START SAME SESSION AGAIN
// ================================================================

overlayRestart.addEventListener("click", () => {

    // Close completion screen

    hidePhaseOverlay();


    // Start from WORK again

    currentPhase = "work";

    remainingSeconds =
        selectedWorkSeconds;

    nextEyeReminderAt = EYE_REMINDER_INTERVAL_SECONDS;
    clearEyeReminder();
    clearTransitionTimers();

    timerRunning = false;


    updatePhaseUI();

    updateTimerDisplay();


    timerStatus.textContent =
        eyeHealthEnabled
            ? "Eye health reminders enabled"
            : "Deep focus";


    pauseButton.textContent =
        "Ⅱ";


    startTimer();

});
// ================================================================
// PAUSE / RESUME
// ================================================================

pauseButton.addEventListener("click", () => {


    if (timerRunning) {

        clearInterval(timerInterval);
        timerInterval = null;
        timerDeadline = null;
        clearEyeReminder();

        timerRunning = false;

        pauseButton.textContent = "▶";

        timerStatus.textContent =
            "Paused";


        return;

    }


    if (remainingSeconds <= 0) {

        return;

    }


    updatePhaseUI();

    startTimer();

});


// ================================================================
// RESTART
// ================================================================

restartButton.addEventListener("click", () => {

    clearInterval(timerInterval);
    timerInterval = null;
    timerDeadline = null;
    clearTransitionTimers();
    clearEyeReminder();
    hidePhaseOverlay();

    nextEyeReminderAt = EYE_REMINDER_INTERVAL_SECONDS;
    currentPhase = "work";

    remainingSeconds =
        selectedWorkSeconds;


    timerRunning = false;


    updatePhaseUI();

    updateTimerDisplay();


    pauseButton.textContent = "▶";


    timerStatus.textContent =
        "Ready to focus";

});


// ================================================================
// START SESSION
// ================================================================

startSession.addEventListener("click", () => {

    if (
        selectedWorkSeconds <= 0 ||
        selectedBreakSeconds <= 0
    ) {

        return;

    }


    clearInterval(timerInterval);
    timerInterval = null;
    timerDeadline = null;
    clearTransitionTimers();
    clearEyeReminder();

    nextEyeReminderAt = EYE_REMINDER_INTERVAL_SECONDS;
    currentPhase = "work";

    remainingSeconds =
        selectedWorkSeconds;


    timerRunning = false;


    updatePhaseUI();

    updateTimerDisplay();


    timerStatus.textContent =
        eyeHealthEnabled
            ? "Eye health reminders enabled"
            : "Deep focus";


    showPage(pages.activeTimer);


    startTimer();

});


// ================================================================
// EXIT SESSION
// ================================================================

backToSession.addEventListener("click", () => {

    resetTimer();

    hidePhaseOverlay();

    showPage(pages.eyeHealth);

});


// ================================================================
// RESET TIMER
// ================================================================

function resetTimer() {

    clearInterval(timerInterval);
    timerInterval = null;
    timerDeadline = null;
    clearTransitionTimers();
    clearEyeReminder();

    nextEyeReminderAt = EYE_REMINDER_INTERVAL_SECONDS;
    timerRunning = false;

    remainingSeconds = 0;

    currentPhase = "work";


    pauseButton.textContent =
        "▶";


    timerStatus.textContent =
        "Ready to focus";


    updateTimerDisplay();

}


// ================================================================
// INITIAL STATE
// ================================================================

toggleButton.disabled = true;

startSession.disabled = true;

updateTimeDisplay();

updateTimerDisplay();

showPage(pages.modeSelection);