const state = {
    cornMan: {
        element: document.getElementById("corn-man"),
        cellIndex: null,
        rowIndex: null,
        move: function (rowOffset, cellOffset) {
            this.rowIndex += rowOffset
            this.cellIndex += cellOffset
            main.querySelector('[data-cells="' + this.cellIndex + '"][data-rows="' + this.rowIndex + '"]').appendChild(this.element)
        }
    },
    storageElements: null,
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
                cellElement.dataset.type = "wall"
            } else {
                cellElement.dataset.type = "floor"
            }

            if (map[rowIndex][cellIndex] === "S") {
                state.cornMan.cellIndex = Number(cellIndex)
                state.cornMan.rowIndex = Number(rowIndex)
            }

            if (map[rowIndex][cellIndex] === "B") {
                const img = document.createElement("img")
                img.classList.add("seed-packet");
                img.src = "seeds.png";
                cellElement.appendChild(img);
            }

            if (map[rowIndex][cellIndex] === "O") {
                cellElement.classList.add("storage");
            }
        }
    }

    console.log()
    main.querySelector('[data-cells="' + state.cornMan.cellIndex + '"][data-rows="' + state.cornMan.rowIndex + '"]').appendChild(state.cornMan.element)
    state.storageElements = Array.from(document.getElementsByClassName("storage"))
}

const checkMove = event => {
    let rowOffset = 0
    let cellOffset = 0

    const direction = {
        "ArrowDown": () => rowOffset = 1,
        "ArrowUp": () => rowOffset = -1,
        "ArrowLeft": () => cellOffset = -1,
        "ArrowRight": () => cellOffset = 1,

        "test": () => console.log("TESTING!"),
    }

    direction[event.key]()

    const nextRowSelector = "[data-rows='" + (state.cornMan.rowIndex + rowOffset) + "']"
    const nextCellSelector = "[data-cells='" + (state.cornMan.cellIndex + cellOffset) + "']"
    const nextCell = main.querySelector(nextRowSelector + nextCellSelector)

    const followingRowSelector = "[data-rows='" + (state.cornMan.rowIndex + rowOffset + rowOffset) + "']"
    const followingCellSelector = "[data-cells='" + (state.cornMan.cellIndex + cellOffset + cellOffset) + "']"
    const followingCell = main.querySelector(followingRowSelector + followingCellSelector)

    const nextIsNotWall = nextCell.dataset.type !== "wall"
    if (nextIsNotWall) {
        const nextHasSeedPacket = Boolean(nextCell.childElementCount)
        const followingIsNotWall = followingCell.dataset.type !== "wall"
        const followingDoesNotHaveSeedPacket = !Boolean(followingCell.childElementCount)

        if (nextHasSeedPacket && followingIsNotWall && followingDoesNotHaveSeedPacket) {
            state.cornMan.move(rowOffset, cellOffset)

            const thisSeedPacket = nextCell.firstElementChild
            followingCell.appendChild(thisSeedPacket)
        } else if (!nextHasSeedPacket) {
            state.cornMan.rowIndex += rowOffset
            state.cornMan.cellIndex += cellOffset
            main.querySelector('[data-cells="' + state.cornMan.cellIndex + '"][data-rows="' + state.cornMan.rowIndex + '"]').appendChild(state.cornMan.element)
        }
    }

    if (state.storageElements.every(storageElement => Boolean(storageElement.childElementCount) && storageElement.firstElementChild.classList.contains("seed-packet"))) {
        console.log("win")
        setTimeout(resetCourse, 2000)
    }
}

function resetCourse() {
    main.innerHTML = ""
    createCourse()
}


createCourse()
document.addEventListener('keydown', checkMove)
