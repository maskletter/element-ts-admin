/**
 * 2019-02-20
 * maskleteer
 */

let keyUpFunMap: Set<Function> = new Set();
let keyDownFunMap: Set<Function> = new Set();

let aliasKey: any = {
	ctrl: 17,
	esc: 24,
	'`': 192,
	shift: 16,
	capslock: 229,
	casplk: 229,
	win: 91,
	alt: 18,
	tab: 9,
	q: 81,
	w: 16,
	e: 69,
	r: 82,
	t: 84,
	y: 89,
	u: 85,
	i: 73,
	o: 79,
	p: 80,
	a: 65,
	s: 83,
	d: 68,
	f: 70,
	g: 71,
	h: 72,
	j: 74,
	k: 75,
	l: 76,
	z: 90,
	x: 88,
	c: 67,
	v: 86,
	b: 66,
	n: 78,
	m: 77,
	',': 188,
	'<': 188,
	'.': 190,
	'>': 190,
	'/': 191,
	'?': 191,
	';': 186,
	':': 186,
	"'": 222,
	'"': 222,
	"[": 219,
	'{': 219,
	"]": 221,
	'}': 221,
	"\\": 220,
	'|': 220,
	"-": 189,
	'_': 189,
	"=": 187,
	'+': 187,
	'0': 48,
	')': 48,
	'1': 49,
	'!': 49,
	'2': 50,
	'@': 50,
	'3': 51,
	'#': 51,
	'4': 52,
	'$': 52,
	'5': 53,
	'%': 53,
	'6': 54,
	'^': 54,
	'7': 55,
	'&': 55,
	'8': 56,
	'*': 56,
	'9': 57,
	'(': 57,
	f1: 112,
	f2: 113,
	f3: 114,
	f4: 115,
	f5: 116,
	f6: 117,
	f7: 118,
	f8: 119,
	f9: 120,
	f10: 121,
	f11: 122,
	f12: 123,
	sclk: 145,
	scrolllock: 145,
	pause: 19,
	ins: 45,
	insert: 45,
	home: 36,
	pgup: 33,
	pageup: 33,
	pgdn: 34,
	pagedown: 34,
	end: 35,
	del: 46,
	delete: 46,
	arrowup: 38,
	arrowdown: 40,
	arrowleft: 37,
	arrowright: 39,
	num: 144,
	enter: 13
	// "/": 111,
	// '*': 106,
	// '-': 109,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39,
	// arrowright: 39
}

const numericKeypad = {
	'/': 111,
	'*': 106,
	'-': 109,
	'+': 107,
	'1': 97,
	'2': 98,
	'3': 99,
	'4': 100,
	'5': 101,
	'6': 102,
	'7': 103,
	'8': 104,
	'9': 105,
}

window.addEventListener('keyup', function(e: KeyboardEvent) {
	keyUpFunMap.forEach((data: any) => {
		data(e);
	})
})

window.addEventListener('keydown', function(e: KeyboardEvent) {
	keyDownFunMap.forEach((data: any) => {
		data(e);
	})
})

export default (key: string, call: Function, name?: string): void => {

	const code: string = key.split('+').map(v => {
		const name: string = v.replace(/ /g, '').toLocaleLowerCase();
		return aliasKey[name]
    }).join('-') + '-';
    let set = new Set();
	let upCode: string = '';
	keyUpFunMap.add((e: KeyboardEvent): void => {
		if(upCode == code){
			call()
		}
		upCode = '';
		set = new Set();
	})
   
	keyDownFunMap.add((e: KeyboardEvent): void => {
		upCode = '';
		set.add(e.keyCode)
		set.forEach(v => {
			upCode += v+'-'
		})
		if(upCode == code){
			e.stopPropagation();
			e.preventDefault()
		}
	})
}

// export const removeLister = (name: string): void =>{
// 	keyDownFunMap = keyDownFunMap.filter((data: LinstenKey) => {
// 		if(data.name == name){
// 			return false
// 		}else{
// 			return true;
// 		}
// 	})
// 	keyUpFunMap = keyUpFunMap.filter((data: LinstenKey) => {
// 		if(data.name == name){
// 			return false
// 		}else{
// 			return true;
// 		}
// 	})
// }