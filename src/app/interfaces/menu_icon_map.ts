// Top 4 and bottom 4 nav icons
export interface menuNavItem {
    id: string,
    isTop: boolean,
    position: number,
    destX : number, 
    destY: number,
    isActive: boolean
}

// Menus shown when icons pressed
export interface menu {
    id: number,
    screens: spriteMenuData[] // array of screens in menu + their actions,
}

// buttonA, buttonB, buttonC > function that happens when button pressed
export interface spriteMenuData {    
    drawItems?: menuContextParams[] // what to draw on the canvas
    callback?: Function, // play to generate random num, medicine, bath
    buttonA?: Function, // select button click
    buttonB?: Function, // confirm button click
    buttonC?: Function  // cancel button click
}

export interface menuContextParams {
    srcX: number, 
    srcY: number,
    spriteWidth: number,
    spriteHeight: number,
    destX: number,
    destY: number,
    destWidth: number,
    destHeight: number
}