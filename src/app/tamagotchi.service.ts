import { Injectable, signal } from '@angular/core';
import { MyTamagotchi } from './interfaces/tamagotchi';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TamagotchiService {
	myTama: MyTamagotchi;

	actionSubject = new BehaviorSubject("default");

	maxHunger = 4;
	maxHappiness = 4;
	maxDiscipline = 100;


	constructor() {
		this.myTama = this.createNewLife()
	}

	createNewLife() {
		return {
			id: 0,
			tamaId: 0,
			type: 0,
			age: 0,
			weight: 5,
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

	// getTamaAnimation(): string {
	// 	return this.tamaAnimation()
	// }

	// updateTamaAnimationStatus(action: string) {
	// 	this.tamaAnimation.set(action)
	// }

	addCareMistakes() {
		this.myTama.careMistakes++;
	}
}
