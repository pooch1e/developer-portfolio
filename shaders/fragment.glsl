// precision mediump float;
// uniform float uTime;
// varying vec3 vPosition;
// varying vec3 vNormal; //single solid colour
// varying vec2 vUv; //bw?

// // --- noise helpers ---
// float hash(float n) {
//   return fract(sin(n) * 1e4);
// }
// float hash(vec2 p) {
//   return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));
// }

// float noise(float x) {
//   float i = floor(x);
//   float f = fract(x);
//   float u = f * f * (3.0 - 2.0 * f);
//   return mix(hash(i), hash(i + 1.0), u);
// }

// float noise(vec2 x) {
//   vec2 i = floor(x);
//   vec2 f = fract(x);

//   float a = hash(i);
//   float b = hash(i + vec2(1.0, 0.0));
//   float c = hash(i + vec2(0.0, 1.0));
//   float d = hash(i + vec2(1.0, 1.0));

//   vec2 u = f * f * (3.0 - 2.0 * f);
//   return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
// }
// // --- end noise helpers ---

// void main() {

//   // create black/white stripes based on x coordinate of UV
//   // float stripes = fract(vUv.x * 10.0); 
//   // float bw = step(0.5, stripes);       
//   // gl_FragColor = vec4(vec3(bw), 1.0);

//   //dot func
//   // vec3 vectorA = vec3(1.0);
//   // vec3 vectorB = vec3(0.0);
//   // float dotProduct = dot(vectorA, vectorB);

//   // vec3 viewDirection = normalize(cameraPosition - vPosition);
//   // float fresnel = 1.0 - dot(viewDirection, vNormal);
//   // gl_FragColor = vec4(vec3(noise(vPosition)), 1);

//   //trying perlin noise 
//   // try 2D noise using the x/z world position
//   float n = noise(vPosition.xz * 2.0 + uTime * 0.1);

//   // map noise [0..1] into grayscale
//   gl_FragColor = vec4(vec3(n), 1.0);
// }

// Advanced pixel sorting-inspired fragment shader with multiple sorting modes
// uniform float uTime;
// uniform vec3 uColor;
// varying vec2 vUv;
// varying vec3 vPosition;
// varying vec3 vNormal;

// #define PI 3.14159265359
// #define TAU 6.28318530718

// // Noise functions for complex patterns
// float random(vec2 st) {
//   return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
// }

// float noise(vec2 st) {
//   vec2 i = floor(st);
//   vec2 f = fract(st);
//   float a = random(i);
//   float b = random(i + vec2(1.0, 0.0));
//   float c = random(i + vec2(0.0, 1.0));
//   float d = random(i + vec2(1.0, 1.0));
//   vec2 u = f * f * (3.0 - 2.0 * f);
//   return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
// }

// float fbm(vec2 st) {
//   float value = 0.0;
//   float amplitude = 0.5;
//   float frequency = 0.0;
//   for(int i = 0; i < 4; i++) {
//     value += amplitude * noise(st);
//     st *= 2.0;
//     amplitude *= 0.5;
//   }
//   return value;
// }

// // Color sorting functions
// float getLuminance(vec3 color) {
//   return dot(color, vec3(0.299, 0.587, 0.114));
// }

// float getHue(vec3 color) {
//   float maxVal = max(max(color.r, color.g), color.b);
//   float minVal = min(min(color.r, color.g), color.b);
//   float delta = maxVal - minVal;

//   if(delta == 0.0)
//     return 0.0;

//   float h;
//   if(maxVal == color.r) {
//     h = mod((color.g - color.b) / delta, 6.0);
//   } else if(maxVal == color.g) {
//     h = (color.b - color.r) / delta + 2.0;
//   } else {
//     h = (color.r - color.g) / delta + 4.0;
//   }

//   return h / 6.0;
// }

// float getSaturation(vec3 color) {
//   float maxVal = max(max(color.r, color.g), color.b);
//   float minVal = min(min(color.r, color.g), color.b);
//   return maxVal == 0.0 ? 0.0 : (maxVal - minVal) / maxVal;
// }

// // Advanced sorting displacement
// vec2 multiModalSorting(vec2 uv, vec3 baseColor, float time) {
//     // Multiple sorting criteria
//   float lum = getLuminance(baseColor);
//   float h = getHue(baseColor);
//   float sat = getSaturation(baseColor);

