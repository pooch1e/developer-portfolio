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

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vPosition = position;
  vNormal = normal;
  vUv = uv;

  //mvp
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  vec4 projectedPosition = projectionMatrix * modelViewPosition;
  gl_Position = projectedPosition;
}