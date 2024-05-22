import { Component, ViewChild, ElementRef, OnInit, inject } from '@angular/core';
import { CANVAS_SIZE, clearCanvas } from '../../helper';
import { MenuService } from './menu.service';

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})

export class MenuComponent implements OnInit {

	@ViewChild('canvas_nav', {static: true}) navCanvas! : ElementRef; 
	canvas_menu:HTMLCanvasElement | null;
	ctx_menu: CanvasRenderingContext2D | null;
	private navSpritesheet:HTMLImageElement = new Image();

	menu_icon_size = 21; // size of icon on sprite
	menu_icon_scale_size = 23; // used to scale icon size
	
	MenuServ: MenuService = inject(MenuService);

	constructor() {  
		this.canvas_menu = null;
		this.ctx_menu = null;

	} // service to populate icon object?
		
	ngOnInit() : void {
		this.canvas_menu = this.navCanvas.nativeElement;
		this.initCanvasContext();

		this.canvas_menu!.width = CANVAS_SIZE.WIDTH;
		this.canvas_menu!.height = CANVAS_SIZE.HEIGHT;
		
		this.navSpritesheet.src = 'assets/menu-icons.svg'
	 	this.navSpritesheet.onload = () => {
			this.redrawMenuIcons();
		} 
	} // end of OnInit

	// Redraw menu icons with all unactive
	redrawMenuIcons() {
		clearCanvas(this.ctx_menu)

		this.MenuServ.getMenuIcons().forEach(e => {
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

	clearMenuIcons() {
		let idx = this.MenuServ.getActiveMenuIconIdx();
		if(idx > -1) {
			this.MenuServ.setActiveMenuIconByIdx(idx, false)
			this.redrawMenuIcons();
		}
	}

	initCanvasContext() {
		this.ctx_menu = this.canvas_menu!.getContext('2d');
	}

	clearCanvasContext() {
		this.ctx_menu = null;
	}
		
} // end of class MenuComponent


