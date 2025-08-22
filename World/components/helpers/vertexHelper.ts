import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';

export const createVertexHelper = (object) => {
  const vertex = new VertexNormalsHelper(object, 2, 0xff0000);
  return vertex;
};