//     // Animated sorting thresholds
//   float lumThreshold = sin(time * 0.3) * 0.5 + 0.5;
//   float hueThreshold = sin(time * 0.2 + PI) * 0.5 + 0.5;
//   float satThreshold = sin(time * 0.4 + PI * 0.5) * 0.5 + 0.5;

//     // Different sorting patterns based on different criteria
//   vec2 displacement = vec2(0.0);

//     // Horizontal luminance sorting
//   if(lum > lumThreshold) {
//     float bandHeight = 0.05 + sin(time * 0.1) * 0.02;
//     float band = floor(uv.y / bandHeight);
//     float sortStrength = smoothstep(lumThreshold - 0.1, lumThreshold + 0.1, lum);
//     displacement.x += (random(vec2(band, floor(time * 2.0))) - 0.5) * sortStrength * 0.3;
//   }

//     // Vertical hue sorting
//   if(h > hueThreshold) {
//     float bandWidth = 0.08 + sin(time * 0.15) * 0.03;
//     float band = floor(uv.x / bandWidth);
//     float sortStrength = smoothstep(hueThreshold - 0.1, hueThreshold + 0.1, h);
//     displacement.y += (random(vec2(band + 100.0, floor(time * 1.5))) - 0.5) * sortStrength * 0.2;
//   }

//     // Diagonal saturation sorting
//   if(sat > satThreshold) {
//     vec2 diagonal = normalize(vec2(1.0, 1.0));
//     float diagonalPos = dot(uv, diagonal);
//     float bandSize = 0.06;
//     float band = floor(diagonalPos / bandSize);
//     float sortStrength = smoothstep(satThreshold - 0.1, satThreshold + 0.1, sat);
//     vec2 diagonalDisp = diagonal * (random(vec2(band + 200.0, floor(time * 1.8))) - 0.5) * sortStrength * 0.15;
//     displacement += diagonalDisp;
//   }

//   return displacement;
// }

// // Glitch sorting effects
// vec2 glitchSorting(vec2 uv, float time) {
//     // Create sudden, dramatic sorting events
//   float glitchTime = floor(time * 0.5);
//   float glitchNoise = random(vec2(glitchTime));

//   if(glitchNoise > 0.85) {
//         // Horizontal glitch sorting
//     float scanline = floor(uv.y * 100.0);
//     float glitchStrength = random(vec2(scanline, glitchTime));

//     if(glitchStrength > 0.7) {
//       float displacement = (random(vec2(scanline + 500.0, glitchTime)) - 0.5) * 0.8;
//       return vec2(displacement, 0.0);
//     }
//   }

//   return vec2(0.0);
// }

// // Color channel separation sorting
// vec3 channelSeparationSort(vec2 uv, vec3 baseColor, float time) {
//   vec3 color = baseColor;

//     // Sort different channels in different directions
//   vec2 redOffset = multiModalSorting(uv + vec2(0.01, 0.0), vec3(color.r), time * 1.1);
//   vec2 greenOffset = multiModalSorting(uv + vec2(0.0, 0.01), vec3(color.g), time * 0.9);
//   vec2 blueOffset = multiModalSorting(uv - vec2(0.01, 0.01), vec3(color.b), time * 1.3);

//     // Apply offsets to create chromatic aberration-like sorting
//   color.r = mix(color.r, random(uv + redOffset + time * 0.1), 0.3);
//   color.g = mix(color.g, random(uv + greenOffset + time * 0.12), 0.25);
//   color.b = mix(color.b, random(uv + blueOffset + time * 0.08), 0.35);

//   return color;
// }

// // Sorting based on position and normal
// vec2 geometricSorting(vec2 uv, vec3 position, vec3 normal, float time) {
//     // Sort based on 3D position projected to 2D
//   float positionMetric = dot(position, vec3(sin(time * 0.1), cos(time * 0.15), sin(time * 0.08)));
//   float normalMetric = dot(normal, vec3(cos(time * 0.2), sin(time * 0.25), cos(time * 0.18)));

//   float combinedMetric = positionMetric + normalMetric * 0.5;
//   float threshold = sin(time * 0.3) * 0.5 + 0.5;

//   if(combinedMetric > threshold) {
//         // Radial sorting from center
//     vec2 fromCenter = uv - 0.5;
//     float angle = atan(fromCenter.y, fromCenter.x);
//     float radius = length(fromCenter);

//     float sortedAngle = angle + (random(vec2(floor(radius * 20.0), floor(time))) - 0.5) * 2.0;
//     vec2 sortedDir = vec2(cos(sortedAngle), sin(sortedAngle));

