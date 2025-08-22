import { AxesHelper } from 'three';

export const createAxesHelper = () => {
  const axes = new AxesHelper(3);
  return axes;
};
