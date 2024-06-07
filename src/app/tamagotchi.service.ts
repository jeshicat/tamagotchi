import { Injectable, signal } from '@angular/core';
import { MyTamagotchi, Stage, Tamagotchi } from './interfaces/tamagotchi';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, randomInt } from '../helper';
import { LocalStorageService } from './local-storage.service';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class TamagotchiService {

	private MIN_TO_MILLISECOND = 60000;

	protected stages: Stage[] = 
    [{
      id: "egg",
      minutesToEvolve: [5],
      tamaIds: [0],
      nextStageId: "baby"
    },
    {
      id: "baby",
      minutesToEvolve: [55],
      tamaIds: [1],
      nextStageId: "child"
    }, 
    {
      id: "child",
      minutesToEvolve: [1440, 4320],
      tamaIds: [2],
      nextStageId: "teen"
    }, 
    {
      id: "teen",
      minutesToEvolve: [1440, 4320],
      tamaIds: [3, 4],
      nextStageId: "adult"
    }, 
    {
      id: "adult",
      minutesToEvolve: [1440, 4320],
      tamaIds: [5, 6, 7, 8, 9, 10],
      nextStageId: "special"
    }, 
    {
      id: "special",
      minutesToEvolve: [],
      tamaIds: [11, 12]
    }];
  
    protected tamagotchiList: Tamagotchi[] =[{
        id: 0,
        stage: "egg",
        name: "Egg",
        sleepTime: 0,
        wakeTime: 0,
        evolutions: [{tamaId: 1}]
      },
      {
        id: 1,
        stage: "baby",
        name: "Shirobabytchi",
        sleepTime: 20,
        wakeTime: 9,
        evolutions: [{tamaId: 2}],
        
      },
      {
        id: 2,
        stage: "child",
        name: "Tonmarutchi",
        sleepTime: 20,
        wakeTime: 9,
        evolutions: [
          {
            careMistakes: [0,2],
            disciplineMistakes: [0,1],
            tamaId: 3,
            type: 1
          },
          {
            careMistakes: [0,2],
            disciplineMistakes: [2],
            tamaId: 3,
            type: 2
          },
          {
            careMistakes: [3],
            disciplineMistakes: [0,1],
            tamaId: 4,
            type: 1
          },
          {
            careMistakes: [3],
            disciplineMistakes: [2],
            tamaId: 4,
            type: 2
          }
        ],
      },
      {
        id: 3,
        stage: "teen",
        name: "Tongaritchi",
        sleepTime: 21,
        wakeTime: 9,
        evolutions: [{ 
            careMistakes: [0,2],
            disciplineMistakes: [0],
            tamaId: 5,
            type: 1
          },
          {
            careMistakes: [0,2],
            disciplineMistakes: [1],
            tamaId: 6,
            type: 1
          },
          { 
            careMistakes: [0,2],
            disciplineMistakes: [2],
            tamaId: 7,
            type: 1
          },
          {
            careMistakes: [0-3],
            disciplineMistakes: [2],
            tamaId: 7,
            type: 2
          }, 
          { 
            careMistakes: [3],
            disciplineMistakes: [0, 1],
            tamaId: 8,
            type: 1
          },
          {
            careMistakes: [3],
            disciplineMistakes: [2,3],
            tamaId: 9,
            type: 1
          },
          { 
            careMistakes: [4],
            disciplineMistakes: [0, 7],
            tamaId: 9,
            type: 2
          },
          { 
            careMistakes: [3],
            disciplineMistakes: [4],
            tamaId: 10,
            type: 1
          },
          {
            careMistakes: [4],
            disciplineMistakes: [8],
            tamaId: 10,
            type: 2
          }]
      },
      {
        id: 4,
        stage: "teen",
        name: "Hashitamatchi",
        sleepTime: 21,
        wakeTime: 9,
        evolutions: [{
            careMistakes: [0,2],
            disciplineMistakes: [0,1],
            tamaId: 8,
            type: 1
          },{
            careMistakes: [0,2],
            disciplineMistakes: [0],
            tamaId: 8,
            type: 2
          },{
            careMistakes: [3],
            disciplineMistakes: [0,3],
            tamaId: 9,
            type: 1
          },{
            careMistakes: [3],
            disciplineMistakes: [0,5],
            tamaId: 9,
            type: 2
          },{
            careMistakes: [3],
            disciplineMistakes: [4],
            tamaId: 10,
            type: 1
          },{
            careMistakes: [3],
            disciplineMistakes: [6],
            tamaId: 10,
            type: 2
          }]
      },
      {
        id: 5,
        stage: "adult",
        name: "Mimitchi",
        sleepTime: 22,
        wakeTime: 9,
        evolutions: []
      },
      {
        id: 6,
        stage: "adult",
        name: "Pochitchi",
        sleepTime: 22,
        wakeTime: 9,
        evolutions: []
      },
      {
        id: 7,
        stage: "adult",
        name: "Zuccitchi",
        sleepTime: 23,
        wakeTime: 11,
        evolutions: [{
          careMistakes: [0,5],
          disciplineMistakes: [0],
          tamaId: 11
          // age 9-10 (4 days after Zuccitchi obtained)
        }]
      },
      {
        id: 8,
        stage: "adult",
        name: "Hashizoutchi",
        sleepTime: 22,
        wakeTime: 9,
        evolutions: []
      },
      {
        id: 9,
        stage: "adult",
        name: "Kusatchi",
        sleepTime: 22,
        wakeTime: 9,
        evolutions: []
      },
      {
        id: 10,
        stage: "adult",
        name: "Takotchi",
        sleepTime: 22,
        wakeTime: 10,
        evolutions: []
      },
      {
        id: 11,
        stage: "special",
        name: "???",
        sleepTime: 22,
        wakeTime: 9,
        evolutions: []
      }];
  
	//myTama: MyTamagotchi;

	action: iAction = {
		main: "default", // add secondary main ? for when sick? or sleeping?
		status: [],
		add_ons: []
	}
	actionSubject = new BehaviorSubject<iAction>(this.action);

	alert: iAlert = { alert: false }
	alertSubject = new BehaviorSubject<iAlert>(this.alert)

	private isSleeping: boolean = false;
	isSleepingSubject = new BehaviorSubject(this.isSleeping)

	poopCount = new BehaviorSubject<number>(0);
	hungerCount = new BehaviorSubject<number>(0);
	happinessCount  = new BehaviorSubject<number>(0);
	disciplineCount = new BehaviorSubject<number>(0);

	maxPoop = 4;
	maxHunger = 4;
	maxHappiness = 4;
	maxDiscipline = 100;


	constructor() {

		// If tamagotchi isn't saved in local storage create a new one
		if(localStorage.getItem("myTama") === null || localStorage.getItem("myTama") === undefined) {
			this.initNewLife()
		} else {
			this.setEvolutionTimer() 
			this.setSleepTimer(false, undefined);
		}

		this.isSleepingSubject.subscribe({next: (putToSleep) => {
			const tama = this.getTamagotchiDetails();
			if(tama === undefined || tama?.sleepTime === 0) return // will need to update this to set interval when it hatches?
			
			if(putToSleep) {
				this.updateAction("sleep", "zzz")
			} else {
				let myTama = this.getMyTamagotchi()
				myTama.age++;
				this.updateMyTamagotchi(myTama);
				this.updateAction("default") // do i need to add statuses?
			}

			this.setSleepTimer(putToSleep, tama);
			// fix this code... 
		// trigger if wake up .. age+1, start settimeout/interval for upcoming bed time
		// trigger if going to sleep... change animation to sleeping... start settimeout/interal for wake up
			
		}});
	}

	setSleepTimer(putToSleep: boolean, tama: Tamagotchi | undefined) : void {
		if(tama === undefined){
			tama = this.getTamagotchiDetails();
			if(tama === undefined || tama?.sleepTime === 0) return;
		}
	
		let d = new Date()
		let sDate = (putToSleep ? d.getDate()+1 : d.getDate())
		let sTime = (putToSleep ? tama?.wakeTime : tama?.sleepTime);
		let newMills = new Date(d.getFullYear(), d.getMonth(), sDate, sTime, 0, 0, 0);
		
		let diffMills =  newMills.getTime() - Date.now();
		console.log(`${putToSleep ? "wake up in.." : "bed time in.."} ${diffMills}`)
	
		setTimeout(() =>{
			this.isSleepingSubject.next(!this.isSleepingSubject.getValue());
		}, diffMills);
	}

	getMyTamagotchi() : MyTamagotchi {
		let myTamaStr = localStorage.getItem("myTama");
		if(myTamaStr !== null) {
			return <MyTamagotchi>JSON.parse(myTamaStr!)
		} else {
			return this.getNewTamagotchi()
		}
	}

	updateMyTamagotchi(myTama: MyTamagotchi) {
		localStorage.setItem("myTama", JSON.stringify(myTama));
	}

	getTamagotchiDetails() : Tamagotchi | undefined {
		let myTama = this.getMyTamagotchi();
		if(myTama) {
			return this.tamagotchiList.find((x) => {return x.id === myTama.tamaId});
		} else { 
			return undefined;
		}
	}

	getTamagotchiName() : string {
		let myTama = this.getMyTamagotchi();
		if(myTama === null) return ""

		const tama = this.tamagotchiList.find((x) => {return x.id === myTama.tamaId})
		if(tama === undefined) return ""

		return tama?.name.toLowerCase();
	}

	initNewLife() {
		let myTama:MyTamagotchi = this.getNewTamagotchi();
		localStorage.setItem("myTama", JSON.stringify(myTama));

		this.setEvolutionTimer()
		this.setSleepTimer(false, undefined);
	}

	getNewTamagotchi() {
		return <MyTamagotchi>{
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

	addCareMistakes() {
		let myTama: MyTamagotchi = this.getMyTamagotchi();
		myTama.careMistakes++;
		this.updateMyTamagotchi(myTama);
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

	setEvolutionTimer() {
		console.log("ev timer")
		let tama = this.getTamagotchiDetails()
		if(tama === undefined) return;

		let now = new Date();

		// check if evolution timer exists
		const evolveStartStr = localStorage.getItem("evolution-start-date")
		let evolveStart = now;
		
		if(evolveStartStr === null) {
			localStorage.setItem("evolution-start-date", JSON.stringify(evolveStart))
		} else {
			evolveStart = new Date(JSON.parse(evolveStartStr!))
		}

		//COMPARE EVOLVE START WITH MINUTES LEFT?
		const tamaStage = this.stages.filter(e => e.id === tama.stage)[0];
		const evolveMins = (
			tamaStage.minutesToEvolve.length > 1 
			? 
			randomInt(tamaStage.minutesToEvolve[0], tamaStage.minutesToEvolve[1]) 
			: 
			tamaStage.minutesToEvolve[0]);
		
		// if current time is less than evolveStart + minutes to evovle then set evolve timer 
		// else evolve
		let evolveEndMills = evolveStart.getTime() + evolveMins*this.MIN_TO_MILLISECOND
		if(now.getTime() < evolveEndMills) {
			setInterval(()=> {
				this.evolveTamagotchi();
	
			}, evolveEndMills - now.getTime());
		} else {
			this.evolveTamagotchi();
		}
	}

	async evolveTamagotchi() {
		const tama = this.getTamagotchiDetails();
		if(tama === undefined) return

		// save current action so we can update action so it redraws new tama to screen 
		let action = this.actionSubject.getValue().main;

		// if egg show hatch animation 
		if(tama?.evolutions.length === 1) {
			if(tama?.name.toLowerCase() === "egg") {
				this.updateAction("hatch")
				await delay(2000);
			} 

			// update to new tamaId
			let myTama: MyTamagotchi = this.getMyTamagotchi();
			myTama.tamaId = tama.evolutions[0].tamaId;

			// update with new evolve start date/time 
			localStorage.setItem("evolution-start-date", JSON.stringify(new Date()))
			this.updateMyTamagotchi(myTama)
		} else if(tama?.evolutions.length > 1) {
			// decide evolution baed on care + discipline mistakes
			alert("evolve!...but the logic isn't written.. more than 1 evolution")
		}
		else {
			// No more evolutions
			return;
		}

		this.updateAction(action);
		this.setEvolutionTimer();
	}

	// setIsSleepingTimer() {
	// 	let tama = this.getTamagotchi()
	// 	if(tama === undefined) return

	// 	setInterval(() => {
	// 		this.isSleepingSubject.next(true)
	// 	}, 1000)
	// }

	// setWakeUpTimer() {
	// 	let tama = this.getTamagotchi()
	// 	if(tama === undefined) return

	// 	// add a day to age
	// 	this.myTama.age++;
	// 	this.isSleepingSubject.next(false)

	// 	setInterval(() => {
	// 		this.isSleepingSubject.next(false)
	// 	}, 1000)
	// }

	// Triggered when fed
	increaseHunger(increment: number) {
		let myTama: MyTamagotchi = this.getMyTamagotchi();
		let count = myTama.hunger

		if(count+increment > this.maxHunger) {
			myTama.hunger = this.maxHunger
		} else {
			myTama.hunger = count + increment;
		}

		myTama.weight += increment;

		this.updateMyTamagotchi(myTama);
	}

	decreaseHunger() {		
		let myTama: MyTamagotchi = this.getMyTamagotchi();
		let count = myTama.hunger

		if(count === 0) return;

		myTama.hunger = --count;
		this.updateMyTamagotchi(myTama);

		// if 0 and happiness 0 then show alert
	}

	increaseHappiness() {
		let myTama: MyTamagotchi = this.getMyTamagotchi();
		let count = myTama.happiness
	
		if(count === this.maxHappiness) return;
		
		myTama.happiness = ++count;
		this.updateMyTamagotchi(myTama);
	}

	decreaseHappiness() {
		let myTama: MyTamagotchi = this.getMyTamagotchi();
		let count = myTama.happiness;

		if(count === 0) return;

		myTama.happiness = --count;
		this.updateMyTamagotchi(myTama);
	}

	increaseDiscipline() {
		let myTama: MyTamagotchi = this.getMyTamagotchi();
		let count = myTama.discipline;

		if(count === this.maxDiscipline) return;

		count += 25;
		myTama.happiness = count;
		this.updateMyTamagotchi(myTama);
	}

	decreaseDiscipline() {
		let myTama: MyTamagotchi = this.getMyTamagotchi();
		let count = myTama.discipline;

		if(count === 0) return;

		count -= 25;
		myTama.discipline = count;
		this.updateMyTamagotchi(myTama);
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