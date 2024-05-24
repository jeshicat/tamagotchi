import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { spriteMap, companionSpriteMap, ISpriteData, ICompanionSpriteData } from '../interfaces/sprite_map';
import { menuContextParams } from '../interfaces/menu_icon_map';
import { SCREEN_SIZE, clearCanvas, randomInt } from '../../helper';
import { TamagotchiService } from '../tamagotchi.service';

@Component({
	selector: 'app-screen',
	standalone: true,
	imports: [],
	templateUrl: './screen.component.html',
	styleUrl: './screen.component.scss'
})

export class ScreenComponent implements OnInit {
	
	TamaService: TamagotchiService = inject(TamagotchiService)


	@ViewChild('canvas', {static: true}) screenCanvas! : ElementRef; // screen with tamagotchi + animations
	private spritesheet:HTMLImageElement = new Image();
	canvas: HTMLCanvasElement | null;
	ctx: CanvasRenderingContext2D | null;

	CANVAS_MIDDLE = SCREEN_SIZE.HEIGHT / 2.5
	CANVAS_RIGHT = SCREEN_SIZE.WIDTH / 1.3

	animRequestIDs: number[] = [];

	// TODO CHANGE TO USE SERVICE CLASS
	tName = "shirobabytchi";

	currentFrame = 0;
	framesDrawn = 0; // records # of times the 'animate' function has been called
	frameLimit = 60; // frame limit should be 30, 60 or 90
	
	// Variables used for x axis movement of sprite
	movesFrameDrawn = 0;
	destX = SCREEN_SIZE.WIDTH/2;

	status_currentFrame = 0; // "status" frame counter

	action = "default";
	action_companions: string[];

	constructor() {
		this.canvas = null;
		this.ctx = null;

		this.action_companions = [];

	}

	ngOnInit() : void {
		this.spritesheet.src = 'assets/tamagotchi_spritesheet.png'

		this.canvas = this.screenCanvas.nativeElement;
		this.canvas!.width = SCREEN_SIZE.WIDTH;
		this.canvas!.height = SCREEN_SIZE.HEIGHT;

		this.initContext();

		this.TamaService.actionSubject.subscribe({next: (e) => {

			this.cancelAnimations()

			if(e.main === "" ) return
			
			this.action = e.main;
			if(e.main === "default") { 
				this.action_companions = e.status;
			} else {
				this.action_companions = e.add_ons;
			}

			if(e.main !== "" && this.ctx === null) {
				this.initContext()
			}

			console.log("action subscribe")
			this.drawScreenAnimation()

			//this.drawScreenAnimation();
		}})

		// this.currentFrame = 0;
		// this.framesDrawn = 0; // records # of times the 'animate' function has been called
		// this.frameLimit = 60; // frame limit should be 30, 60 or 90
	
		// // status frame counter
		// this.status_currentFrame = 0;

	} // end of OnInit

	// Used to animate the sprites
	isNestedPlaying = false;

