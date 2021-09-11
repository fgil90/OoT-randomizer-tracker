

const gridSizeX = 6
const gridSizeY = 10

const totalGridItems = gridSizeX * gridSizeY

const grid = document.querySelector(".grid")
const wothWrapper = document.querySelector(".wrapper-woth")
const foolWrapper = document.querySelector(".wrapper-fool")
const woth = document.querySelector("#woth")
const fool = document.querySelector("#fool")

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
        ["fire_arrows", "ice_arrows", "light_arrows", "dins_fire", "farores_wind", "nayrus_love"],
        ["kokiri_sword", "master_sword", "biggoron_sword", "deku_shield", "hylian_shield", "mirror_shield"],
        ["rutos_letter", masks, "skulltula", "kokiri_tunic", "goron_tunic", "zora_tunic"],
        [scales, wallets, strengths, "boots", "iron_boots", "hover_boots"],
        [0, 0, 0, 0, 0, 0],
        ["minuet_of_forest", "bolero_of_fire", "serenade_of_water", "requiem_of_spirit", "nocturne_of_shadow", "prelude_of_light"],
        ["light_medallion", "forest_medallion", "fire_medallion", "water_medallion", "spirit_medallion", "shadow_medallion"],
        [0, 0, 0, 0, 0, 0, 0]
    ]

for (let i = 0; i < totalGridItems; i++) {

    let xPosition = i % 6
    let yPosition = i / 6 >> 0

    let gridItem = document.createElement("div")
    // gridItem.dataset.x = xPosition
    // gridItem.dataset.y = yPosition

    if (!(gridImageArray[yPosition][xPosition] == "skulltula" ||
        gridImageArray[yPosition][xPosition] == "kokiri_tunic" ||
        gridImageArray[yPosition][xPosition] == "boots")) {
        gridItem.classList.add('grey')
    }

    if (gridImageArray[yPosition][xPosition] instanceof Array) {

        let tempArray = gridImageArray[yPosition][xPosition]

        gridItem.style.backgroundImage = `url(src/${tempArray[0]}.png)`

        gridItem.addEventListener('click', function () {
            if (this.classList.contains("grey")) {
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

    gridItem.style.backgroundImage = `url(src/${gridImageArray[yPosition][xPosition]}.png)`

    if (gridImageArray[yPosition][xPosition] == "skulltula") {
        const skullCount = document.createElement("p")
        skullCount.classList.add("skull-count")
        skullCount.textContent = 0
        gridItem.appendChild(skullCount)
        gridItem.addEventListener('click', function () {
            if (parseInt(skullCount.textContent) >= 100) {
                skullCount.textContent = 100
                return
            }
            skullCount.textContent = parseInt(skullCount.textContent) + 1;
        })
        gridItem.addEventListener('contextmenu', function (e) {
            e.preventDefault()
            if (parseInt(skullCount.textContent) <= 0) {
                skullCount.textContent = 0
                return
            }
            skullCount.textContent = parseInt(skullCount.textContent) - 1;
        })
        grid.appendChild(gridItem)
        continue
    }

    gridItem.addEventListener('click', function () {
        this.classList.toggle('grey')
    })
    gridItem.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        e.target.classList.toggle('grey')
    })


    grid.appendChild(gridItem)
}