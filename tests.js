const test = {
    winCondition: function () {
        const seedPackets = Array.from(document.getElementsByClassName("seed-packet"))
        if (seedPackets.length === state.storageElements.length) {
            seedPackets.forEach((seedPacket, index) => {
                state.storageElements[index].appendChild(seedPacket)
            })
            checkMove({
                key: "ArrowRight"
            })
        } else {
            console.log("ERROR:", "Seed packet and storage element mismatch.")
        }
    },

    ifAllButOneSeedPacketIsInAStorageElementAndCornManIsInOne: function () {
        const seedPackets = Array.from(document.getElementsByClassName("seed-packet"))
        if (seedPackets.length === state.storageElements.length) {
            seedPackets.forEach((seedPacket, index) => {
                if (index < seedPackets.length - 1) {
                    state.storageElements[index].appendChild(seedPacket)
                } else {
                    state.storageElements[index].appendChild(state.cornMan.element)
                }
            })
            checkMove({
                key: "test"
            })
        } else {
            console.log("ERROR:", "Seed packet and storage element mismatch.")
        }
    }

}