import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import * as THREE from 'three';

export const createVertexHelper = (object: THREE.Mesh) => {
  const vertex = new VertexNormalsHelper(object, 1, 0xff0000);
  return vertex;
};
