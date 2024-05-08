import { Injectable } from '@angular/core';
import { Stage, Tamagotchi, EvolveConditions } from './interfaces/tamagotchi';

@Injectable({
  providedIn: 'root'
})
export class AppService {
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
        sprite: "",
        evolutions: [{tamaId: 1}]
      },
      {
        id: 1,
        stage: "baby",
        name: "Shirobabytchi",
        sprite: "/assests/Shirobabytchi.gif",
        evolutions: [{tamaId: 2}],
        
      },
      {
        id: 2,
        stage: "child",
        name: "Tonmarutchi",
        sprite: "",
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
        sprite: "",
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
        sprite: "",
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
        sprite: "",
        evolutions: []
      },
      {
        id: 6,
        stage: "adult",
        name: "Pochitchi",
        sprite: "",
        evolutions: []
      },
      {
        id: 7,
        stage: "adult",
        name: "Zuccitchi",
        sprite: "",
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
        sprite: "",
        evolutions: []
      },
      {
        id: 9,
        stage: "adult",
        name: "Kusatchi",
        sprite: "",
        evolutions: []
      },
      {
        id: 10,
        stage: "adult",
        name: "Takotchi",
        sprite: "",
        evolutions: []
      },
      {
        id: 11,
        stage: "special",
        name: "???",
        sprite: "",
        evolutions: []
      }];
  
  constructor() { }
}
