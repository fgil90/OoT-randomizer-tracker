const storage = window.localStorage;
// let storedItems = [
//     [false, false, false, false, 0, false],
//     [false, false, false, false, 0, false],
//     [false, false, false, false, false, 0],
//     [false, false, false, false, false, false],
//     [0, false, false, false, false, false],
//     [0, 0, 0, false, false, 0],
//     [false, false, false, false, false, false],
//     [false, false, false, false, false, false],
//     [false, false, false, false, false, false],
//     [0, 0, 0, 0, 0, 0]
// ]
let storedTips = []

const gridSizeX = 6
const gridSizeY = 10

const totalGridItems = gridSizeX * gridSizeY

const grid = document.querySelector(".grid")
const tipsWrapper = document.querySelector(".tips-wrapper")
const tipInput = document.querySelector("#tip")

const strengths = ["strength1", "strength2", "strength3"]
const ocarinas = ["ocarina1", "ocarina2"]
const masks = ["zeldas_letter", "keaton_mask", "skull_mask", "spooky_mask", "bunny_hood", "mask_of_truth"]
const adultTrade = ["egg", "chicken", "cojiro", "mushroom", "medicine", "poachers_saw", "broken_sword", "prescription", "eyeball_frog", "eyedrops", "biggoron_sword"]
const scales = ["scale1", "scale2"]
const wallets = ["wallet1", "wallet2"]
const hookshots = ["hookshot", "longshot"]

const dungeons = ["DEKU", "DDCV", "JABU", "FRST", "FIRE", "WATR", "SPRT", "SHDW", "FREE"]

const gridImageArray =
    [
        ["deku_stick", "slingshot", "boomerang", "deku_nut", ocarinas, "lens_of_truth"],
        ["bombs", "bombchus", "magic_beans", "bow", hookshots, "megaton_hammer"],
        ["fire_arrows", "ice_arrows", "light_arrows", "kokiri_sword", "master_sword", adultTrade],
        ["dins_fire", "farores_wind", "nayrus_love", "deku_shield", "hylian_shield", "mirror_shield"],
        ["rutos_letter", masks, "skulltula", "kokiri_tunic", "goron_tunic", "zora_tunic"],
        [scales, wallets, strengths, "boots", "iron_boots", "hover_boots"],
        ["zeldas_lullaby", "sarias_song", "eponas_song", "suns_song", "song_of_time", "song_of_storms"],
        ["minuet_of_forest", "bolero_of_fire", "serenade_of_water", "requiem_of_spirit", "nocturne_of_shadow", "prelude_of_light"],
        ["light_medallion", "forest_medallion", "fire_medallion", "water_medallion", "spirit_medallion", "shadow_medallion"],
        [dungeons, dungeons, dungeons, dungeons, dungeons, dungeons]
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


    //Is the grid item an array? If yes ...

    if (gridImageArray[yGrid][xGrid] instanceof Array) {

        const tempArray = gridImageArray[yGrid][xGrid]

        //If it is the dungeons array

        if (tempArray[0] == 'DEKU') {
            const dungeonNameContainer = document.createElement('p')
            dungeonNameContainer.textContent = tempArray[0]
            gridItem.appendChild(dungeonNameContainer)

            gridItem.addEventListener('click', function () {

                //advance the list of dungeons by 1
                let currentIndex = tempArray.indexOf(dungeonNameContainer.textContent)
                dungeonNameContainer.textContent = tempArray[(currentIndex + 1) % tempArray.length]

            })
            gridItem.addEventListener('contextmenu', (e) => {

                //go back the list of dungeons by 1
                e.preventDefault();
                let currentIndex = tempArray.indexOf(dungeonNameContainer.textContent)
                dungeonNameContainer.textContent = tempArray[(currentIndex - 1 + tempArray.length) % tempArray.length]
            })
            grid.appendChild(gridItem)
            continue
        }

        // if it is an upgrade

        gridItem.style.backgroundImage = `url("src/${tempArray[0]}.png")`

        gridItem.addEventListener('click', function () {
            if (this.classList.contains('grey')) {
                this.classList.remove('grey')
                return
            }

            let itemName = this.style.backgroundImage.substring(9)
            itemName = itemName.substring(0, itemName.length - 6)

            const nextIndex = (tempArray.indexOf(itemName) + 1) % tempArray.length
            this.style.backgroundImage = `url("src/${tempArray[nextIndex]}.png")`;

            if (nextIndex == 0) {
                this.classList.add('grey')
            }
        })

        gridItem.addEventListener("contextmenu", (e) => {
            e.preventDefault()

            let itemName = e.target.style.backgroundImage.substring(9)
            itemName = itemName.substring(0, itemName.length - 6)

            const previousIndex = (tempArray.indexOf(itemName) - 1)
            
            if (previousIndex == -1 && !e.target.classList.contains("grey")){
                e.target.classList.add('grey')
                return
            }
            e.target.classList.remove('grey')
            e.target.style.backgroundImage = `url(src/${tempArray[(previousIndex + tempArray.length) % tempArray.length]}.png`;
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

function addNewTip(tipTextContent, anchor = tipsWrapper) {
    const div = document.createElement('div')
    anchor.appendChild(div)

    const label = document.createElement("label")
    const checkbox = document.createElement("input")
    const deleteButton = document.createElement("button")

    checkbox.type = "checkbox"
    checkbox.classList.add("location-tracker-checkbox")

    deleteButton.classList.add('delete-button')
    deleteButton.textContent = "✖"

    checkbox.addEventListener('change', slashLineThroughTip = (e) => {
        if (e.target.checked == true) {
            label.classList.add('completed')
            return
        }
        label.classList.remove('completed')
    })
    checkbox.addEventListener('contextmenu', removeTip = (e) => {
        e.preventDefault()
        e.target.parentNode.remove()
    })

    deleteButton.addEventListener('click', removeTip)

    if (tipTextContent.toLowerCase().includes("woth") ||
        tipTextContent.toLowerCase().includes("hero")) {
        label.style.color = "#40cf47"
    }
    if (tipTextContent.toLowerCase().includes("fool")) {
        label.style.color = "#f07069"
    }
    label.textContent = tipTextContent

    div.appendChild(label)
    div.appendChild(checkbox)
    div.appendChild(deleteButton)
}

tipInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        if (!this.value == '') {
            addNewTip(this.value)
        }
        this.value = ""
    }
})
