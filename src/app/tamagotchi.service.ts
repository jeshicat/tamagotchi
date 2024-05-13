import { Injectable } from '@angular/core';
import { MyTamagotchi } from './interfaces/tamagotchi';
import { randomInt } from '../helper';

@Injectable({
  providedIn: 'root'
})

export class TamagotchiService {
	myTama: MyTamagotchi;

	constructor() {
		this.myTama = this.createNewLife()
	}

	createNewLife() {
		return {
			id: 0,
			tamaId: 0,
			type: 0,
			age: 0,
			birthDate: new Date(),
			happiness: 0,
			hunger: 0,
			discipline: 0,
			poopCount: 0,
			isSick: false,
			sickCount: 0,
			careMistakes: 0,
			disciplineMistakes: 0,
			lifespan: 25
		} 
	}

	addCareMistakes() {
		this.myTama.careMistakes++;
	}
}
