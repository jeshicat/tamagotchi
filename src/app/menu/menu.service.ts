import { Injectable } from '@angular/core';
import { menu, menuNavItem as menuIcons, menuContextParams } from '../interfaces/menu_icon_map';

@Injectable({
	providedIn: 'root'
})

export class MenuService {
	protected currentMenu: openMenuObj = {
		menuId: -1,
		screenIdx: -1,
		frameIdx: -1
	}

	// TOP AND BOTTOM MENU ICONS
	protected menuIcons: menuIcons[] = [
		{
			id: 'feed',
			isTop:true,
			position: 0,
			destX: 27, 
			destY: 12, 
			isActive: false
		},
		{
			id: 'lights',
			isTop: true,
			position: 1,
			destX: 71, 
			destY: 12,
			isActive: false
		},
		{
			id: 'play',
			isTop:true,
			position: 2,
			destX: 120, 
			destY: 12,
			isActive: false
		},
		{
			id: 'medicine',
			isTop: true,
			position: 3,
			destX: 165, 
			destY: 12,
			isActive: false
		},
		{
			id: 'bath',
			isTop:false,
			position: 0,
			destX: 25, 
			destY: 159,
			isActive: false
		},
		{
			id: 'scale',
			isTop: false,
			position: 1,
			destX: 68, 
			destY: 160,
			isActive: false
		},
		{
			id: 'discipline',
			isTop:false,
			position: 2,
			destX: 113, 
			destY: 160,
			isActive: false
		},
		{
			id: 'alert',
			isTop: false,
			position: 3,
			destX: 161, 
			destY: 162,
			isActive: false
		}
	];

	// MENU SCREENS AND ACTIONS
	private spriteScale: number = 1.3
	protected menus: menu[] = [
		{ // Feed
			id: 0, 
			screens: [{
				drawItems: [
				{ // MEAL
					srcX: 530, 
					srcY: 200,
					spriteWidth: 180,
					spriteHeight: 64,
					destX: 57,
					destY: 0,
					destWidth: 180/this.spriteScale,
					destHeight: 64/this.spriteScale
				}, { // SNACK
					srcX: 330, 
					srcY: 200,
					spriteWidth: 199,
					spriteHeight: 64,
					destX: 57,
					destY: 50,
					destWidth: 180/this.spriteScale,
					destHeight: 64/this.spriteScale
				} ,{ // ARROW UP
					srcX: 850, 
					srcY: 0,
					spriteWidth: 64,
					spriteHeight: 64,
					destX: 5,
					destY: 5,
					destWidth: 64/1.4,
					destHeight: 64/1.4
				}], 
				// MEAL ACTIONS
				buttonA: () => {
					// Move arrow between Meal and Snack
					this.cycleMenuScreens();
				},
				buttonB: () => {
					this.triggerActionFeed(true)
					// Clear canvas
					// Start feeding animation for Meal or Snack
					// If MEAL, decrease hunger
					// If SNACK, decrease hunger, increase happiness, increase weight, increase sickness change?
					// Switch back to "main" animation + status + poo
				},
				buttonC: () => {
					// Cancel menu
					// Clear canvas, show "main" animation + status + poo
				}
			}, { // SNACK
				drawItems: [
				{ // MEAL
					srcX: 530, 
					srcY: 200,
					spriteWidth: 180,
					spriteHeight: 64,
					destX: 57,
					destY: 0,
					destWidth: 180/this.spriteScale,
					destHeight: 64/this.spriteScale
				}, { // SNACK
					srcX: 330, 
					srcY: 200,
					spriteWidth: 199,
					spriteHeight: 64,
					destX: 57,
					destY: 50,
					destWidth: 180/this.spriteScale,
					destHeight: 64/this.spriteScale
				} ,{ // ARROW DOWN
					srcX: 850, 
					srcY: 0,
					spriteWidth: 64,
					spriteHeight: 64,
					destX: 5,
					destY: 50,
					destWidth: 64/1.4,
					destHeight: 64/1.4
				}], 
				// SNACK ACTIONS
				buttonA: () => {
					// Move arrow between Meal and Snack
				  //  menuList[0].screens[0].drawItems
				   
				},
				buttonB: () => {
					this.triggerActionFeed(false)
					// Clear canvas
					// Start feeding animation for Meal or Snack
					// If MEAL, decrease hunger
					// If SNACK, decrease hunger, increase happiness, increase weight, increase sickness change?
					// Switch back to "main" animation + status + poo
				},
				buttonC: () => {
					// Cancel menu
					// Clear canvas, show "main" animation + status + poo
				}
			}]
		}, { // Lights
			id: 1, 
			screens: [{
				drawItems: [], // ON / OFF
				buttonA: () => {
					// Move arrow between On and Off
				},
				buttonB: () => {
					// If OFF, change to either black screen or black screen with Zzz
					// If ON, turn screen back 'on', show tama + statuses + poo
				},
				buttonC: () => {
					// Cancel menu
					// Clear canvas, show "main" animation + status + poo
				}
			}]
		}, { // Play
			id: 2, 
			screens: [{
				drawItems: [], // Hearts
				buttonA: () => {
					// move to next screen 
				},
				buttonB: () => {
				   // move to next screen 
				},
				buttonC: () => {
					// Move to next screen
				}
			}, {
			drawItems: [], // game-waiting animation + random number
			buttonA: () => {
				// checkAnswer with higher guess
				// checkAnswer shows win or fail screen + updates happiness if win
			},
			buttonB: () => {
				// checkAnswer with higher guess
				// checkAnswer shows win or fail screen + updates happiness if win
			},
			buttonC: () => {
				// cancels game
				// clear canvas, show 'main' tama + statuses + poo
			}
		}]
		}, { // Medicine
			id: 3, 
			screens: [{ // Show angry animation (same as discipline)
				callback: () => {
					// check if sick... 
						// if yes then 
							// increase needle count
							// if needle count = 2, remove sick status
							// show angry animation
						// if no, 
							// show no animation
				},
				buttonC: () => {
					// skip angry animation
					// Clear canvas, show "main" animation + status + poo
				}
			}]
		},{ // Bath
			id: 4, 
			screens: [{
				drawItems: [], // Bath animation
				callback: () => {
					// remove any poo status
				},
				buttonA: () => {
					// Clear canvas, show "main" animation + status + poo
				},
				buttonB: () => {
					//Clear canvas, show "main" animation + status + poo
				},
				buttonC: () => {
					// Cancel menu
					// Clear canvas, show "main" animation + status + poo
				}
			}]
		}, { // Scale
			id: 5, 
			screens: [{
				drawItems: [], // scale + weight menu
				buttonA: () => {
					// cycle through scale menus (weight + age, hunger, happiness)
				},
				buttonB: () => {
					// cycle through scale menus (weight + age, hunger, happiness)
				},
				buttonC: () => {
					// Cancel menu
					// Clear canvas, show "main" animation + status + poo
				}
			}, {
				drawItems: [], // hunger + hearts
				callback: () => {
					// determine how many full hearts to show then draw items
				},
				buttonA: () => {
					// cycle through scale menus (weight + age, hunger, happiness)
				},
				buttonB: () => {
					// cycle through scale menus (weight + age, hunger, happiness)
				},
				buttonC: () => {
					// Cancel menu
					// Clear canvas, show "main" animation + status + poo
				}
			},{
				drawItems: [], // happiness + hearts
				callback: () => {
					// determine how many full hearts to show then draw items
				},
				buttonA: () => {
					// cycle through scale menus (weight + age, hunger, happiness)
				},
				buttonB: () => {
					// cycle through scale menus (weight + age, hunger, happiness)
				},
				buttonC: () => {
					// Cancel menu
					// Clear canvas, show "main" animation + status + poo
				}
			}]
		}, { // Discipline
			id: 6, 
			screens: [{
				drawItems: [], // scolding animation
				callback: () => {
					// If chirped for attention, dim "alert" icon   
				},
				buttonA: () => {
					// Clear canvas, show "main" animation + status + poo
				},
				buttonB: () => {
					// Clear canvas, show "main" animation + status + poo
				},
				buttonC: () => {
					// Clear canvas, show "main" animation + status + poo
				}
			}]
		}, { // Set Time
			id: 7,
			screens: [{ // Since you can't hold 2 buttons down to "Set time", i might just show local time
				drawItems: [],  // {AM/PM}, {time HH:mm ss}, {>>>>/SET}
				callback: () => { 
					// get time and update frames?
				},
				buttonA: () => {
					// set hour/AMPM  or nothing
				},
				buttonB: () => {
					// set minute or hide clock
				},
				buttonC: () => {
					// confirm time/ nothing
				}
			}]
		}
	]

