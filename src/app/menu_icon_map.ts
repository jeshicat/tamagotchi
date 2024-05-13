// Top 4 and bottom 4 nav icons
interface menuNavItem {
    id: string,
    isTop: boolean,
    position: number,
    destX : number, 
    destY: number,
    isActive: boolean
}

// Menus shown when icons pressed
interface menu {
    id: number,
    screens: spriteMenuData[], // array of screens in menu + their actions
}

// buttonA, buttonB, buttonC > function that happens when button pressed
interface spriteMenuData {    
    drawItems: contextParams[] // what to draw on the canvas
    callback?: Function, // play to generate random num, medicine, bath
    buttonA: Function, // select button click
    buttonB: Function, // confirm button click
    buttonC: Function  // cancel button click
}

interface contextParams {
    srcX: number, 
    srcY: number,
    spriteWidth: number,
    spriteHeight: number,
    destX: number,
    destY: number,
    destWidth: number,
    destHeight: number
}

export const menuNavItems: menuNavItem[] = [
    {
        id: 'feed',
        isTop:true,
        position: 0,
        destX: 45, 
        destY: 20, 
        isActive: false
    },
    {
        id: 'lights',
        isTop: true,
        position: 1,
        destX: 113, 
        destY: 20,
        isActive: false
    },
    {
        id: 'play',
        isTop:true,
        position: 2,
        destX: 190, 
        destY: 20,
        isActive: false
    },
    {
        id: 'medicine',
        isTop: true,
        position: 3,
        destX: 261, 
        destY: 20,
        isActive: false
    },
    {
        id: 'bath',
        isTop:false,
        position: 0,
        destX: 41, 
        destY: 251,
        isActive: false
    },
    {
        id: 'scale',
        isTop: false,
        position: 1,
        destX: 109, 
        destY: 251,
        isActive: false
    },
    {
        id: 'discipline',
        isTop:false,
        position: 2,
        destX: 180, 
        destY: 252,
        isActive: false
    },
    {
        id: 'alert',
        isTop: false,
        position: 3,
        destX: 253, 
        destY: 255,
        isActive: false
    }
];

export const menuList: menu[] = [
    { // Feed
        id: 0, 
        screens: [{
            drawItems: [{srcX: 0, 
                srcY: 0,
                spriteWidth: 64,
                spriteHeight: 64,
                destX: 0,
                destY: 100,
                destWidth: 64,
                destHeight: 64},
                {srcX: 64, 
                    srcY: 0,
                    spriteWidth: 64,
                    spriteHeight: 64,
                    destX: 0,
                    destY: 100,
                    destWidth: 64,
                    destHeight: 64},
                    {srcX: 128, 
                        srcY: 0,
                        spriteWidth: 64,
                        spriteHeight: 64,
                        destX: 0,
                        destY: 100,
                        destWidth: 64,
                        destHeight: 64},
                        {srcX: 256, 
                            srcY: 0,
                            spriteWidth: 64,
                            spriteHeight: 65,
                            destX: 0,
                            destY: 100,
                            destWidth: 64,
                            destHeight: 64}], // MEAL / SNACK
            buttonA: () => {
                // Move arrow between Meal and Snack
            },
            buttonB: () => {
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
        screens: [{
            drawItems: [], // Needle animation
            callback: () => {
                // increase needle count
                // if needle count = 2, remove sick status
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