
import { ASSETS_URL } from '../constants';

export const ILLUSTRATIONS = {
  colored: Array.from({ length: 13 }, (_, i) => `${ASSETS_URL}/art/colored/${i + 1}.png`),
  sketches: Array.from({ length: 56 }, (_, i) => `${ASSETS_URL}/art/sketch/${i + 1}.png`)
};
