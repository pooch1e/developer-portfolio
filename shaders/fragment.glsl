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

//starting actual project
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
uniform vec3 uColor;

void main() {
  vec2 uv = vUv;
  uv.y += uTime;
  gl_FragColor = vec4(uColor * step(0.5, mod(uv.y * 10.0, 1.0)), 1.0);
}