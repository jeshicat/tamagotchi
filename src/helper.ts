export const CANVAS_SIZE = { WIDTH : 330, HEIGHT : 314}

// returns a random number between supplied min and max numbers
export function randomInt(min:number, max:number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Frame limit needs to be 30, 60 or 90. Slows down transition between sprites
export function getNewFrameLimit() { 
  return randomInt(1,3)*30;
}