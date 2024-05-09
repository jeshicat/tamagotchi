import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { menuNavItems } from '../menu_icon_map';
import { clearCanvas, CANVAS_SIZE } from '../../helper';

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

	@ViewChild('canvas_nav', {static: true}) navCanvas! : ElementRef; 
	ctx: CanvasRenderingContext2D | null = null;
	private navSpritesheet:HTMLImageElement = new Image();

	menu_icon_size = 21; // size of icon on sprite
	menu_icon_scale_size = 30; // used to scale icon size

	constructor() {  } // service to populate icon object?
		
	ngOnInit() : void {
		const self = this

		const canvas: HTMLCanvasElement = this.navCanvas.nativeElement
		canvas.width = CANVAS_SIZE.WIDTH;
		canvas.height = CANVAS_SIZE.HEIGHT;

		this.ctx = canvas.getContext('2d');
		
		this.navSpritesheet.src = 'assets/menu-icons.svg'
	 	this.navSpritesheet.onload = function () {
			self.redrawMenuIcons();
		} 
	} // end of OnInit

	// Redraw menu icons with all unactive
	redrawMenuIcons() {
		clearCanvas(this.ctx);

			menuNavItems.forEach(e => {
				let srcY = e.isTop ? 0 : this.menu_icon_size;
				this.ctx?.drawImage(this.navSpritesheet, 
					e.position * this.menu_icon_size,  // srcX
					!e.isActive ? srcY : (this.menu_icon_size*2)+srcY, // srcY
					this.menu_icon_size, 
					this.menu_icon_size, 
					e.destX,  // destX 
					e.destY,  // destY 
					this.menu_icon_scale_size, 
					this.menu_icon_scale_size);    
			});
		}
} // end of class MenuComponent


