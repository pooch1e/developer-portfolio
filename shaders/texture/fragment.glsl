uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

// Simple noise function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for(int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  // Sample the grain texture
  vec4 texColor = texture2D(uTexture, vUv);
  
  // Convert to grayscale using luminance weights
  float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
  
  // Create animated noise mask based on world position
  vec2 noiseCoord = vWorldPosition.xy * 5.0 + vWorldPosition.z * 2.0;
  float noiseMask = fbm(noiseCoord + uTime * 0.3);
  
  // Add a second layer of noise at different scale/speed
  float noiseMask2 = fbm(vWorldPosition.yz * 6.0 - uTime * 0.2);
  
  // Combine noise layers - creates patchy, shifting visibility
  float combinedNoise = noiseMask * noiseMask2;
  
  // Threshold to create distinct patches
  float patchMask = smoothstep(0.1, 0.3, combinedNoise);
  
  // Invert: dark pixels visible, light pixels transparent
  float darkness = 1.0 - gray;
  
  // Final alpha: grain darkness * noise patches
  float alpha = darkness * patchMask;
  
  // Output black with varying alpha
  gl_FragColor = vec4(vec3(0.0), alpha);
}
