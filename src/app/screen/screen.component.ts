import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { spriteMap } from './sprite_map';
import { CANVAS_SIZE, randomInt } from '../../helper';

@Component({
	selector: 'app-screen',
	standalone: true,
	imports: [],
	templateUrl: './screen.component.html',
	styleUrl: './screen.component.scss'
})
export class ScreenComponent implements OnInit {
 
	@ViewChild('canvas', {static: true}) screenCanvas! : ElementRef; // screen with tamagotchi + animations
	private spritesheet:HTMLImageElement = new Image();
	canvas: HTMLCanvasElement | null;
	ctx: CanvasRenderingContext2D | null;

	constructor() {
		this.canvas = null;
		this.ctx = null;
	}

	ngOnInit() : void {
		this.spritesheet.src = 'assets/tamagotchi_spritesheet.png'

		this.canvas = this.screenCanvas.nativeElement;
		this.ctx = this.canvas!.getContext('2d');

		this.canvas!.width = CANVAS_SIZE.WIDTH;
		this.canvas!.height = CANVAS_SIZE.HEIGHT;
		const CANVAS_MIDDLE = CANVAS_SIZE.WIDTH / 3.25
		const CANVAS_RIGHT = CANVAS_SIZE.WIDTH / 1.3

		let tName = "shirobabytchi";
		let action = "main"

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
		let destX = CANVAS_SIZE.WIDTH/3.25;

	// Used to animate the sprites
		const animate = () => 
		{
			this.ctx?.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
			requestAnimationFrame(animate);

			currentFrame = currentFrame % animation.frames.length;
			let srcX = animation.frames[currentFrame].x;
			let srcY = animation.frames[currentFrame].y;

			// ctx?.drawImage(tamaImage, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
			this.ctx?.drawImage(this.spritesheet, 
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

				this.ctx?.drawImage(this.spritesheet, 
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
				if(destX >= CANVAS_SIZE.WIDTH - spriteWidth) {
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
	}
}
