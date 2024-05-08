export interface MyTamagotchi {
    tamaId: number,
    type: number,
    birthDate: Date, // or age? days and hrs
    happiness: number,
    hunger: number,
    isDirty: boolean,
    isSick: boolean,
    sickCount: number,
    careMistakes: number,
    disciplineMistakes: number,
    isDying: boolean
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