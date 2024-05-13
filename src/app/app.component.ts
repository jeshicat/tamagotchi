import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ScreenComponent } from './screen/screen.component';
import { menuList, menuNavItems, menu } from './interfaces/menu_icon_map';

import { clearCanvas, randomInt } from '../helper';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, MenuComponent, ScreenComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})

export class AppComponent {
	title = 'tamagotchi';
	@ViewChild('menu') menu!: MenuComponent;
	@ViewChild('screen') screen!: ScreenComponent;
	
	activeIdx:number = -1; // which icon is selected on nav menu
	currentMenu: menu | null = null; // currently opened menu

	constructor() { }

	// BUTTON A Actions
	selectMenu() {
		// cycle through menu options
		//alert("select")
		// Get current open menu 

		// if no menu open, cycle through menu options
		if(this.currentMenu === null) {
			this.activeIdx = this.menu.getActiveMenuIdx();
			
			if(this.activeIdx > -1) menuNavItems[this.activeIdx].isActive = false;

			this.activeIdx++;

			// resets index if reach end of icons
			if(this.activeIdx === menuNavItems.length) {
				this.activeIdx = 0;
			}

			// sets new icon to be highlighted
			menuNavItems[this.activeIdx].isActive = true;

			this.menu.redrawMenuIcons()
		} else {
			// go through options in menu / play game
		}
	}

	confirmMenu() {
		// confirm / execute action
		
		if(this.currentMenu === null) { // If noMenu, trigger action or open menu for selected icon
			this.currentMenu = menuList[this.activeIdx]

			// clear screen canvas and stop animation
			this.screen.clearCanvasStopAnimation()
			
			// draw menu frames
			this.currentMenu!.screens[0].drawItems.forEach(e => {
			this.screen.drawMenu(this.currentMenu!.screens[0].drawItems)
			});
		} else { // do actionB from menu object

		}
	}

	cancelMenu() {
		// back to main menu / cancel
		if(this.currentMenu !== null) {
			this.screen.clearCanvasStopAnimation();
			this.currentMenu = null;
		} else {
			this.menu.clearMenuIcons();
		}
	}

}
