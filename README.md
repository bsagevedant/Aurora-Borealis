# Aurora Borealis Simulation

A mesmerizing p5.js visualization that simulates the Northern Lights (Aurora Borealis) with dynamic flowing curtains of light, color shifts, star field background, and reflections on a landscape.

![Aurora Borealis Simulation](https://placeholder-image.com/aurora-borealis-simulation.png)

## Features

- **Dynamic Aurora Curtains**: Flowing, wave-like curtains of light that move across the sky
- **Color Variations**: Each aurora has unique color gradients and patterns
- **Interactive Elements**: Click anywhere to generate new aurora patterns
- **Star Field Background**: Twinkling stars of various sizes create a realistic night sky
- **Mountain Silhouette**: A dark landscape silhouette adds depth to the scene
- **Water Reflection**: The aurora and stars reflect on a simulated water surface
- **Self-evolving**: Auroras automatically appear and disappear over time

## How to Run

### Option 1: Local Setup

1. Create a new folder for your project
2. Download the p5.js library from [p5js.org](https://p5js.org/download/)
3. Create an HTML file with the following structure:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aurora Borealis Simulation</title>
  <script src="p5.js"></script>
  <script src="sketch.js"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    canvas {
      display: block;
    }
  </style>
</head>
<body>
</body>
</html>
```

4. Save the simulation code in a file named `sketch.js`
5. Open the HTML file in a web browser

### Option 2: Online Editor

1. Go to the [p5.js Web Editor](https://editor.p5js.org/)
2. Create a new sketch
3. Copy and paste the simulation code into the editor
4. Click the "Play" button to run the simulation

## Controls

- **Click**: Generate a new aurora pattern
- **Refresh Page**: Reset the entire simulation

## Customization

You can modify the following parameters in the code to customize the simulation:

- `noiseScale` and `noiseStrength`: Control the randomness of the aurora movements
- Adjust the number of stars by changing the value in the `for` loop in the `setup()` function
- Modify the colors in the `createAurora()` function to change the aurora color palette
- Adjust the mountain height by changing the `peakHeight` variable in the `createMountains()` function

## Requirements

- p5.js library (version 1.4.0 or newer recommended)
- A web browser with JavaScript enabled
- No additional libraries required

## License

This project is released under the MIT License. Feel free to use, modify, and distribute the code as you wish.

## Acknowledgments

- Inspired by the natural phenomenon of the Aurora Borealis
- Created using the p5.js JavaScript library
