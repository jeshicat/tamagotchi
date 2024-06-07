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

	currentFrame = 0;
	framesDrawn = 0; // records # of times the 'animate' function has been called
	frameLimit = 60; // frame limit should be 30, 60 or 90
	
	// Variables used for x axis movement of sprite
	movesFrameDrawn = 0;
	destX = SCREEN_SIZE.WIDTH/3;

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
			this.destX = SCREEN_SIZE.WIDTH/3;

			if(e.main === "") return
			this.action = e.main;
			if(e.main === "default") { 
				this.action_companions = e.status;
			} else {
				this.action_companions = e.add_ons;
			}

			if(this.ctx === null) {
				this.initContext()
			}

			console.log("action " + this.action + ":" + this.action_companions)
			this.drawScreenAnimation()
		}}) // end of action subscribe
	} // end of OnInit

	// Used to animate the sprites
	isNestedPlaying = false;

	//animate(animation: spriteFrameDetails, spriteWidth: number, spriteHeight:number, destX: number) {
	animate() {
		clearCanvas(this.ctx);

		const spriteData = spriteMap[this.TamaService.getTamagotchiName()]
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
			this.cancelAnimations()

			// reset frame values
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
		 }

		cancelAnimations() { 
			this.animRequestIDs.forEach((x) => cancelAnimationFrame(x));
		}
		
	} 
