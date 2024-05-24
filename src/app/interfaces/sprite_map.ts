import { SCREEN_RIGHT, SCREEN_SIZE } from "../../helper";

export interface ISpriteData {
	[name: string]: {
		spriteWidth: number;
		spriteHeight: number;
		actions: {
			[type: string]: ISpriteFrameDetails;
		};
	}
}

export interface ISpriteFrameDetails {
	frames: IFrameCoordinate[];
	drift: boolean;
	stopAtFrameEnd?: boolean;
}

export interface ISpriteFrameDetails {
	frames: IFrameCoordinate[];
	drift: boolean;
	stopAtFrameEnd?: boolean;
}

export interface ICompanionSpriteData {
	[name: string]: {
		spriteWidth: number;
		spriteHeight: number;
		destWidth?: number;
		destHeight?: number;
		destX: number;
		destY: number;
		frames: IFrameCoordinate[],
		isLeft: boolean;
		doesFall: boolean;
	}
}

interface IFrameCoordinate {
	x: number;
	y: number;
}
// export interface spriteFrameDetails {
// 	frames: frameCoordinate[];
// 	frames_status?: frameCoordinate[];
// 	frames_left?: frameCoordinate[];
// 	drift: boolean;
// 	left_fall?:boolean;
// 	stopAtFrameEnd?: boolean;
// }


const untypedData = JSON.parse(`{
	"egg" : {
		"spriteWidth": 128,
		"spriteHeight": 128,
		"actions" : {
			"default" : {
				"frames": [{"x": 0, "y": 740}, {"x": 132, "y": 740}],
				"drift": false
			},
			"hatch" : {
				"frames": [{"x": 262, "y": 740}],
				"drift": false
			}
		}
	},
	"shirobabytchi": {
		"spriteWidth": 128,
		"spriteHeight": 128,
		"actions" : {
			"default" : {
				"frames": [{"x" : 0, "y": 880}, {"x" : 132, "y": 880}, {"x" : 264, "y": 880}, {"x" : 396, "y": 880}],
				"drift": true
			},
			"eat" : {
				"frames": [{"x" : 650, "y": 880},{"x" : 520, "y": 880}, {"x" : 650, "y": 880},{"x" : 520, "y": 880}, {"x" : 650, "y": 880},{"x" : 520, "y": 880}, {"x" : 650, "y": 880}],
				"drift": false,
				"stopAtFrameEnd": true
			},
			"no" : {
				"frames": [{"x" : 520, "y": 880}, {"x" : 912, "y": 880},{"x" : 520, "y": 880}, {"x" : 912, "y": 880},{"x" : 520, "y": 880}, {"x" : 912, "y": 880}],
				"drift": false,
				"stopAtFrameEnd": true
			},
			"play_wait" : {
				"frames": [{"x" : 0, "y": 880}, {"x" : 0, "y": 1012}],
				"drift": false
			},
			"play_win" :  {
				"frames": [{"x" : 0, "y": 880}, {"x" : 132, "y": 880}],
				"frames_status": [{"x" : 400, "y": 740}, {"x" : 530, "y": 0}],
				"drift": false
			},
			"play_lose" :  {
				"frames": [{"x" : 132, "y": 1012}, {"x" : 264, "y": 1012}],
				"frames_status": [{"x" : 400, "y": 0}, {"x" : 464, "y": 0}],
				"drift": false
			},
			"sleep" : {
				"frames": [{"x" : 264, "y": 1012}],
				"frames_status": [{"x": 660, "y": 0},{"x": 725, "y": 0}],
				"drift": false
			},
			"sick" :  {
				"frames": [{"x" : 264, "y": 1012}, {"x" : 132, "y": 1012}],
				"drift": false
			}
		}
	}, 
	"tonmarutchi": {
		"spriteWidth": 128,
		"spriteHeight": 128,
		"actions" : {
			"default" : {
				"frames": [{"x" : 0, "y": 1138}, {"x" : 132, "y": 1138}], 
				"drift": true
			},
			"sleep": {
				"frames": [{"x": 0, "y": 1268}, {"x": 132, "y": 1268}],
				"drift": false
			}
		}
	},
	"tongaritchi" : {
		"spriteWidth": 128,
		"spriteHeight": 128,
		"actions" : {
			"default": {
				"frames": [{"x" : 0, "y": 1008}, {"x" : 132, "y": 1008}],
				"drift": true
			},
			"sleep": {
				"frames": [{"x": 0, "y": 1268}, {"x": 132, "y": 1268}],
				"drift": false
			}
		}
	},
	"hashitamatchi" : {
		"spriteWidth": 128,
		"spriteHeight": 128,
		"actions" : {
			"default": {
				"frames": [{"x" : 0, "y": 1008}, {"x" : 130, "y": 1008}],
				"drift": true
			} 
		}
	},
	"mimitchi": { 
		"spriteWidth": 128,
		"spriteHeight": 128,
		"actions" : {
			"default": {
				"frames": [{"x" : 0, "y": 1008}, {"x" : 130, "y": 1008}],
				"drift": true
			} 
		}
	}
}`);

export const spriteMap: ISpriteData = untypedData;

const untypedCompanionData = JSON.parse(`{
	"meal": {
		"spriteWidth": 64,
		"spriteHeight": 64,
		"destWidth": 32,
		"destHeight": 32,
		"destX" : ${((SCREEN_SIZE.WIDTH / 2) - 60)},
		"destY" : ${SCREEN_SIZE.HEIGHT - 32},
		"frames":  [{"x" : 198, "y": 0},{"x" : 198, "y": 0}, {"x" : 265, "y": 0}, {"x" : 265, "y": 0}, {"x" : 328, "y": 0}, {"x" : 328, "y": 0}, {"x" : 1000, "y": 1000}, {"x" : 1000, "y": 1000}],
		"isLeft": true,
		"doesFall": true
	}, 
	"snack": {
		"spriteWidth": 64,
		"spriteHeight": 64,
		"destWidth": 32,
		"destHeight": 32,
		"destX" : ${((SCREEN_SIZE.WIDTH / 2) - 60)},
		"destY" : ${SCREEN_SIZE.HEIGHT - 32},
		"frames": [{"x" : 1, "y": 0}, {"x" : 1, "y": 0}, {"x" : 67, "y": 0}, {"x" : 67, "y": 0}, {"x" : 132, "y": 0}, {"x" : 132, "y": 0}, {"x" : 1000, "y": 1000}, {"x" : 1000, "y": 1000}],
		"isLeft": true,
		"doesFall": true
	}, 
	"sick": {
		"spriteWidth": 64,
		"spriteHeight": 64,
		"destX" : ${SCREEN_RIGHT},
		"destY" : ${80},
		"frames": [{"x": 595, "y": 0}, {"x" : 400, "y": 0}],
		"isLeft": false,
		"doesFall": false
	}
}`)
	
export const companionSpriteMap: ICompanionSpriteData = untypedCompanionData;