	//animate(animation: spriteFrameDetails, spriteWidth: number, spriteHeight:number, destX: number) {
	animate() {
		clearCanvas(this.ctx);

		const spriteData = spriteMap[this.tName]
		const animation = spriteData.actions[this.action];

		this.currentFrame = this.currentFrame % animation.frames.length;

		if(animation.stopAtFrameEnd && this.currentFrame === animation.frames.length-1) {
			this.TamaService.updateAction("default")
			return;
		}

		let srcX = animation.frames[this.currentFrame].x;
		let srcY = animation.frames[this.currentFrame].y;

		// ctx?.drawImage(tamaImage, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
		this.ctx?.drawImage(this.spritesheet, 
			srcX, 
			srcY, 
			spriteData.spriteWidth, 
			spriteData.spriteHeight, 
			this.destX, 
			this.CANVAS_MIDDLE, 
			spriteData.spriteWidth/2, 
			spriteData.spriteHeight/2);
		
		const actionDetails = this.TamaService.getActionSubject();
		
		actionDetails.add_ons?.forEach((id) => {
			let companion = companionSpriteMap[id]
			this.status_currentFrame = this.status_currentFrame % companion.frames.length;
			let srcX2  = companion.frames[this.status_currentFrame].x;
			let srcY2  = companion.frames[this.status_currentFrame].y;

			if(this.status_currentFrame === 0 && companion.doesFall) {
				this.isNestedPlaying = true;
		
				this.animateTopToBottom(id, srcX2, srcY2)
				
				//this.ctx?.clearRect(destX-20, destY-10, 32, 32);
			} else {
				this.ctx?.drawImage(this.spritesheet, 
					srcX2, 
					srcY2, 
					companion.spriteWidth, 
					companion.spriteHeight, 
					companion.destX,
					companion.destY, 
					(companion.destWidth ? companion.destWidth : companion.spriteWidth), 
					(companion.destHeight ? companion.destHeight : companion.spriteHeight)
				);
			}
		}); // end for each for companion sprites

		
		if(this.isNestedPlaying) return;
		// status frames you show on upper right side of tama sprite
		// if(animation.frames_status) {

		// 	this.status_currentFrame = this.status_currentFrame % animation.frames_status.length;
		// 	let srcX2  = animation.frames_status[this.status_currentFrame].x;
		// 	let srcY2  = animation.frames_status[this.status_currentFrame].y;

		// 	this.ctx?.drawImage(this.spritesheet, 
		// 		srcX2, 
		// 		srcY2, 
		// 		64, 
		// 		64, 
		// 		this.CANVAS_RIGHT, 
		// 		80, 
		// 		64, 
		// 		64);
		// }


		// if(animation.frames_left) {
		// 	this.status_currentFrame = this.status_currentFrame % animation.frames_left.length;
		// 	let srcX2  = animation.frames_left[this.status_currentFrame].x;
		// 	let srcY2  = animation.frames_left[this.status_currentFrame].y;
			
			
		// 	// if first frame and left_fall > show food dropping animation before starting
		// 	if(this.status_currentFrame === 0 && animation.left_fall) {
		// 		this.isNestedPlaying = true;

		// 		let destY = 0;
		// 		let self = this;
		// 		function animateLeftFrames() {
		// 			if(destY < SCREEN_SIZE.HEIGHT-32) {
		// 				self.ctx?.clearRect(self.destX-20, destY-1, 32, 32);
		// 				self.ctx?.drawImage(self.spritesheet, 
		// 					srcX2, 
		// 					srcY2, 
		// 					64, 
		// 					64, 
		// 					self.destX-20, 
		// 					destY, 
		// 					32, 
		// 					32);
						
		// 					destY+=1;

		// 				self.animRequestIDs.push(requestAnimationFrame(animateLeftFrames));
		// 			} else {
		// 				self.status_currentFrame++;
		// 				self.isNestedPlaying = false;
		// 				self.drawScreenAnimation();
		// 			}	
		// 		}
				
		// 		animateLeftFrames();
		// 		//this.ctx?.clearRect(destX-20, destY-10, 32, 32);
		// 	} else {
		// 		this.ctx?.drawImage(this.spritesheet, 
		// 			srcX2, 
		// 			srcY2, 
		// 			64, 
		// 			64, 
		// 			this.destX-20, 
		// 			SCREEN_SIZE.HEIGHT-32, 
		// 			32, 
		// 			32);
		// 	}
		// }

		// if(this.isNestedPlaying) return;

		this.framesDrawn++;
		this.movesFrameDrawn++;

		// WHERE TO MOVE CURRENT SPRITE FRAME ALONG X AXIS
		if(animation.drift && this.movesFrameDrawn >= 30) {
			this.movesFrameDrawn = 0;
			this.destX = this.destX + (randomInt(-1, 1) * 20)

			// Make sure sprite doesn't leave canvas
			if(this.destX >= SCREEN_SIZE.WIDTH - spriteData.spriteWidth) {
				this.destX -= 20;
			} else if (this.destX <= spriteData.spriteWidth) {
				this.destX += 20;
			}
		}

		// WHICH SPRITE FRAME TO SHOW
		if(this.framesDrawn >= this.frameLimit) {
			this.currentFrame++;
			this.status_currentFrame++;
			this.framesDrawn = 0;
			//frameLimit = getNewFrameLimit();
		}
	const rid = requestAnimationFrame(() => {this.animate()})
		this.animRequestIDs.push(rid)
	} // end of animate

	animateTopToBottom(id: string, srcX: number, srcY: number, destY: number = 0) {
		const companion = companionSpriteMap[id]

		if(destY < companion.destY) {
				this.ctx?.clearRect(this.destX-20, destY-1, companion.destWidth!, companion.destHeight!);
				this.ctx?.drawImage(this.spritesheet, 
					srcX, 
					srcY, 
					companion.spriteWidth, 
					companion.spriteHeight, 
					companion.destX,
					destY, 
					(companion.destWidth ? companion.destWidth : companion.spriteWidth), 
					(companion.destHeight ? companion.destHeight : companion.spriteHeight)
				);
				
				destY+=1;

				this.animRequestIDs.push(requestAnimationFrame(() => {this.animateTopToBottom(id, srcX, srcY, destY)}));
			} else {
				this.status_currentFrame++;
				this.isNestedPlaying = false;
				this.animRequestIDs.push(requestAnimationFrame(() => {this.animate()}));
			}	
		}

		initContext() {
			this.ctx = this.canvas!.getContext('2d');
		}

		clearCanvasStopAnimation() {
			clearCanvas(this.ctx);
			//this.ctx = null
			this.cancelAnimations()
			//cancelAnimationFrame(this.animRequestID)

			// reset frame values
			//this.animRequestID = 0;
			this.animRequestIDs = [];
			this.currentFrame = 0;
			this.framesDrawn = 0;
			this.frameLimit = 60;
			this.movesFrameDrawn = 0;
			this.destX = SCREEN_SIZE.WIDTH/3.25;
			this.status_currentFrame = 0;
		}

		// Draws menu based on params from app.component
		drawMenu(menuSprites: menuContextParams[]) {
			this.clearCanvasStopAnimation();
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
			this.animate();
		// 	//let action = this.TamaService.getTamaAnimation();
		// 	clearCanvas(this.ctx);
		// 	let action = this.TamaService.getActionSubject()

		// 	console.log(`draw animation: ${action.main} ${action.add_ons.length > 0?action.add_ons[0]: ""}`)

		// 	if(action.main !== "") {
		// 		if(this.ctx === null) {
		// 			this.initContext()
		// 		}

		// 		const spriteData = spriteMap[this.tName]
		// 		const animation = spriteData.actions[action.main];
	
		// 		this.animate(animation, spriteData.spriteWidth, spriteData.spriteHeight, this.destX);
		// 	}
		 }

		cancelAnimations() { 
			this.animRequestIDs.forEach((x) => cancelAnimationFrame(x));
		}
		
	} 
