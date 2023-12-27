const $startButton = document.querySelector("#start-button");
const SEQUENCE = [];
$startButton.onclick = function () {
    // updateState();
    blockInputBox();
    startMachineSequence();
    // unlockInputBox();
};

function unlockInputBox() {
    document.querySelectorAll(".box").forEach(function (element) {
        element.onclick = function (e) {
            console.log(e.target);
            highlightElement(e.target);
        };
    });
}

function blockInputBox() {
    document.querySelectorAll(".box").forEach((onclick = function () {}));
}

function startMachineSequence() {
    SEQUENCE.push(getRandomBox());

    SEQUENCE.forEach(function (box, index) {
        setTimeout(function () {
            console.log(box);
            highlightElement(box);
            box.style.opacity = "1";
        }, (index + 1) * 1000);
    });

    // setTimeout(
    //     SEQUENCE.forEach(function (box) {
    //         box.style.opacity = "1";
    //         highlightElement(box);
    //     }),
    //     time
    // );
}

function highlightElement(element) {
    // element.style.opacity = "1";
    setTimeout(function () {
        element.style.opacity = "0.5";
    }, 500);
}

function getRandomBox() {
    const $boxes = document.querySelectorAll(".box");
    const RANDOM_INDEX = Math.floor(Math.random() * 4);
    return $boxes[RANDOM_INDEX];
}

function updateState(turn = "turno maquina") {
    document.querySelector("#state").textContent += `${turn}`;
}
