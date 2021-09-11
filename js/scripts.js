

const gridSizeX = 6
const gridSizeY = 9

const totalGridItems = gridSizeX * gridSizeY

const grid = document.querySelector(".grid")


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
        ["rutos_letter", masks, 0, "kokiri_tunic", "goron_tunic", "zora_tunic"],
        [scales, wallets, strengths, "boots", "iron_boots", "hover_boots"],
        [0, 0, 0, 0, 0, 0],
        ["minuet_of_forest", "bolero_of_fire", "serenade_of_water", "requiem_of_spirit", "nocturne_of_shadow", "prelude_of_light"],
        ["light_medallion", "forest_medallion", "fire_medallion", "water_medallion", "spirit_medallion", "shadow_medallion"]
        [0, 0, 0, 0, 0, 0, 0]
    ]

for (let i = 0; i < totalGridItems; i++) {

    let xPosition = i % 6
    let yPosition = i / 6 >> 0

    let gridItem = document.createElement("div")
    gridItem.dataset.x = xPosition
    gridItem.dataset.y = yPosition

    gridItem.classList.add('grey')

    if (gridImageArray[yPosition][xPosition] instanceof Array) {

        let tempArray = gridImageArray[yPosition][xPosition]

        gridItem.style.backgroundImage = `url(/src/${tempArray[0]}.png)`
        gridItem.addEventListener('click', function () {
            if (this.classList.contains("grey")) {
                this.classList.remove('grey')
                return
            }
            for (let i = 0; i < tempArray.length; i++) {
                if (this.style.backgroundImage.includes(tempArray[i])) {
                    this.style.backgroundImage = `url(/src/${tempArray[(i + 1) % tempArray.length]}.png`;
                    if (i + 1 > tempArray.length - 1) {
                        this.classList.add('grey')
                    }
                    return
                }
            }
        })
        grid.appendChild(gridItem)
        continue
    }
    gridItem.style.backgroundImage = `url(/src/${gridImageArray[yPosition][xPosition]}.png)`
    gridItem.addEventListener('click', function () {
        this.classList.toggle('grey')
    })

    grid.appendChild(gridItem)
}