//TODO
// store tips and their status in localstorage as arrays
// load tips from localstorage and create each tip on page load
// store all item data as img + status classes and store it in a 2d array in local storage
// load item data from local storage and populate the item grid with the correct images + status classes

const gridSizeX = 6;
const gridSizeY = 10;

const totalGridItems = gridSizeX * gridSizeY;

let gridStorage = [];
for (let i = 0; i < gridSizeX * gridSizeY; i++) {
  gridStorage.push(0)
}

const grid = document.querySelector(".grid");
const tipsWrapper = document.querySelector(".tips-wrapper");
const tipInput = document.querySelector("#tip");

const strengths = ["off", "strength1", "strength2", "strength3"];
const ocarinas = ["off", "ocarina1", "ocarina2"];
const masks = ["off",
  "zeldas_letter",
  "keaton_mask",
  "skull_mask",
  "spooky_mask",
  "bunny_hood",
  "mask_of_truth",
];
const adultTrade = [
  "off",
  "egg",
  "chicken",
  "cojiro",
  "mushroom",
  "medicine",
  "poachers_saw",
  "broken_sword",
  "prescription",
  "eyeball_frog",
  "eyedrops",
  "biggoron_sword",
];
const scales = ["off", "scale1", "scale2"];
const wallets = ["off", "wallet1", "wallet2"];
const hookshots = ["off", "hookshot", "longshot"];

const dungeons = [
  "DEKU",
  "DDCV",
  "JABU",
  "FRST",
  "FIRE",
  "WATR",
  "SPRT",
  "SHDW",
  "FREE",
];

const gridItemArray = [
  [
    "deku_stick",
    "slingshot",
    "boomerang",
    "deku_nut",
    ocarinas,
    "lens_of_truth",
  ],
  ["bombs",
    "bombchus",
    "magic_beans",
    "bow",
    hookshots,
    "megaton_hammer"],
  [
    "fire_arrows",
    "ice_arrows",
    "light_arrows",
    "kokiri_sword",
    "master_sword",
    adultTrade,
  ],
  [
    "dins_fire",
    "farores_wind",
    "nayrus_love",
    "deku_shield",
    "hylian_shield",
    "mirror_shield",
  ],
  [
    "rutos_letter",
    masks,
    "skulltula",
    "kokiri_tunic",
    "goron_tunic",
    "zora_tunic",
  ],
  [
    scales,
    wallets,
    strengths,
    "boots",
    "iron_boots",
    "hover_boots"],
  [
    "zeldas_lullaby",
    "sarias_song",
    "eponas_song",
    "suns_song",
    "song_of_time",
    "song_of_storms",
  ],
  [
    "minuet_of_forest",
    "bolero_of_fire",
    "serenade_of_water",
    "requiem_of_spirit",
    "nocturne_of_shadow",
    "prelude_of_light",
  ],
  [
    "light_medallion",
    "forest_medallion",
    "fire_medallion",
    "water_medallion",
    "spirit_medallion",
    "shadow_medallion",
  ],
  [
    dungeons,
    dungeons,
    dungeons,
    dungeons,
    dungeons,
    dungeons
  ],
];

// Loop though all the grid items

generateDefaultGrid();

function advanceSkull(event) {
  const xGrid = parseInt(this.dataset.xGrid);
  const yGrid = parseInt(this.dataset.yGrid);
  let value = parseInt(this.dataset.currentIndex);

  const p = this.querySelector("p");
  value++;
  if (value > 100) value = 0;
  p.textContent = value;
  this.dataset.currentIndex = value
  gridStorage[yGrid * gridSizeX + xGrid] = value;
}

function advanceRegularItem(event) {
  const xGrid = parseInt(this.dataset.xGrid);
  const yGrid = parseInt(this.dataset.yGrid);

  this.classList.toggle("grey");
  gridStorage[yGrid * gridSizeX + xGrid]++;
  gridStorage[yGrid * gridSizeX + xGrid] %= 2;
}

function advanceArray(event) {
  const xGrid = parseInt(this.dataset.xGrid);
  const yGrid = parseInt(this.dataset.yGrid);
  let currentIndex = parseInt(this.dataset.currentIndex);

  const tempGridItem = gridItemArray[yGrid][xGrid];
  currentIndex++;
  currentIndex %= tempGridItem.length;
  this.dataset.currentIndex = currentIndex;
  if (!this.style.backgroundImage) {
    const p = this.querySelector("p");
    p.textContent = tempGridItem[currentIndex];
    return;
  }
  if (currentIndex == 0) {
    this.style.backgroundImage = `url(src/${tempGridItem[1]}.png)`;
    this.classList.add("grey");
    return;
  }
  this.style.backgroundImage = `url(src/${tempGridItem[currentIndex]}.png)`;
  this.classList.remove("grey");
}

function recedeSkull(event) {
  event.preventDefault();
  const xGrid = parseInt(this.dataset.xGrid);
  const yGrid = parseInt(this.dataset.yGrid);
  let value = parseInt(this.dataset.currentIndex);

  const p = this.querySelector("p");
  value--;
  if (value < 0) value = 100;
  p.textContent = value;
  this.dataset.currentIndex = value
  gridStorage[yGrid * gridSizeX + xGrid] = value;
}

