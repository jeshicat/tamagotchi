import { Injectable, inject } from '@angular/core';
import { menu, menuNavItem as menuIcons, spriteMenuData } from '../interfaces/menu_icon_map';
import { TamagotchiService } from '../tamagotchi.service';
@Injectable({
	providedIn: 'root'
})

export class MenuService {
	TamaService = inject(TamagotchiService);
	
	openMenuScreen: menu | null = null; // currently opened menu

	protected currentMenu: openMenuIdxs = {
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
				buttonB: () => {
					this.triggerActionFeed(true)
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
				buttonB: () => {
					this.triggerActionFeed(false)
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
	
	getMenuIcons(): menuIcons[] {
		return this.menuIcons
	}

	getActiveMenuIconIdx(): number {
		return this.currentMenu.menuId;
	}

	// Sets boolean on icon obj that will highlight icon when active, sets current screen var
	setActiveMenuIconByIdx(idx: number, isActive: boolean): void {
		this.menuIcons[idx].isActive = isActive;

		if(isActive) {
			this.currentMenu = { menuId: idx, screenIdx: 0, frameIdx: 0};
		} else {
			this.currentMenu = { menuId: -1, screenIdx: -1, frameIdx: -1};
		}
	}

	// gets current menu obj
	getMenuByIdx(idx:number): menu {
		return this.menus[idx]
	}

	// gets current menu, screen and frame idxs
	getCurrentMenuIdxs(): openMenuIdxs { 
		return this.currentMenu;
	}

	setCurrentMenuIdxs(obj: openMenuIdxs) {
		this.currentMenu = obj;
	}

	getMenuScreen(): spriteMenuData {
		const screen = this.menus[this.currentMenu.menuId].screens[this.currentMenu.screenIdx]
		return screen
	}

	cycleMenuScreens(callback: Function) {
		let curMenu = this.menus[this.currentMenu.menuId];
		this.currentMenu.screenIdx++;

		if(this.currentMenu.screenIdx >= curMenu.screens.length) {
			this.currentMenu.screenIdx = 0;
		}

		let curScreen = curMenu.screens[this.currentMenu.screenIdx];
	//	this.screen.drawMenu(curScreen.drawItems!);
		callback(curScreen.drawItems!);
	}

	triggerActionFeed(isMeal: boolean = true) {
		this.openMenuScreen = null;
		let hunger = this.TamaService.hungerCount.getValue();
		if(hunger < this.TamaService.maxHunger) {
			if (isMeal){
				this.TamaService.increaseHunger();
				this.TamaService.myTama.weight++;
				// burger animation
				this.TamaService.updateAction("eat", "meal");
			} else if(!isMeal) {
				this.TamaService.increaseHunger();
				this.TamaService.myTama.happiness++;
				this.TamaService.myTama.weight+=2; // adds additional 1lb
				// cake animation

				this.TamaService.updateAction("eat", "snack");
			}
	 	} else {
			// shake head no animation because not hungry
			this.TamaService.updateAction("no", isMeal ? "meal_full" : "snack_full");
		}
		
		console.log("hunger: " + this.TamaService.hungerCount.getValue())
		
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
export interface openMenuIdxs {
	menuId: number,
	screenIdx: number,
	frameIdx: number
}
