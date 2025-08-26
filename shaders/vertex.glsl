void main() {
  gl_position = projectionMatrix * modelViewMatrix * modelViewMatrix * vec4(position, 1.0);
}