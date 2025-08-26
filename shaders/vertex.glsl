//attr are vertex specific data
  // attribute vec3 position;
// attributes are array of vertex positions ie this is points of the vertex 'triangle'

//uniform is the SAME for every vertex
  // uniform mat4 projectionMatrix;
  // uniform mat4 modelViewMatrix;
// these signify 'arrays' 
  // uniform mat4 modelMatrix;
  // uniform mat4 viewMatrix;

//model view matrix is combo of two matrices
//model + view
// controls TRANSFORM -> position, scale, rotation
// modelMatrix -> position, scale, rotation of model
// viewMatrix -> position, orientation of camera
// projectionMatrix -> projects object onto screen (aspect ratio & ratio)
// precision mediump float;
// uniform float uTime;
// varying vec3 vPosition; //varying sends info from vertext to fragment shader
// varying vec3 vNormal;
// varying vec2 vUv;

// void main() {
//   vPosition = position;
//   vNormal = normal;
//   vUv = uv;
//   //MVP - MODEL VIEW PROJECTION
//   vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
//   vec4 projectedPosition = projectionMatrix * modelViewPosition;
//   gl_Position = projectedPosition;
// }

//starting actual project

// uniform float uTime;

// varying vec3 vPosition;
// varying vec3 vNormal;
// varying vec2 vUv;

// void main() {
//   vPosition = position;
//   vNormal = normal;
//   vUv = uv;

//   //mvp
//   vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
//   vec4 projectedPosition = projectionMatrix * modelViewPosition;
//   gl_Position = projectedPosition;
// }

// Vertex shader to support the advanced fragment shader
// varying vec2 vUv;
// varying vec3 vPosition;
// varying vec3 vNormal;

// void main() {
//   vUv = uv;
//   vPosition = position;
//   vNormal = normalize(normalMatrix * normal);

//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }

// Advanced vertex shader with displacement for pixel sorting
uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vNoise;
varying float vDisplacement;

// Simplex noise functions (simplified versions)
vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// Fractal Brownian Motion for complex patterns
float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 6; i++) {
        value += amplitude * snoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Turbulence function similar to your example
float turbulence(vec3 p) {
    float t = 0.0;
    float f = 1.0;
    
    for(int i = 0; i < 4; i++) {
        float power = pow(2.0, f);
        t += abs(snoise(p * power * 0.1)) / power;
        f += 1.0;
    }
    return t;
}

// Sorting-inspired displacement
float sortingDisplacement(vec3 pos, vec3 norm, float time) {
    // Create banding effect that mimics pixel sorting bands
    float bandFreq = 20.0;
    float bands = sin(pos.y * bandFreq + time * 2.0) * 
                  sin(pos.x * bandFreq * 0.7 + time * 1.5) * 
                  sin(pos.z * bandFreq * 1.3 + time * 1.8);
    
    // Glitch-like displacement jumps
    float glitchTime = floor(time * 3.0);
    float glitchNoise = snoise(vec3(glitchTime * 0.1));
    float glitchStrength = step(0.7, glitchNoise) * 0.3;
    
    // Combine smooth and glitchy displacement
    return bands * 0.1 + glitchStrength * snoise(pos * 10.0 + time);
}

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    // Time-based animation
    float time = uTime * 0.5;
    
    // Get various noise values
    float highFreqNoise = turbulence(normal * 2.0 + time * 0.2);
    float lowFreqNoise = fbm(position * 0.3 + time * 0.1);
    float sortingNoise = sortingDisplacement(position, normal, uTime);
    
    // Store noise for fragment shader
    vNoise = highFreqNoise;
    
    // Combine different displacement types
    float displacement = 
        // Base turbulent displacement
        -0.2 * highFreqNoise + 
        // Low frequency waves
        0.15 * lowFreqNoise +
        // Sorting-inspired displacement
        0.25 * sortingNoise +
        // Time-based pulsing
        0.1 * sin(length(position) * 5.0 + time * 3.0);
    
    // Store displacement for fragment shader
    vDisplacement = displacement;
    
    // Create the displaced position
    vec3 newPosition = position + normal * displacement;
    
    // Transform to screen space
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}