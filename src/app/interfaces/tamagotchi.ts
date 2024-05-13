export interface MyTamagotchi {
    id: number,
    tamaId: number,
    type: number,
    birthDate?: Date,
    age: number, // or age? days and hrs
    happiness: number,
    hunger: number,
    discipline: number,
    poopCount: number,
    isSick: boolean,
    sickCount: number,
    careMistakes: number,
    disciplineMistakes: number,
    lifespan: number
}

export interface Tamagotchi {
    id: number,
    stage: string,
    name: string,
    sprite: string,
    evolutions?: EvolveConditions[]
}

export interface SpriteCoordinates {
    x: number,
    y: number
}

export interface EvolveConditions {
    careMistakes?: number[],
    disciplineMistakes?: number[],
    tamaId: number,
    type?: number
}

export interface Stage {
    id: string,
    minutesToEvolve: number[],
    tamaIds: number[],
    nextStageId?: string
}