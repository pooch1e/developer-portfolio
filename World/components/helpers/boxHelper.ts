import { BoxHelper } from 'three';
import * as THREE from 'three';

export const createBoxHelper = (object: THREE.Mesh) => {
  const box = new BoxHelper(object, 0xffff00);
  return box;
};
