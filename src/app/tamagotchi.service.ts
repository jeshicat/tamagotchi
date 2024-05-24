import { Injectable, signal } from '@angular/core';
import { MyTamagotchi } from './interfaces/tamagotchi';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TamagotchiService {
	myTama: MyTamagotchi;

	action: iAction = {
		main: "default", 
		status: [],
		add_ons: []
	}
	actionSubject = new BehaviorSubject<iAction>(this.action);

	alert: iAlert = { alert: false }
	alertSubject = new BehaviorSubject<iAlert>(this.alert)

	poopCount = new BehaviorSubject<number>(0);
	hungerCount = new BehaviorSubject<number>(0);
	happyCount  = new BehaviorSubject<number>(0);
	disciplineCount = new BehaviorSubject<number>(0);

	maxPoop = 4;
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

	getActionSubject() {
		return this.actionSubject.getValue()
	}

	updateAction(main: string, add_on?: string) {
		const current = this.actionSubject.getValue()

		const updated: iAction = {
			...current,
			main: main,
			add_ons: []
		}

		if(add_on) updated.add_ons.push(add_on)
		this.actionSubject.next(updated)
	}

	addActionStatus(status: string) {
		const current = this.actionSubject.getValue()
		const updated: iAction = { ...current }
		updated.status.push(status)

		this.actionSubject.next(updated)
	}

	clearActionStatus(status: string) {
		const current = this.actionSubject.getValue()

		const updated: iAction = { 
			...current,
			status: current.status.filter(e => e !== status)
		}

		this.actionSubject.next(updated)
	}

	increaseHunger() {
		let count = this.hungerCount.getValue();
		this.hungerCount.next(++count);
	}

	decreaseHunger() {
		let count = this.hungerCount.getValue();
		this.hungerCount.next(--count);
	}
}

interface iAction {
	main: string,
	add_ons: string[],
	status: string[]
}

interface iAlert {
	alert: boolean,
	alertTime?: Date
}