//     return sortedDir * radius * 0.3 - fromCenter;
//   }

//   return vec2(0.0);
// }

// // Data moshing effect
// vec3 dataMoshing(vec2 uv, vec3 color, float time) {
//     // Create data corruption-like effects
//   float moshTime = floor(time * 3.0);
//   float moshStrength = random(vec2(moshTime)) > 0.9 ? 1.0 : 0.0;

//   if(moshStrength > 0.0) {
//         // Bit-shift like effects
//     vec3 quantized = floor(color * 8.0) / 8.0;

//         // Color channel swapping
//     float swapType = random(vec2(moshTime + 1.0));
//     if(swapType < 0.33) {
//       quantized = quantized.gbr;
//     } else if(swapType < 0.66) {
//       quantized = quantized.brg;
//     }

//         // Blend with noise
//     vec3 noiseColor = vec3(random(uv + vec2(moshTime)), random(uv + vec2(moshTime + 1.0)), random(uv + vec2(moshTime + 2.0)));

//     return mix(color, mix(quantized, noiseColor, 0.3), moshStrength * 0.7);
//   }

//   return color;
// }

// void main() {
//   vec2 uv = vUv;
//   vec3 baseColor = uColor;
//   float time = uTime;

//     // Apply multiple sorting effects
//   vec2 sortDisplacement = multiModalSorting(uv, baseColor, time);
//   vec2 glitchDisp = glitchSorting(uv, time);
//   vec2 geoDisp = geometricSorting(uv, vPosition, vNormal, time);

//     // Combine all displacements
//   vec2 totalDisplacement = sortDisplacement + glitchDisp + geoDisp;
//   vec2 sortedUv = uv + totalDisplacement;

//     // Ensure UV coordinates stay in bounds with wrapping
//   sortedUv = fract(sortedUv + 1.0);

//     // Apply color effects
//   vec3 color = channelSeparationSort(sortedUv, baseColor, time);
//   color = dataMoshing(sortedUv, color, time);

//     // Add sorting-inspired patterns
//   float horizontalStreaks = step(0.85, sin(sortedUv.y * 80.0 + time * 3.0));
//   float verticalStreaks = step(0.9, sin(sortedUv.x * 60.0 + time * 2.5));
//   float diagonalPattern = step(0.88, sin((sortedUv.x + sortedUv.y) * 45.0 + time * 4.0));

//     // Combine streak patterns
//   float streakIntensity = horizontalStreaks * 0.3 + verticalStreaks * 0.2 + diagonalPattern * 0.25;
//   color = mix(color, vec3(1.0), streakIntensity);

//     // Add chromatic aberration-like sorting
//   float aberrationStrength = sin(time * 0.5) * 0.01 + 0.01;
//   color.r = mix(color.r, random(sortedUv + vec2(aberrationStrength, 0.0) + time * 0.1), 0.15);
//   color.b = mix(color.b, random(sortedUv - vec2(aberrationStrength, 0.0) + time * 0.1), 0.15);

//     // Final color grading with sorting-inspired quantization
//   color = floor(color * 16.0) / 16.0; // Posterization effect
//   color = mix(color, smoothstep(0.0, 1.0, color), 0.7); // Contrast adjustment

//   gl_FragColor = vec4(color, 1.0);
// }

// Advanced pixel sorting-inspired fragment shader with vertex displacement
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vNoise;
varying float vDisplacement;

#define PI 3.14159265359
#define TAU 6.28318530718

