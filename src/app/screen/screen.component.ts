import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { spriteMap, spriteData, spriteFrameDetails } from './sprite_map';
import { CANVAS_SIZE, randomInt } from '../../helper';
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
		this.ctx = this.canvas!.getContext('2d');

		this.canvas!.width = CANVAS_SIZE.WIDTH;
		this.canvas!.height = CANVAS_SIZE.HEIGHT;
	
		// TODO CHANGE TO USE SERVICE CLASS
		let tName = "shirobabytchi";
		let action = "main"

		const animation = spriteMap[tName].actions[action];
		const spriteWidth = spriteMap[tName].spriteWidth;
		const spriteHeight = spriteMap[tName].spriteHeight;
		
		this.currentFrame = 0;
		this.framesDrawn = 0; // records # of times the 'animate' function has been called
		this.frameLimit = 60; // frame limit should be 30, 60 or 90
	
		// status frame counter
		this.status_currentFrame = 0;

		
		
		this.animate(animation, spriteWidth, spriteHeight, this.destX);
	} // OnInit

	// Used to animate the sprites
	animate(animation: spriteFrameDetails, spriteWidth: number, spriteHeight:number, destX: number) {
		this.ctx?.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
		requestAnimationFrame(() => {this.animate(animation, spriteWidth, spriteHeight, destX)});

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
		}

		
	}