	constructor() {}
	// Draws menu based on params from app.component
	// drawMenu(ctx: CanvasRenderingContext2D | null, menuSprites: menuContextParams[]) {
	// 	clearCanvas(this.ctx?)
	// 	menuSprites.forEach(x => {
	// 		this.ctx?.drawImage(this.spritesheet, 
	// 			x.srcX, 
	// 			x.srcY, 
	// 			x.spriteWidth, 
	// 			x.spriteHeight, 
	// 			x.destX, 
	// 			x.destY, 
	// 			x.destWidth, 
	// 			x.destHeight);
	// 	})
	// }

	getMenuIcons() {
		return this.menuIcons
	}

	getActiveMenuIconIdx() {
		return this.currentMenu.menuId;
	}

	// Sets boolean on icon obj that will highlight icon when active, sets current screen var
	setActiveMenuIconByIdx(idx: number, isActive: boolean) {
		this.menuIcons[idx].isActive = isActive;

		if(isActive) {
			this.currentMenu = { menuId: idx, screenIdx: 0, frameIdx: 0};
		} else {
			this.currentMenu = { menuId: -1, screenIdx: -1, frameIdx: -1};
		}
	}

	getMenuByIdx(idx:number) {
		return this.menus[idx]
	}

	getCurrentMenu() { 
		return this.currentMenu;
	}

	setCurrentMenu(obj: openMenuObj) {
		this.currentMenu = obj;
	}

	cycleMenuScreens() {
		let curMenu = this.menus[this.currentMenu.menuId];
		this.currentMenu.screenIdx++;

		if(this.currentMenu.screenIdx >= curMenu.screens.length) {
			this.currentMenu.screenIdx = 0;
		}

		let curScreen = curMenu.screens[this.currentMenu.screenIdx];
	//	this.screen.drawMenu(curScreen.drawItems!);
	}

	triggerActionFeed(isMeal: boolean = true) {
		// Check if hungry...
		// YES ... 
		// Clear canvas
		// Start feeding animation for Meal or Snack
		// If MEAL, decrease hunger
		// If SNACK, decrease hunger, increase happiness, increase weight, increase sickness change?
		// Switch back to "main" animation + status + poo
	
		// NO ...
		// Show no animation
	}
}

// menuId = -1 means no open menu
export interface openMenuObj {
	menuId: number,
	screenIdx: number,
	frameIdx: number
}
