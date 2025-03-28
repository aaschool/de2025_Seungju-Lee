let state = "home";
let gui;

let leafBtn, musicBtn, lightBtn, chartBtn, backBtn;

let sliderObjs = [];
let soundMixers = [];
let lightSliders = [];
let animationSliders = [];
let colorPicker;

function setup() {
  createCanvas(400, 700);
  gui = createGui();

  // Menu buttons
  leafBtn = createButton('', 160, 160, 80, 80);
  musicBtn = createButton('', 80, 300, 80, 80);
  lightBtn = createButton('', 240, 300, 80, 80);
  chartBtn = createButton('', 160, 400, 80, 80);

  backBtn = createButton('← Back to Home', 120, 630, 160, 40);
  backBtn.setStyle({
    fillBg: color(220),
    textSize: 14,
    rounding: 10
  });

  [leafBtn, musicBtn, lightBtn, chartBtn].forEach(btn => {
    btn.setStyle({
      fillBg: color(255),
      rounding: 50,
      strokeWeight: 0
    });
  });

  backBtn.visible = false;
}

function draw() {
  background(255);
  drawGui();

  if (state === "home") {
    drawHome();
  } else {
    drawSubPage(state);
  }
}

function drawHome() {
  backBtn.visible = false;

  leafBtn.visible = true;
  musicBtn.visible = true;
  lightBtn.visible = true;
  chartBtn.visible = true;

  textSize(16);
  fill(0);
  text("Garden Soundscape System", 110, 30);
  textSize(12);
  text("System Configurator", 65, 50);

  textAlign(CENTER, CENTER);
  textSize(36);
  noStroke();
  fill(0);
  text("🌿", 200, 200);
  text("🎵", 120, 340);
  text("💡", 280, 340);
  text("📊", 200, 460);

  if (leafBtn.isPressed) state = "plants";
  if (musicBtn.isPressed) state = "sounds";
  if (lightBtn.isPressed) state = "lighting";
  if (chartBtn.isPressed) state = "data";
}

function drawSubPage(page) {
  leafBtn.visible = false;
  musicBtn.visible = false;
  lightBtn.visible = false;
  chartBtn.visible = false;

  backBtn.visible = true;

  if (page === "plants") drawPlantPage();
  else if (page === "sounds") drawSoundPage();
  else if (page === "lighting") drawLightingPage();
  else drawGenericPage(page);

  if (backBtn.isPressed) {
    sliderObjs.forEach(s => s.visible = false);
    soundMixers.forEach(track => {
      track.sliders.forEach(s => s.visible = false);
      track.toggle.visible = false;
    });
    lightSliders.forEach(s => s.visible = false);
    animationSliders.forEach(s => s.visible = false);
    if (colorPicker) colorPicker.hide();

    sliderObjs = [];
    soundMixers = [];
    lightSliders = [];
    animationSliders = [];

    state = "home";
  }
}

function drawPlantPage() {
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(0);
  text("🌿 Plant Proximity Sensor", width / 3.5, 30);

  if (sliderObjs.length === 0) {
    for (let i = 0; i < 4; i++) {
      let s = createSlider(" ", 120, 80 + i * 140, 160, 30, 0, 100);
      s.setStyle({ rounding: 10 });
      sliderObjs.push(s);
    }
  }

  for (let i = 0; i < sliderObjs.length; i++) {
    let slider = sliderObjs[i];
    let x = width / 2;
    let y = slider.y - 30;

    noFill();
    stroke(180);
    strokeWeight(3);
    let range = map(slider.val, 0, 100, 30, 90);
    ellipse(x, y, range, range);

    noStroke();
    fill(0);
    textSize(28);
    text("🌿", x, y);
  }
}

function drawSoundPage() {
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(0);
  text("🎵 Sound Mixer", width / 5.5, 30);

  drawProximityMap();

  if (soundMixers.length === 0) {
    for (let i = 0; i < 4; i++) {
      let mixer = { sliders: [], toggle: null };
      for (let j = 0; j < 5; j++) {
        let s = createSlider("", 40 + j * 35, 170 + i * 100, 25, 70, 0, 100);
        mixer.sliders.push(s);
      }
      mixer.toggle = createToggle("", 230, 190 + i * 100, 40, 20);
      mixer.toggle.val = true;
      soundMixers.push(mixer);
    }
  }

  for (let i = 0; i < soundMixers.length; i++) {
    fill(0);
    textSize(12);
    text("Track " + (i + 1), 60, 155 + i * 100);
  }
}

function drawLightingPage() {
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(0);
  text("💡 Light Mixer", width / 6, 30);

  drawProximityMap();

  // Real HTML color picker
  if (!colorPicker) {
    colorPicker = createColorPicker('#ffcc00');
    colorPicker.position(120, 160);
  }
  colorPicker.show();

  // Show selected color preview
  fill(colorPicker.color());
  noStroke();
  rect(300, 160, 40, 40, 8);

  if (lightSliders.length === 0) {
    let brightnessSlider = createSlider("Brightness", 300, 220, 20, 140, 0, 100);
    lightSliders.push(brightnessSlider);

    for (let i = 0; i < 3; i++) {
      let s = createSlider("", 230, 400 + i * 25, 120, 20, 0, 100);
      animationSliders.push(s);
    }
  }

  // Simple animation grid placeholder
  fill(230);
  rect(40, 400, 80, 60, 6);
  fill(0);
  textSize(10);
  text("Comp 1", 40, 390);
  text("Comp 2", 100, 390);
  ellipse(60, 420, 10, 10);
}

function drawProximityMap() {
  push();
  translate(width / 2, 90);
  noFill();
  stroke(180);
  strokeWeight(1);
  ellipse(0, 0, 100, 100);
  ellipse(0, 0, 70, 70);
  ellipse(0, 0, 40, 40);

  fill(0);
  noStroke();
  textSize(12);
  text("Proximity", 0, 0);
  text("Zone 1", 55, -45);
  text("Zone 2", 60, -15);
  text("Zone 3", 60, 20);
  pop();
}

function drawGenericPage(page) {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  text(getPageTitle(page), width / 2, 100);
  textSize(14);
  text("This is the " + page + " page.", width / 2, 140);
}

function getPageTitle(page) {
  if (page === "plants") return "🌿 Plants Configuration";
  if (page === "sounds") return "🎵 Sounds Configuration";
  if (page === "lighting") return "💡 Lighting Configuration";
  if (page === "data") return "📊 Data Dashboard";
}