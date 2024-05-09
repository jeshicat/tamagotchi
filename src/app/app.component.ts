import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ScreenComponent } from './screen/screen.component';
import { menuNavItems } from './menu_icon_map';

import { randomInt } from '../helper';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, MenuComponent, ScreenComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})

export class AppComponent {
	title = 'tamagotchi';
	private menu: MenuComponent;
	constructor() {
		this.menu = new MenuComponent();
	}

	// BUTTON A Actions
	selectMenu() {
		// cycle through menu options
		//alert("select")
		// Get current open menu 

		let noMenu = true;
		// if no menu open, cycle through menu options
		if(noMenu) {
			let index = menuNavItems.map(e => e.isActive).indexOf(true);
			
			if(index > -1) menuNavItems[index].isActive = false;

			index++;

			// resets index if reach end of icons
			if(index === menuNavItems.length) {
				index = 0;
			}

			// sets new icon to be highlighted
			menuNavItems[index].isActive = true;

			this.menu.redrawMenuIcons()
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
