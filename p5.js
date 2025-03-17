// Aurora Borealis Simulation
// Click to create new aurora patterns

let particles = [];
let noiseScale = 0.01;
let noiseStrength = 5;
let stars = [];
let mountainPoints = [];
let auroras = [];
let timer = 0;

function setup() {
  createCanvas(800, 600);
  
  // Create stars
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height * 0.7),
      size: random(0.5, 2),
      twinkle: random(0.01, 0.05)
    });
  }
  
  // Create mountain silhouette
  createMountains();
  
  // Create initial aurora
  createAurora();
}

function createMountains() {
  mountainPoints = [];
  mountainPoints.push({x: 0, y: height * 0.7});
  
  // Generate mountain peaks
  let x = 0;
  while (x < width) {
    let peakHeight = random(height * 0.1, height * 0.3);
    let peakWidth = random(50, 150);
    mountainPoints.push({x: x, y: height * 0.7 - peakHeight});
    x += peakWidth;
  }
  
  // Ensure the last point is at the edge of the canvas
  mountainPoints.push({x: width, y: height * 0.7});
  mountainPoints.push({x: width, y: height});
  mountainPoints.push({x: 0, y: height});
}

function createAurora() {
  let baseColor = color(random(100, 200), random(200, 255), random(100, 200));
  let secondColor = color(random(50, 150), random(100, 200), random(150, 255));
  
  auroras.push({
    baseY: random(height * 0.3, height * 0.5),
    waveDensity: random(0.005, 0.02),
    waveAmplitude: random(20, 50),
    waveSpeed: random(0.01, 0.03),
    particleCount: floor(random(50, 150)),
    baseColor: baseColor,
    secondColor: secondColor,
    lifetime: random(300, 600),
    particles: []
  });
  
  // Create particles for this aurora
  let aurora = auroras[auroras.length - 1];
  for (let i = 0; i < aurora.particleCount; i++) {
    aurora.particles.push({
      x: random(width),
      y: aurora.baseY + random(-20, 20),
      size: random(2, 5),
      speed: random(0.2, 1),
      offsetX: random(1000),
      offsetY: random(1000),
      opacity: random(150, 255)
    });
  }
}

function draw() {
  // Night sky background with gradient
  background(10, 15, 30);
  
  // Draw stars
  drawStars();
  
  // Draw auroras
  drawAuroras();
  
  // Draw mountains
  drawMountains();
  
  // Draw reflection
  drawReflection();
  
  // Manage aurora creation/removal
  timer++;
  if (timer > 200) {
    if (random() < 0.01 && auroras.length < 3) {
      createAurora();
    }
    
    // Remove old auroras
    auroras = auroras.filter(aurora => {
      aurora.lifetime--;
      return aurora.lifetime > 0;
    });
    
    if (auroras.length === 0) {
      createAurora();
    }
  }
}

function drawStars() {
  for (let star of stars) {
    let brightness = 150 + 50 * sin(frameCount * star.twinkle);
    fill(brightness);
    noStroke();
    ellipse(star.x, star.y, star.size);
  }
}

function drawAuroras() {
  for (let aurora of auroras) {
    let t = frameCount * aurora.waveSpeed;
    
    // Draw flowing curtains
    for (let particle of aurora.particles) {
      // Move particles
      particle.x += particle.speed;
      if (particle.x > width) particle.x = 0;
      
      // Calculate wave position
      let waveY = sin(particle.x * aurora.waveDensity + t) * aurora.waveAmplitude;
      let y = particle.y + waveY;
      
      // Create vertical line (curtain effect)
      let lineLength = map(noise(particle.x * 0.01, frameCount * 0.01), 0, 1, 10, 80);
      
      // Gradient from base to top
      for (let i = 0; i < lineLength; i++) {
        let inter = map(i, 0, lineLength, 0, 1);
        let c = lerpColor(aurora.baseColor, aurora.secondColor, inter);
        let alpha = map(i, 0, lineLength, particle.opacity, 0);
        stroke(red(c), green(c), blue(c), alpha);
        line(particle.x, y - i, particle.x, y - i - 1);
      }
    }
  }
}

function drawMountains() {
  fill(20, 25, 40);
  noStroke();
  beginShape();
  for (let point of mountainPoints) {
    vertex(point.x, point.y);
  }
  endShape(CLOSE);
}

function drawReflection() {
  // Water area
  fill(10, 20, 30, 100);
  rect(0, height * 0.7, width, height * 0.3);
  
  // Reflection
  push();
  translate(0, height * 0.7);
  scale(1, -0.3);
  translate(0, -height * 0.7);
  
  // Draw reflected auroras with lower opacity
  for (let aurora of auroras) {
    let t = frameCount * aurora.waveSpeed;
    
    // Draw flowing curtains
    for (let particle of aurora.particles) {
      // Calculate wave position
      let waveY = sin(particle.x * aurora.waveDensity + t) * aurora.waveAmplitude;
      let y = particle.y + waveY;
      
      // Create vertical line with lower opacity
      let lineLength = map(noise(particle.x * 0.01, frameCount * 0.01), 0, 1, 10, 80);
      
      // Gradient from base to top
      for (let i = 0; i < lineLength; i++) {
        let inter = map(i, 0, lineLength, 0, 1);
        let c = lerpColor(aurora.baseColor, aurora.secondColor, inter);
        let alpha = map(i, 0, lineLength, particle.opacity * 0.3, 0);
        stroke(red(c), green(c), blue(c), alpha);
        line(particle.x, y - i, particle.x, y - i - 1);
      }
    }
  }
  
  pop();
  
  // Add water movement effect
  for (let i = 0; i < 10; i++) {
    stroke(200, 220, 255, 20);
    let y = height * 0.7 + random(height * 0.3);
    let x1 = random(width);
    let x2 = x1 + random(20, 100);
    line(x1, y, x2, y);
  }
}

function mousePressed() {
  createAurora();
  return false;
}
