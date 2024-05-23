export interface spriteData {
	[name: string]: {
		spriteWidth: number;
		spriteHeight: number;
		actions: {
			[type: string]: spriteFrameDetails;
		};
	}
}

export interface spriteFrameDetails {
	frames: frameCoordinate[];
	frames_status?: frameCoordinate[];
	frames_left?: frameCoordinate[];
	drift: boolean;
	left_fall?:boolean;
	stopAtFrameEnd?: boolean;
}

interface frameCoordinate {
	x: number;
	y: number;
}

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
			"feed_meal" : {
				"frames": [{"x" : 650, "y": 880},{"x" : 520, "y": 880}, {"x" : 650, "y": 880},{"x" : 520, "y": 880}, {"x" : 650, "y": 880},{"x" : 520, "y": 880}, {"x" : 650, "y": 880}],
				"frames_left":  [{"x" : 198, "y": 0},{"x" : 198, "y": 0}, {"x" : 265, "y": 0}, {"x" : 265, "y": 0}, {"x" : 328, "y": 0}, {"x" : 328, "y": 0}, {"x" : 1000, "y": 1000}, {"x" : 1000, "y": 1000}],
				"drift": false,
				"left_fall": true,
				"stopAtFrameEnd": true
			},
			"feed_snack" : {
				"frames": 		[{"x" : 650, "y": 880},{"x" : 520, "y": 880}, {"x" : 650, "y": 880},{"x" : 520, "y": 880}, {"x" : 650, "y": 880},{"x" : 520, "y": 880}, {"x" : 650, "y": 880}],
				"frames_left":  [{"x" : 1, "y": 0}, {"x" : 1, "y": 0}, {"x" : 66, "y": 0}, {"x" : 66, "y": 0}, {"x" : 132, "y": 0}, {"x" : 132, "y": 0}, {"x" : 1000, "y": 1000}, {"x" : 1000, "y": 1000}],
				"drift": false,
				"left_fall": true,
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
				"frames_status": [{"x": 595, "y": 0}, {"x" : 400, "y": 0}],
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

export const spriteMap: spriteData = untypedData;

