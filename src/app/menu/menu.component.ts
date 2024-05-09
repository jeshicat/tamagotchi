import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { menuNavItems } from '../menu_icon_map';
import { CANVAS_SIZE } from '../../helper';

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

	@ViewChild('canvas_nav', {static: true}) navCanvas! : ElementRef; 
	canvas_menu:HTMLCanvasElement | null = null;
	ctx_menu: CanvasRenderingContext2D | null = null;
	private navSpritesheet:HTMLImageElement = new Image();

	menu_icon_size = 21; // size of icon on sprite
	menu_icon_scale_size = 30; // used to scale icon size

	constructor() {  } // service to populate icon object?
		
	ngOnInit() : void {
		const self = this

		this.canvas_menu = this.navCanvas.nativeElement;
		this.canvas_menu!.width = CANVAS_SIZE.WIDTH;
		this.canvas_menu!.height = CANVAS_SIZE.HEIGHT;

		this.ctx_menu = this.canvas_menu!.getContext('2d');
		
		this.navSpritesheet.src = 'assets/menu-icons.svg'
	 	this.navSpritesheet.onload = function () {
			self.redrawMenuIcons();
		} 

		
	} // end of OnInit

	// Redraw menu icons with all unactive
	redrawMenuIcons() {
    this.ctx_menu!.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);

			menuNavItems.forEach(e => {
				let srcY = e.isTop ? 0 : this.menu_icon_size;
				
				this.ctx_menu!.drawImage(
					this.navSpritesheet, 
					e.position * this.menu_icon_size,  // srcX
					e.isActive ? (this.menu_icon_size*2)+srcY : srcY, // srcY
					this.menu_icon_size, 
					this.menu_icon_size, 
					e.destX,  // destX 
					e.destY,  // destY 
					this.menu_icon_scale_size, 
					this.menu_icon_scale_size
				);    
			});
		}
		
} // end of class MenuComponent


