

const gridSizeX = 6
const gridSizeY = 10

const totalGridItems = gridSizeX * gridSizeY

const grid = document.querySelector(".grid")

const gridImageArray =
    [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ]

const strengthList = ["strength1", "strength2", "strength3"]
const ocarinaList = ["ocarina1", "ocarina2"]

// function clickHandler() {

// }

// for (let i = 0; i < array.length; i++) {

//     if (self.classList.contains("grey")) {
//         self.classList.remove('grey')
//         return
//     }
//     self.style.backgroundImage = `url(/src/${array[(i + 1) % array.length]}.png`;
//     if (i + 1 > array.length - 1) {
//         self.classList.add('grey')
//     }
//     return

// }

for (let i = 0; i < totalGridItems; i++) {

    let xPosition = i % 6
    let yPosition = i / 6 >> 0

    let gridItem = document.createElement("div")
    gridItem.dataset.x = xPosition
    gridItem.dataset.y = yPosition

    gridItem.classList.add('grey')
    gridItem.style.backgroundImage = `url(/src/${gridImageArray[yPosition][xPosition]}.png)`

    gridItem.addEventListener('click', function () {
        this.classList.toggle('grey')
    })

    grid.appendChild(gridItem)
}