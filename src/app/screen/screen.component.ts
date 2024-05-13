import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { spriteMap, spriteData, spriteFrameDetails } from '../interfaces/sprite_map';
import { menuContextParams } from '../interfaces/menu_icon_map';
import { CANVAS_SIZE, clearCanvas, randomInt } from '../../helper';
import { TamagotchiService as TService } from '../tamagotchi.service';

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

	CANVAS_MIDDLE = CANVAS_SIZE.WIDTH / 3.25
	CANVAS_RIGHT = CANVAS_SIZE.WIDTH / 1.3

	animRequestID: number = 0;

	// TODO CHANGE TO USE SERVICE CLASS
	tName = "shirobabytchi";
	action = "default"

	currentFrame = 0;
	framesDrawn = 0; // records # of times the 'animate' function has been called
	frameLimit = 60; // frame limit should be 30, 60 or 90
	
	// Variables used for x axis movement of sprite
	movesFrameDrawn = 0;
	destX = CANVAS_SIZE.WIDTH/3.25;

	status_currentFrame = 0; // "status" frame counter

	constructor() {
		this.canvas = null;
		this.ctx = null;
	}

	ngOnInit() : void {
		this.spritesheet.src = 'assets/tamagotchi_spritesheet.png'

		this.canvas = this.screenCanvas.nativeElement;
		this.canvas!.width = CANVAS_SIZE.WIDTH;
		this.canvas!.height = CANVAS_SIZE.HEIGHT;

		this.initContext();

		// this.currentFrame = 0;
		// this.framesDrawn = 0; // records # of times the 'animate' function has been called
		// this.frameLimit = 60; // frame limit should be 30, 60 or 90
	
		// // status frame counter
		// this.status_currentFrame = 0;
		
		this.drawScreenAnimation();
	} // end of OnInit

	// Used to animate the sprites
	animate(animation: spriteFrameDetails, spriteWidth: number, spriteHeight:number, destX: number) {
		clearCanvas(this.ctx);
		this.animRequestID = requestAnimationFrame(() => {this.animate(animation, spriteWidth, spriteHeight, destX)});

			this.currentFrame = this.currentFrame % animation.frames.length;
			let srcX = animation.frames[this.currentFrame].x;
			let srcY = animation.frames[this.currentFrame].y;

			// ctx?.drawImage(tamaImage, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
			this.ctx?.drawImage(this.spritesheet, 
				srcX, 
				srcY, 
				spriteWidth, 
				spriteHeight, 
				destX, 
				this.CANVAS_MIDDLE, 
				spriteWidth, 
				spriteHeight);
		
			// status frames you show on upper right side of tama sprite
			if(animation.frames_status) {

				this.status_currentFrame = this.status_currentFrame % animation.frames_status.length;
				let srcX2  = animation.frames_status[this.status_currentFrame].x;
				let srcY2  = animation.frames_status[this.status_currentFrame].y;

				this.ctx?.drawImage(this.spritesheet, 
					srcX2, 
					srcY2, 
					64, 
					64, 
					this.CANVAS_RIGHT, 
					80, 
					64, 
					64);
			}

			this.framesDrawn++;
			this.movesFrameDrawn++;

			// WHERE TO MOVE CURRENT SPRITE FRAME ALONG X AXIS
			if(animation.drift && this.movesFrameDrawn >= 30) {
				this.movesFrameDrawn = 0;
				destX = destX + (randomInt(-1, 1) * 20)

				// Make sure sprite doesn't leave canvas
				if(destX >= CANVAS_SIZE.WIDTH - spriteWidth) {
					destX -= 20;
				} else if (destX <= spriteWidth) {
					destX += 20;
				}
			}

			// WHICH SPRITE FRAME TO SHOW
			if(this.framesDrawn >= this.frameLimit) {
					this.currentFrame++;
					this.status_currentFrame++;
					this.framesDrawn = 0;
					//frameLimit = getNewFrameLimit();
				}
		} // end of animate

		initContext() {
			this.ctx = this.canvas!.getContext('2d');
		}

		clearCanvasStopAnimation() {
			clearCanvas(this.ctx);
			//this.ctx = null
			cancelAnimationFrame(this.animRequestID)

			// reset frame values
			this.animRequestID = 0;
			this.currentFrame = 0;
			this.framesDrawn = 0;
			this.frameLimit = 60;
			this.movesFrameDrawn = 0;
			this.destX = CANVAS_SIZE.WIDTH/3.25;
			this.status_currentFrame = 0;
		}

		// Draws menu based on params from app.component
		drawMenu(menuSprites: menuContextParams[]) {
			menuSprites.forEach(x => {
				this.ctx?.drawImage(this.spritesheet, 
					x.srcX, 
					x.srcY, 
					x.spriteWidth, 
					x.spriteHeight, 
					x.destX, 
					x.destY, 
					x.destWidth, 
					x.destHeight);
			})
		}

		drawScreenAnimation() {
			const spriteData = spriteMap[this.tName]
			const animation = spriteData.actions[this.action];

			this.animate(animation, spriteData.spriteWidth, spriteData.spriteHeight, this.destX);
		}
		
	} 