function recedeRegularItem(event){
  event.preventDefault();
  const xGrid = parseInt(this.dataset.xGrid);
  const yGrid = parseInt(this.dataset.yGrid);

  this.classList.toggle("grey");
  gridStorage[yGrid * gridSizeX + xGrid]++;
  gridStorage[yGrid * gridSizeX + xGrid] %= 2;

}

function recedeArray(event){
  event.preventDefault();

  const xGrid = parseInt(this.dataset.xGrid);
  const yGrid = parseInt(this.dataset.yGrid);
  let currentIndex = parseInt(this.dataset.currentIndex);

  const tempGridItem = gridItemArray[yGrid][xGrid];
  currentIndex--;
  if (currentIndex==-1) currentIndex = tempGridItem.length-1
  this.dataset.currentIndex = currentIndex;
  if (!this.style.backgroundImage) {
    const p = this.querySelector("p");
    p.textContent = tempGridItem[currentIndex];
    return;
  }
  if (currentIndex == 0) {
    this.style.backgroundImage = `url(src/${tempGridItem[1]}.png)`;
    this.classList.add("grey");
    return;
  }
  this.style.backgroundImage = `url(src/${tempGridItem[currentIndex]}.png)`;
  this.classList.remove("grey");
}

function generateDefaultGrid() {

  //first items
  for (let i = 0; i < totalGridItems - gridSizeX; i++) {
    const xGrid = i % 6;
    const yGrid = (i / 6) >> 0;
    const index = gridStorage[i];

    const gridItem = document.createElement("div");
    gridItem.dataset.xGrid = xGrid;
    gridItem.dataset.yGrid = yGrid;
    gridItem.dataset.currentIndex = index;

    grid.appendChild(gridItem);

    const tempGridItem = gridItemArray[yGrid][xGrid];

    if (gridStorage[i] == 0) {
      gridItem.classList.add("grey");
    }

    if (gridItemArray[yGrid][xGrid] == "skulltula") {
      const skullCount = document.createElement("p");
      let skulltulaCounter = gridStorage[i];

      skullCount.classList.add("skull-count");
      skullCount.textContent = skulltulaCounter;
      gridItem.appendChild(skullCount);
      gridItem.classList.remove("grey");
      gridItem.addEventListener("click", advanceSkull);
      gridItem.addEventListener("contextmenu", recedeSkull);
      gridItem.style.backgroundImage = `url(src/${tempGridItem}.png)`;
      continue;

    }
    if (gridItemArray[yGrid][xGrid] instanceof Array) {
      gridItem.addEventListener("click", advanceArray)
      gridItem.addEventListener("contextmenu", recedeArray)
      if (gridStorage[i] == 0) {
        gridItem.style.backgroundImage = `url(src/${tempGridItem[1]}.png)`;
        continue;
      }
      const index = gridStorage[i];
      gridItem.style.backgroundImage = `url(src/${tempGridItem[index]}.png)`;
      continue;
    }
    gridItem.style.backgroundImage = `url(src/${tempGridItem}.png)`;
    gridItem.addEventListener("click", advanceRegularItem)
    gridItem.addEventListener("contextmenu", recedeRegularItem)

  }

  //dungeons
  for (let i = totalGridItems - gridSizeX; i < totalGridItems; i++) {
    const xGrid = i % 6;
    const yGrid = (i / 6) >> 0;
    const tempGridItem = gridItemArray[yGrid][xGrid];

    const gridItem = document.createElement("div");
    grid.appendChild(gridItem);
    const dungeonNameContainer = document.createElement("p");

    const index = gridStorage[i];
    dungeonNameContainer.textContent = tempGridItem[index];
    gridItem.appendChild(dungeonNameContainer);

    gridItem.dataset.xGrid = xGrid;
    gridItem.dataset.yGrid = yGrid;
    gridItem.dataset.currentIndex = index;

    gridItem.addEventListener("click", advanceArray)
    gridItem.addEventListener("contextmenu", recedeArray)
  }

 

function addNewTip(tipTextContent, anchor = tipsWrapper) {
  const div = document.createElement("div");
  anchor.appendChild(div);

  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const deleteButton = document.createElement("button");

  checkbox.type = "checkbox";
  checkbox.classList.add("location-tracker-checkbox");

  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "✖";

  // storeTip(tipTextContent, false);

  checkbox.addEventListener("change", (e) => {
    //dim tip
    if (e.target.checked == true) {
      label.classList.add("completed");
      // modifyTipStatus(tipTextContent, true);

      return;
    }
    label.classList.remove("completed");
    // modifyTipStatus(tip, false);
  });
  checkbox.addEventListener(
    "contextmenu",
    (removeTip = (e) => {
      e.preventDefault();
      unstoreTip(tipTextContent);
      e.target.parentNode.remove();
    })
  );

  deleteButton.addEventListener("click", removeTip);

  if (
    tipTextContent.toLowerCase().includes("woth") ||
    tipTextContent.toLowerCase().includes("hero")
  ) {
    label.style.color = "#40cf47";
  }
  if (tipTextContent.toLowerCase().includes("fool")) {
    label.style.color = "#f07069";
  }
  label.textContent = tipTextContent;

  div.appendChild(label);
  div.appendChild(checkbox);
  div.appendChild(deleteButton);
}

tipInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (!this.value == "") {
      addNewTip(e.target.value);
    }
    this.value = "";
  }
});
