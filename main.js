const $startButton = document.querySelector("#start-button");
const MACHINE_SEQUENCE = [];
const PLAYER_SEQUENCE = [];
let counter = 0;
$startButton.onclick = function () {
    // updateState();
    blockInputBox();
    turnMachineSequence();
    playerTurn();
    compareSequence();
};

function unlockInputBox() {
    document.querySelectorAll(".box").forEach(function (element) {
        element.onclick = function (e) {
            PLAYER_SEQUENCE.push(e.target);
            console.log(PLAYER_SEQUENCE);
            highlightElement(e.target, 0);
        };
    });
}

function blockInputBox() {
    document.querySelectorAll(".box").forEach(function (element) {
        element.onclick = function () {};
    });
}

function turnMachineSequence() {
    counter++;
    MACHINE_SEQUENCE.push(getRandomBox());
    console.log("turno maquina");
    MACHINE_SEQUENCE.forEach(function (box, index) {
        setTimeout(function () {
            console.log(box);
            highlightElement(box, 500);
        }, (index + 1) * 1000);
    });
}

function highlightElement(element, time) {
    let bgColor = window.getComputedStyle(element).backgroundColor;
    setTimeout(function () {
        element.style.opacity = "1";
        element.style.scale = "1.02";
        element.style.zIndex = "5";
        element.style.boxShadow = `0px 0px 105px 0px ${bgColor}`;
        setTimeout(function () {
            element.style.opacity = "0.8";
            element.style.scale = "1";
            element.style.zIndex = "0";
            element.style.boxShadow = "0px 0px 0px 0px rgb(0,0,0)";
        }, 500);
    }, time);
}

function getRandomBox() {
    const $boxes = document.querySelectorAll(".box");
    const RANDOM_INDEX = Math.floor(Math.random() * 4);
    return $boxes[RANDOM_INDEX];
}

function updateState(turn = "turno maquina") {
    document.querySelector("#state").textContent += `${turn}`;
}

function playerTurn() {
    setTimeout(function () {
        console.log("turno jugador");
        unlockInputBox();
    }, (MACHINE_SEQUENCE.length + 1.5) * 1000);
}

function compareSequence() {
    return (
        MACHINE_SEQUENCE[MACHINE_SEQUENCE.length - 1] ===
        PLAYER_SEQUENCE[PLAYER_SEQUENCE.length - 1]
    );
}

function playerLose() {
    compareSequence() ? turnMachineSequence() : blockInputBox();
}