// Noise functions for complex patterns
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 0.0;
  for(int i = 0; i < 4; i++) {
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// Color sorting functions
float getLuminance(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float getHue(vec3 color) {
  float maxVal = max(max(color.r, color.g), color.b);
  float minVal = min(min(color.r, color.g), color.b);
  float delta = maxVal - minVal;

  if(delta == 0.0)
    return 0.0;

  float h;
  if(maxVal == color.r) {
    h = mod((color.g - color.b) / delta, 6.0);
  } else if(maxVal == color.g) {
    h = (color.b - color.r) / delta + 2.0;
  } else {
    h = (color.r - color.g) / delta + 4.0;
  }

  return h / 6.0;
}

float getSaturation(vec3 color) {
  float maxVal = max(max(color.r, color.g), color.b);
  float minVal = min(min(color.r, color.g), color.b);
  return maxVal == 0.0 ? 0.0 : (maxVal - minVal) / maxVal;
}

// Advanced sorting displacement that uses vertex displacement
vec2 multiModalSorting(vec2 uv, vec3 baseColor, float time) {
    // Multiple sorting criteria enhanced with vertex displacement
  float lum = getLuminance(baseColor);
  float h = getHue(baseColor);
  float sat = getSaturation(baseColor);

    // Use vertex displacement to influence sorting
  float displacementInfluence = vDisplacement * 2.0;
  float noiseInfluence = vNoise * 1.5;

    // Animated sorting thresholds influenced by displacement
  float lumThreshold = sin(time * 0.3 + displacementInfluence) * 0.5 + 0.5;
  float hueThreshold = sin(time * 0.2 + PI + noiseInfluence) * 0.5 + 0.5;
  float satThreshold = sin(time * 0.4 + PI * 0.5 + displacementInfluence * 0.5) * 0.5 + 0.5;

    // Different sorting patterns based on different criteria
  vec2 displacement = vec2(0.0);

    // Horizontal luminance sorting enhanced by displacement
  if(lum > lumThreshold) {
    float bandHeight = 0.05 + sin(time * 0.1 + vDisplacement * 3.0) * 0.02;
    float band = floor(uv.y / bandHeight);
    float sortStrength = smoothstep(lumThreshold - 0.1, lumThreshold + 0.1, lum) * (1.0 + abs(vDisplacement));
    displacement.x += (random(vec2(band, floor(time * 2.0))) - 0.5) * sortStrength * (0.3 + vNoise * 0.2);
  }

    // Vertical hue sorting with displacement influence
  if(h > hueThreshold) {
    float bandWidth = 0.08 + sin(time * 0.15 + vNoise * 2.0) * 0.03;
    float band = floor(uv.x / bandWidth);
    float sortStrength = smoothstep(hueThreshold - 0.1, hueThreshold + 0.1, h) * (1.0 + abs(vNoise));
    displacement.y += (random(vec2(band + 100.0, floor(time * 1.5))) - 0.5) * sortStrength * (0.2 + vDisplacement * 0.15);
  }

    // Diagonal saturation sorting following surface displacement
  if(sat > satThreshold) {
    vec2 diagonal = normalize(vec2(1.0, 1.0) + vec2(vDisplacement, vNoise) * 0.3);
    float diagonalPos = dot(uv, diagonal);
    float bandSize = 0.06 + vNoise * 0.02;
    float band = floor(diagonalPos / bandSize);
    float sortStrength = smoothstep(satThreshold - 0.1, satThreshold + 0.1, sat) * (1.0 + abs(vDisplacement + vNoise) * 0.5);
    vec2 diagonalDisp = diagonal * (random(vec2(band + 200.0, floor(time * 1.8))) - 0.5) * sortStrength * (0.15 + abs(vDisplacement) * 0.1);
    displacement += diagonalDisp;
  }

  return displacement;
}

// Enhanced glitch sorting that responds to surface displacement
vec2 glitchSorting(vec2 uv, float time) {
    // Create sudden, dramatic sorting events triggered by displacement
  float glitchTime = floor(time * 0.5);
  float glitchNoise = random(vec2(glitchTime)) + abs(vDisplacement) * 2.0;

  if(glitchNoise > 0.7) { // Lower threshold due to displacement influence
        // Horizontal glitch sorting affected by surface distortion
    float scanline = floor(uv.y * (100.0 + vNoise * 50.0));
    float glitchStrength = random(vec2(scanline, glitchTime)) * (1.0 + abs(vDisplacement));

    if(glitchStrength > 0.5) { // Also lower threshold
      float displacement = (random(vec2(scanline + 500.0, glitchTime)) - 0.5) * (0.8 + vNoise * 0.4);
      return vec2(displacement, vDisplacement * 0.2); // Add some vertical displacement too
    }
  }

  return vec2(0.0);
}

// Color channel separation sorting
vec3 channelSeparationSort(vec2 uv, vec3 baseColor, float time) {
  vec3 color = baseColor;

    // Sort different channels in different directions
  vec2 redOffset = multiModalSorting(uv + vec2(0.01, 0.0), vec3(color.r), time * 1.1);
  vec2 greenOffset = multiModalSorting(uv + vec2(0.0, 0.01), vec3(color.g), time * 0.9);
  vec2 blueOffset = multiModalSorting(uv - vec2(0.01, 0.01), vec3(color.b), time * 1.3);

    // Apply offsets to create chromatic aberration-like sorting
  color.r = mix(color.r, random(uv + redOffset + time * 0.1), 0.3);
  color.g = mix(color.g, random(uv + greenOffset + time * 0.12), 0.25);
  color.b = mix(color.b, random(uv + blueOffset + time * 0.08), 0.35);

  return color;
}

// Sorting based on position and normal
vec2 geometricSorting(vec2 uv, vec3 position, vec3 normal, float time) {
    // Sort based on 3D position projected to 2D
  float positionMetric = dot(position, vec3(sin(time * 0.1), cos(time * 0.15), sin(time * 0.08)));
  float normalMetric = dot(normal, vec3(cos(time * 0.2), sin(time * 0.25), cos(time * 0.18)));

  float combinedMetric = positionMetric + normalMetric * 0.5;
  float threshold = sin(time * 0.3) * 0.5 + 0.5;

  if(combinedMetric > threshold) {
        // Radial sorting from center
    vec2 fromCenter = uv - 0.5;
    float angle = atan(fromCenter.y, fromCenter.x);
    float radius = length(fromCenter);

    float sortedAngle = angle + (random(vec2(floor(radius * 20.0), floor(time))) - 0.5) * 2.0;
    vec2 sortedDir = vec2(cos(sortedAngle), sin(sortedAngle));

    return sortedDir * radius * 0.3 - fromCenter;
  }

  return vec2(0.0);
}

// Data moshing effect
vec3 dataMoshing(vec2 uv, vec3 color, float time) {
    // Create data corruption-like effects
  float moshTime = floor(time * 3.0);
  float moshStrength = random(vec2(moshTime)) > 0.9 ? 1.0 : 0.0;

  if(moshStrength > 0.0) {
        // Bit-shift like effects
    vec3 quantized = floor(color * 8.0) / 8.0;

        // Color channel swapping
    float swapType = random(vec2(moshTime + 1.0));
    if(swapType < 0.33) {
      quantized = quantized.gbr;
    } else if(swapType < 0.66) {
      quantized = quantized.brg;
    }

        // Blend with noise
    vec3 noiseColor = vec3(random(uv + vec2(moshTime)), random(uv + vec2(moshTime + 1.0)), random(uv + vec2(moshTime + 2.0)));

    return mix(color, mix(quantized, noiseColor, 0.3), moshStrength * 0.7);
  }

  return color;
}

void main() {
  vec2 uv = vUv;
  vec3 baseColor = uColor;
  float time = uTime;

    // Apply multiple sorting effects
  vec2 sortDisplacement = multiModalSorting(uv, baseColor, time);
  vec2 glitchDisp = glitchSorting(uv, time);
  vec2 geoDisp = geometricSorting(uv, vPosition, vNormal, time);

    // Combine all displacements
  vec2 totalDisplacement = sortDisplacement + glitchDisp + geoDisp;
  vec2 sortedUv = uv + totalDisplacement;

    // Ensure UV coordinates stay in bounds with wrapping
  // sortedUv = fract(sortedUv + 1.0);

    // Apply color effects
  vec3 color = channelSeparationSort(sortedUv, baseColor, time);
  color = dataMoshing(sortedUv, color, time);

    // Add sorting-inspired patterns
  float horizontalStreaks = step(0.85, sin(sortedUv.y * 80.0 + time * 3.0));
  float verticalStreaks = step(0.9, sin(sortedUv.x * 60.0 + time * 2.5));
  float diagonalPattern = step(0.88, sin((sortedUv.x + sortedUv.y) * 45.0 + time * 4.0));

    // Combine streak patterns
  float streakIntensity = horizontalStreaks * 0.3 + verticalStreaks * 0.2 + diagonalPattern * 0.25;
  color = mix(color, vec3(1.0), streakIntensity);

    // Add chromatic aberration-like sorting
  // float aberrationStrength = sin(time * 0.5) * 0.01 + 0.01;
  // color.r = mix(color.r, random(sortedUv + vec2(aberrationStrength, 0.0) + time * 0.1), 0.15);
  // color.b = mix(color.b, random(sortedUv - vec2(aberrationStrength, 0.0) + time * 0.1), 0.15);

    // Final color grading with sorting-inspired quantization
  color = floor(color * 16.0) / 16.0; 
  color = mix(color, smoothstep(0.0, 1.0, color), 0.7); 

  gl_FragColor = vec4(color, 1.0);
}