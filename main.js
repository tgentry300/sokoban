const cornManState = {
    charCell: 2,
    charRow: 2,
}
const seedPacketState1 = {
    charCell: 3,
    charRow: 2,
}
const seedPacketState2 = {
    charCell: 2,
    charRow: 2,
}
const seedPacketState3 = {
    charCell: 2,
    charRow: 2,
}
const seedPacketState4 = {
    charCell: 2,
    charRow: 2,
}
const seedPacketState5 = {
    charCell: 2,
    charRow: 2,
}
const seedPacketState6 = {
    charCell: 2,
    charRow: 2,
}

const map = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
];

const main = document.querySelector("main")

cornMan = document.getElementById("cornMan")
seedPacket = document.getElementById("seedPacket")

// Create the course
const createCourse = () => {
    for (let rowIndex in map) {
        const rowElement = document.createElement("div")
        rowElement.classList.add("row")
        main.appendChild(rowElement)
        for (let cellIndex in map[rowIndex]) {
            const cellElement = document.createElement("div")
            cellElement.classList.add("cell")
            cellElement.dataset.rows = rowIndex
            cellElement.dataset.cells = cellIndex
            rowElement.appendChild(cellElement)
            if (map[rowIndex][cellIndex] === "W") {
                cellElement.classList.add("wall")
            }
            if (map[rowIndex][cellIndex] === "B") {
                cellElement.classList.add("box")
            }
            if (map[rowIndex][cellIndex] === "O") {
                cellElement.classList.add("storage")
            }
        }
    }
    main.querySelector('[data-cells="' + cornManState.charCell + '"][data-rows="' + cornManState.charRow + '"]').appendChild(cornMan)
}
createCourse()

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const cell = map[cornManState.charRow][cornManState.charCell]
    switch (keyName) {
        case "ArrowDown":
            if (map[cornManState.charRow + 1][cornManState.charCell] !== "W") {
                cornManState.charRow += 1
            }
            break;
        case "ArrowUp":
            if (map[cornManState.charRow - 1][cornManState.charCell] !== "W") {
                cornManState.charRow -= 1
            }
            break;
        case "ArrowLeft":
            if (map[cornManState.charRow][cornManState.charCell - 1] !== "W" && cornManState.charCell > 0) {
                cornManState.charCell -= 1
            }
            break;
        case "ArrowRight":
            if (map[cornManState.charRow][cornManState.charCell + 1] !== "W" && cornManState.charCell < 20) {
                cornManState.charCell += 1
            }
            break;
    }
    main.querySelector('[data-cells="' + cornManState.charCell + '"][data-rows="' + cornManState.charRow + '"]').appendChild(cornMan)
})
main.querySelector('[data-cells="' + seedPacketState1.charCell + '"][data-rows="' + seedPacketState1.charRow + '"]').appendChild(seedPacket)