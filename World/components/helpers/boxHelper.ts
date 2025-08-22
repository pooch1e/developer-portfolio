import { BoxHelper } from 'three';

export const createBoxHelper = (object) => {
  const box = new BoxHelper(object, 0xffff00);
  return box;
};
