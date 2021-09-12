

const gridSizeX = 6
const gridSizeY = 10

const totalGridItems = gridSizeX * gridSizeY

const grid = document.querySelector(".grid")
const wothWrapper = document.querySelector(".wrapper-woth")
const foolWrapper = document.querySelector(".wrapper-fool")
const wothInput = document.querySelector("#woth")
const foolInput = document.querySelector("#fool")

const strengths = ["strength1", "strength2", "strength3"]
const ocarinas = ["ocarina1", "ocarina2"]
const masks = ["zeldas_letter", "keaton_mask", "skull_mask", "spooky_mask", "bunny_hood", "mask_of_truth"]
const scales = ["scale1", "scale2"]
const wallets = ["wallet1", "wallet2"]
const hookshots = ["hookshot", "longshot"]

const gridImageArray =
    [
        ["deku_stick", "slingshot", "boomerang", "deku_nut", ocarinas, "lens_of_truth"],
        ["bombs", "bombchus", "magic_beans", "bow", hookshots, "megaton_hammer"],
        ["fire_arrows", "ice_arrows", "light_arrows", "kokiri_sword", "master_sword", "biggoron_sword"],
        ["dins_fire", "farores_wind", "nayrus_love", "deku_shield", "hylian_shield", "mirror_shield"],
        ["rutos_letter", masks, "skulltula", "kokiri_tunic", "goron_tunic", "zora_tunic"],
        [scales, wallets, strengths, "boots", "iron_boots", "hover_boots"],
        ["zeldas_lullaby", "sarias_song", "eponas_song", "suns_song", "song_of_time", "song_of_storms"],
        ["minuet_of_forest", "bolero_of_fire", "serenade_of_water", "requiem_of_spirit", "nocturne_of_shadow", "prelude_of_light"],
        ["light_medallion", "forest_medallion", "fire_medallion", "water_medallion", "spirit_medallion", "shadow_medallion"],
        [0, 0, 0, 0, 0, 0, 0]
    ]

// Loop though all the grid items

for (let i = 0; i < totalGridItems; i++) {

    const xGrid = i % 6
    const yGrid = i / 6 >> 0

    const gridItem = document.createElement("div")
    // gridItem.dataset.x = xPosition
    // gridItem.dataset.y = yPosition

    if (!(gridImageArray[yGrid][xGrid] == "skulltula" ||
        gridImageArray[yGrid][xGrid] == "kokiri_tunic" ||
        gridImageArray[yGrid][xGrid] == "boots")) {
        gridItem.classList.add('grey')
    }

    //Is the grid item an upgradeable? If yes ...

    if (gridImageArray[yGrid][xGrid] instanceof Array) {

        const tempArray = gridImageArray[yGrid][xGrid]

        gridItem.style.backgroundImage = `url(src/${tempArray[0]}.png)`

        gridItem.addEventListener('click', function () {
            if (this.classList.contains('grey')) {
                this.classList.remove('grey')
                return
            }
            for (let i = 0; i < tempArray.length; i++) {
                if (this.style.backgroundImage.includes(tempArray[i])) {
                    this.style.backgroundImage = `url(src/${tempArray[(i + 1) % tempArray.length]}.png`;
                    if (i + 1 > tempArray.length - 1) {
                        this.classList.add('grey')
                    }
                    return
                }
            }
        })

        gridItem.addEventListener("contextmenu", (e) => {
            e.preventDefault()

            for (let i = 0; i < tempArray.length; i++) {
                if (e.target.style.backgroundImage.includes(tempArray[i])) {
                    if (i - 1 <= -1 && !e.target.classList.contains('grey')) {
                        e.target.classList.add('grey')
                        return
                    }

                    e.target.classList.remove('grey')
                    e.target.style.backgroundImage = `url(src/${tempArray[(i + tempArray.length - 1) % tempArray.length]}.png`;
                    return
                }
            }
        })

        grid.appendChild(gridItem)
        continue
    }

    gridItem.style.backgroundImage = `url(src/${gridImageArray[yGrid][xGrid]}.png)`

    if (gridImageArray[yGrid][xGrid] == "skulltula") {
        const skullCount = document.createElement("p")
        let skulltulaCounter = 0

        skullCount.classList.add("skull-count")
        skullCount.textContent = skulltulaCounter
        gridItem.appendChild(skullCount)
        gridItem.addEventListener('click', function () {
            skulltulaCounter += 1
            if (skulltulaCounter >= 100) {
                skulltulaCounter = 100
            }
            skullCount.textContent = skulltulaCounter;
        })
        gridItem.addEventListener('contextmenu', function (e) {
            e.preventDefault()
            skulltulaCounter -= 1
            if (skulltulaCounter <= 0) {
                skulltulaCounter = 0
            }
            skullCount.textContent = skulltulaCounter;
        })
        grid.appendChild(gridItem)
        continue
    }

    gridItem.addEventListener('click', function () {
        this.classList.toggle('grey')
    })
    gridItem.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        e.target.classList.add('grey')
    })

    grid.appendChild(gridItem)
}

//Finish looping though all grid items
//All grid items are initialized

function createTrackedLocation(trackedLocation, anchor) {
    const div = document.createElement('div')
    anchor.appendChild(div)

    const label = document.createElement("label")
    const checkbox = document.createElement("input")

    checkbox.type = "checkbox"
    checkbox.classList.add("tracked-location")

    label.textContent = trackedLocation

    div.appendChild(label)
    div.appendChild(checkbox)
}

wothInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        createTrackedLocation(this.value, wothWrapper)
        this.value = ""
    }
})
foolInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        createTrackedLocation(this.value, foolWrapper)
        this.value = ""
    }
})