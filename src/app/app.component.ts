import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ScreenComponent } from './screen/screen.component';
import { MenuService} from './menu/menu.service';
import { menu as iMenu } from './interfaces/menu_icon_map';

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
	@ViewChild('menu') menu_com!: MenuComponent;
	@ViewChild('screen') screen_com!: ScreenComponent;
	MenuServ: MenuService = inject(MenuService);

	openMenuScreen: iMenu | null = null; // currently opened menu

	constructor() { }

	// BUTTON A Actions
	selectMenu() {
		// cycle through menu options
		// Get current open menu 

		// if no menu open, cycle through menu options
		if(this.openMenuScreen === null) {
			let idx = this.MenuServ.getActiveMenuIconIdx();
			let menuNavIcons = this.MenuServ.getMenuIcons();
			
			if(idx > -1) this.MenuServ.setActiveMenuIconByIdx(idx, false)

			idx++;

			// resets index if reach end of icons
			if(idx === menuNavIcons.length) {
				idx = 0;
			}

			// sets new icon to be highlighted
			this.MenuServ.setActiveMenuIconByIdx(idx, true)
			this.menu_com.redrawMenuIcons()
			
		} else {
			// go through options in menu / play game
			// Get next screen for menu?
			let menuIdxs = this.MenuServ.getCurrentMenu();
			
			menuIdxs.screenIdx++;

			if(menuIdxs.screenIdx >= this.openMenuScreen.screens.length) {
				menuIdxs.screenIdx = 0;
			}

			let curScreen = this.openMenuScreen.screens[menuIdxs.screenIdx];
			this.MenuServ.setCurrentMenu(menuIdxs);
			this.screen_com.drawMenu(curScreen.drawItems!);
		}
	}

	confirmMenu() { 
		// confirm / execute action

		let idx = this.MenuServ.getActiveMenuIconIdx()
		
		// If noMenu, trigger action or open menu for selected icon
		if(this.openMenuScreen === null && idx > -1) { 
			this.openMenuScreen = this.MenuServ.getMenuByIdx(idx)

			// draw menu frames if has
			if(this.openMenuScreen!.screens[0].drawItems) {
				// clear screen canvas and stop animation
				this.screen_com.clearCanvasStopAnimation()

				this.openMenuScreen!.screens[0].drawItems.forEach(e => {
					this.screen_com.drawMenu(this.openMenuScreen!.screens[0].drawItems!)
				});
			}

			// call callback function if has
			if(this.openMenuScreen!.screens[0].callback) this.openMenuScreen!.screens[0].callback()
		} else if (this.openMenuScreen !== null) { // Menu is open, do actionB from menu object

		} else {
			// show time
			alert("time")
		}
	}

	cancelMenu() {
		// back to main menu / cancel
		if(this.openMenuScreen !== null) {
			this.screen_com.clearCanvasStopAnimation();
			this.openMenuScreen = null;
			this.screen_com.drawScreenAnimation(); // reshow tamagotchi
		} else {
			this.menu_com.clearMenuIcons();
		}
	}

}
