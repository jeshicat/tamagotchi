import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { spriteMap } from './sprite_map';
import { menuNavItems } from './menu_map';

import { randomInt } from '../helper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'tamagotchi';

  @ViewChild('canvas_nav', {static: true}) navCanvas! : ElementRef; // top and bottom icons
  @ViewChild('canvas', {static: true}) screenCanvas! : ElementRef; // screen with tamagotchi + animations
  
ngOnInit() : void {
  const CANVAS_WIDTH = 330;
  const CANVAS_HEIGHT = 314;

  const navSpritesheet = new Image();
  navSpritesheet.src = 'assets/menu-icons.svg'

  // Canvas for menu icons on top and bottom of "screen"
  const navCanvas: HTMLCanvasElement = this.navCanvas.nativeElement;
  navCanvas.width = CANVAS_WIDTH;
  navCanvas.height = CANVAS_HEIGHT;
  const navCtx = navCanvas.getContext('2d');

  const menu_icon_size = 21; // size of icon on sprite
  const menu_icon_scale_size = 30; // used to scale icon size

  navSpritesheet.onload = function () {
    redrawMenuIcons()
  }

  const spritesheet = new Image();
  spritesheet.src = 'assets/tamagotchi_spritesheet.png'

  const canvas: HTMLCanvasElement = this.screenCanvas.nativeElement;
  const ctx = canvas.getContext('2d');

  canvas.width = 330;
  canvas.height = 314;
  const CANVAS_MIDDLE = CANVAS_WIDTH / 3.25
  const CANVAS_RIGHT = CANVAS_WIDTH / 1.3

 // const spritesheet = new Image();
  //spritesheet.src = 'assets/adult_sprite.png';
  //spritesheet.src = 'assets/tamagotchi_spritesheet.png'

  let tName = "shirobabytchi";
  let action = "main"

//ADDED
  const animation = spriteMap[tName].actions[action];
  const spriteWidth = spriteMap[tName].spriteWidth;
  const spriteHeight = spriteMap[tName].spriteHeight;
  const frames = animation.frames
  
  let currentFrame = 0;
  let framesDrawn = 0; // records # of times the 'animate' function has been called
  let frameLimit = 60; // frame limit should be 30, 60 or 90
 
  // status frame counter
  let currentStatusFrame = 0;

  // Variables used for x axis movement of sprite
  let movesFrameDrawn = 0;
  let destX = CANVAS_WIDTH/3.25;

 // draw different shapes
  function animate() 
  {
    clearCanvas(ctx);
    requestAnimationFrame(animate);

    currentFrame = currentFrame % animation.frames.length;
    let srcX = animation.frames[currentFrame].x;
    let srcY = animation.frames[currentFrame].y;

    // ctx?.drawImage(tamaImage, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
    ctx?.drawImage(spritesheet, 
      srcX, 
      srcY, 
      spriteWidth, 
      spriteHeight, 
      destX, 
      CANVAS_MIDDLE, 
      spriteWidth, 
      spriteHeight);
   
    // status frames you show on upper right side of tama sprite
    if(animation.frames_status) {
      currentStatusFrame = currentStatusFrame % animation.frames_status.length;
      let srcX2  = animation.frames_status[currentStatusFrame].x;
      let srcY2  = animation.frames_status[currentStatusFrame].y;

      ctx?.drawImage(spritesheet, 
        srcX2, 
        srcY2, 
        64, 
        64, 
        CANVAS_RIGHT, 
        80, 
        64, 
        64);
    }

    framesDrawn++;
    movesFrameDrawn++;

    // WHERE TO MOVE CURRENT SPRITE FRAME ALONG X AXIS
    if(animation.drift && movesFrameDrawn >= 30) {
      movesFrameDrawn = 0;
      destX = destX + (randomInt(-1, 1) * 20)

      // Make sure sprite doesn't leave canvas
      if(destX >= CANVAS_WIDTH - spriteWidth) {
        destX -= 20;
      } else if (destX <= spriteWidth) {
        destX += 20;
      }
    }

    // WHICH SPRITE FRAME TO SHOW
    if(framesDrawn >= frameLimit) {
        currentFrame++;
        currentStatusFrame++;
        framesDrawn = 0;
        //frameLimit = getNewFrameLimit();
      }
  }

  animate();


  // clears canvas
function clearCanvas(ctx: CanvasRenderingContext2D | null) {
  ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

// Redraw menu icons with all unactive
function redrawMenuIcons() {
  clearCanvas(navCtx);

  menuNavItems.forEach(e => {
    let srcY = e.isTop ? 0 : menu_icon_size;
    ctx?.drawImage(navSpritesheet, 
      e.position * menu_icon_size,  // srcX
      !e.isActive ? srcY : (menu_icon_size*2)+srcY, // srcY
      menu_icon_size, 
      menu_icon_size, 
      e.destX,  // destX 
      e.destY,  // destY 
      menu_icon_scale_size, 
      menu_icon_scale_size);    
  });
}
  // Frame limit needs to be 30, 60 or 90. Slows down transition between sprites
  function getNewFrameLimit() {
    return randomInt(1,3)*30;
  }
}


  selectMenu() {
    // cycle through menu options
    alert("select")
    // Get current open menu 

    let noMenu = true;
    // if no menu open, cycle through menu options
    if(noMenu) {
      let index = menuNavItems.map(e => e.isActive).indexOf(true);
      if(index === menuNavItems.length) {
        index = -1;
      }
      //redrawMenuIcons()
      index++;
    } else {
      // go through options in menu / play game
    }
  }

  confirmMenu() {
    // confirm / execute action
    alert("confirm")
  }

  cancelMenu() {
    // back to main menu / cancel
    alert("cancel")
  }
}
