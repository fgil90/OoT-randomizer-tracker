const gridSizeX = 6;
const gridSizeY = 10;

const totalGridItems = gridSizeX * gridSizeY;

const grid = document.querySelector(".grid");
const tipsWrapper = document.querySelector(".tips-wrapper");
const tipInput = document.querySelector("#tip");

let gridStorage = [];
let tipsStorage = {};

initializeGridStorage();
loadStoredTips();

function loadStoredTips() {
  if (!localStorage["tipsStorage"]) localStorage.setItem("tipsStorage", JSON.stringify(tipsStorage));
  const tips = JSON.parse(localStorage["tipsStorage"]);
  Object.keys(tips).forEach(tip => {
    addNewTip(tip, tips[tip]);
  })
}

function initializeGridStorage() {
  if (!localStorage.getItem("gridStorage")) {
    resetGridStorage();
    return;
  }
  gridStorage = localStorage.getItem("gridStorage").split(",");
  gridStorage = gridStorage.map((value) => parseInt(value));
}

function updateStorage(object) {
  const yGrid = parseInt(object.dataset.yGrid);
  const xGrid = parseInt(object.dataset.xGrid);
  const index = yGrid * gridSizeX + xGrid;
  gridStorage[index] = parseInt(object.dataset.currentIndex);
  localStorage.setItem("gridStorage", gridStorage.toString());
}

function resetGridStorage() {
  gridStorage = []
  for (let i = 0; i < gridSizeX * gridSizeY; i++) {
    gridStorage.push(0)
  }
  localStorage['gridStorage'] = gridStorage;
  location.reload();
}

function resetTipsStorage(){ 
  tipsStorage = {};
  localStorage['tipsStorage'] = JSON.stringify(tipsStorage);
  location.reload();
}

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

generateDefaultGrid();

function advanceSkull(event) {
  let value = parseInt(this.dataset.currentIndex);

  const p = this.querySelector("p");
  value++;
  if (value > 100) value = 0;
  p.textContent = value;
  this.dataset.currentIndex = value
  updateStorage(this);
}

function advanceRegularItem(event) {
  let currentIndex = parseInt(this.dataset.currentIndex);
  currentIndex++;
  currentIndex %= 2;
  this.dataset.currentIndex = currentIndex;

  this.classList.toggle("grey");
  updateStorage(this);
}

function advanceArray(event) {
  const xGrid = parseInt(this.dataset.xGrid);
  const yGrid = parseInt(this.dataset.yGrid);
  let currentIndex = parseInt(this.dataset.currentIndex);

  const tempGridItem = gridItemArray[yGrid][xGrid];
  currentIndex++;
  currentIndex %= tempGridItem.length;
  this.dataset.currentIndex = currentIndex;
  updateStorage(this);
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
  let value = parseInt(this.dataset.currentIndex);

  const p = this.querySelector("p");
  value--;
  if (value < 0) value = 100;
  p.textContent = value;
  this.dataset.currentIndex = value;
  updateStorage(this);

}

function recedeRegularItem(event) {
  event.preventDefault();
  let currentIndex = parseInt(this.dataset.currentIndex);
  currentIndex--;
  if (currentIndex < 0) currentIndex = 1
  this.dataset.currentIndex = currentIndex;

  this.classList.toggle("grey");
  updateStorage(this);
}

function recedeArray(event) {
  event.preventDefault();

  const xGrid = parseInt(this.dataset.xGrid);
  const yGrid = parseInt(this.dataset.yGrid);
  let currentIndex = parseInt(this.dataset.currentIndex);

  const tempGridItem = gridItemArray[yGrid][xGrid];
  currentIndex--;
  if (currentIndex == -1) currentIndex = tempGridItem.length - 1
  this.dataset.currentIndex = currentIndex;
  updateStorage(this);

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

}

function storeTip(content, checked) {
  tipsStorage[content] = checked
  localStorage.setItem("tipsStorage", JSON.stringify(tipsStorage))
}

function unstoreTip(content) {
  delete tipsStorage[content];
  localStorage.setItem("tipsStorage", JSON.stringify(tipsStorage))
}

function addNewTip(tipTextContent, checked = false, anchor = tipsWrapper) {
  const div = document.createElement("div");
  div.dataset.content = tipTextContent;
  div.dataset.checked = checked;
  storeTip(tipTextContent, checked);
  anchor.appendChild(div);

  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const deleteButton = document.createElement("button");

  checkbox.type = "checkbox";
  checkbox.classList.add("location-tracker-checkbox");

  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "✖";

  if (checked) {
    label.classList.add("completed");
    checkbox.checked = true;
    div.dataset.checked = true;
  }

  checkbox.addEventListener("change", completeTip = (e) => {
    //dim tip
    if (e.target.checked) {
      label.classList.add("completed");
      div.dataset.checked = true;
    } else {
      label.classList.remove("completed");
      div.dataset.checked = false;
    }
    storeTip(tipTextContent, div.dataset.checked == "true" ? true : false);
  });

  checkbox.addEventListener(
    "contextmenu",
    (removeTip = (e) => {
      e.preventDefault();
      e.target.parentNode.remove();
      unstoreTip(e.target.parentNode.dataset.content)
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
