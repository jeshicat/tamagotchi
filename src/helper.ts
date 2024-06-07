//export const CANVAS_SIZE = { WIDTH : 330, HEIGHT : 314}
export const CANVAS_SIZE = { WIDTH : 212, HEIGHT : 200}
export const SCREEN_SIZE = { WIDTH: 207, HEIGHT: 107}
export const SCREEN_RIGHT = SCREEN_SIZE.WIDTH / 1.3

// returns a random number between supplied min and max numbers
export function randomInt(min:number, max:number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Frame limit needs to be 30, 60 or 90. Slows down transition between sprites
export function getNewFrameLimit() { 
  return randomInt(1,3)*30;
}

export function clearCanvas(ctx: CanvasRenderingContext2D | null) {
  ctx?.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
}

export function delay(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}