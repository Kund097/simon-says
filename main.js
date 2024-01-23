const $startButton = document.querySelector("#start-button");
let machineSequence = [];
let playerSequence = [];
let turnCounter = 0;

$startButton.onclick = function () {
    turnCounter ? updateState("in-game"): startTurn();
};

function startTurn() {
    handleMachineTurn();
    handlePlayerTurn();
}

function unlockPlayerInput() {
    document.querySelectorAll(".box").forEach(function (boxElement) {
        boxElement.onclick = handlePlayerInput;
    });
}

function blockPlayerInput() {
    document.querySelectorAll(".box").forEach(function (boxElement) {
        boxElement.onclick = function () {};
    });
}

function handlePlayerTurn() {
    setTimeout(function () {
        updateState("player");
        unlockPlayerInput();
    }, (machineSequence.length + 1.5) * 1000);
}

function handlePlayerInput(event) {
    let $box = event.target;
    playerSequence.push($box);
    highlightElement($box);
    let turnResults = compareSequence();
    handleResults(turnResults);
}

function handleMachineTurn() {
    turnCounter++;
    updateState("machine");
    blockPlayerInput();
    machineSequence.push(getRandomBox());
    machineSequence.forEach(function (box, index) {
        setTimeout(function () {
            highlightElement(box, 500);
        }, (index + 1) * 1000);
    });
}

function highlightElement(element, time) {
    let elementBgColor = window.getComputedStyle(element).backgroundColor;
    setTimeout(function () {

        element.style.boxShadow = `0px 0px 105px 0px ${elementBgColor}`;
        element.classList.add("box-highlight");
        setTimeout(function () {
            
            element.style.boxShadow = "0px 0px 0px 0px rgb(0,0,0)";
            element.classList.remove("box-highlight");
        }, 500);
    }, time);
}

function getRandomBox() {
    const $boxes = document.querySelectorAll(".box");
    const RANDOM_INDEX = Math.floor(Math.random() * 4);
    return $boxes[RANDOM_INDEX];
}

function compareSequence() {
    return (
        machineSequence[playerSequence.length - 1].id ===
        playerSequence[playerSequence.length - 1].id
    );
}

function handleResults(turnResults) {
    const TURNS_TO_WIN = 5;
    if (!turnResults) {
        updateState("player-lose");
        blockPlayerInput();
        resetStates();
    } else if (
        machineSequence.length === playerSequence.length &&
        machineSequence.length === TURNS_TO_WIN
    ) {
        updateState("player-win");
        blockPlayerInput();
        resetStates();
    } else if (machineSequence.length === playerSequence.length) {
        resetPlayerSequence();
        startTurn();
    }
}

function resetStates() {
    resetTurnCounter();
    resetPlayerSequence();
    resetMachineSequence();
}

function updateState(gameState) {
    const GAME_STATES = {
        machine: "Turno de la maquina",
        player: "Turno del jugador",
        "player-lose": "Perdiste",
        "player-win": "Ganaste",
        "in-game" : "Ya empezó la partida"
    };
    document.querySelector("#state").innerText = GAME_STATES[gameState];
    document.querySelector("#turn").textContent = turnCounter;
    handleSpinner(gameState);
}

function handleSpinner(turnMachine) {
    if (turnMachine === "machine") {
        addSpinnerElement();
    }
}
function createSpinnerElement() {
    let $spinner = document.createElement("div");
    $spinner.className = "spinner-border ms-3";
    $spinner.role = "status";
    return $spinner;
}
function addSpinnerElement() {
    let $states = document.querySelector("#state");
    let $childElement = createSpinnerElement();
    $states.appendChild($childElement);
}

function resetPlayerSequence() {
    playerSequence = [];
}

function resetMachineSequence() {
    machineSequence = [];
}

function resetTurnCounter() {
    turnCounter = 0;
}
