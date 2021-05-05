var amplitude = 125;
var time = 0;
var frequency = 2.5;
var speed = 1;
var equilibrium;
var last;
var canvas;
var timer;
var slowmo = false;
var waveLength = 10;
var lines = [];


function startTimer() {
	let wait;
	if (slowmo) {
		wait = 100;
	} else {
		wait = 10;
	}
	timer = setInterval(function() {
		start();
	}, wait);
}

function endTimer() {
	clearInterval(timer);
}

function init() {
	canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth - 20;
	equilibrium = canvas.height / 2;
	last = equilibrium;
	drawLine(0, equilibrium, canvas.width, equilibrium);
}

function reset() {
	time = 0;
	last = equilibrium;
	endTimer();
	amplitude = document.getElementById('amplitude').value;
	frequency = document.getElementById('frequency').value / 4;
	//speed = document.getElementById('speed').value / 2;
	document.getElementById('display').innerHTML = 'Amplitude: ' + amplitude + ', Frequency: ' + frequency + 'Hz, Speed: ' + speed;
	document.getElementById('attributes').innerHTML = 'Crest: ' + amplitude + ' Meters, Trough: -' + amplitude + ' Meters, Wave Length: ' + waveLength + ', Velocity: ' + (waveLength/frequency);
}

function wave() {
	let y = (Math.sin(time * (Math.PI/180) * frequency)) * amplitude + equilibrium;
	return y;
}

function start() {
	var y = wave();
	drawLine(time - (speed), last, time, y);
	last = y;
	time += speed;
	document.getElementById('current').innerHTML = 'Current Height: ' + ((y - equilibrium) * -1) + ' Meters, Current Time: ' + time/100 + ', Phase: ' + ((time*frequency)%360) + '/360';
}

function drawLine(startX, startY, endX, endY) {
	let ctx = document.getElementById('canvas').getContext('2d');
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
}

function clearCanvas() {
	endTimer();
	
	document.getElementById('canvas').remove();
	let canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	document.body.appendChild(canvas);
	
	canvas.width = window.innerWidth - 20;
	canvas.height = 500;
	last = equilibrium;
	time = 0;
	drawLine(0, equilibrium, canvas.width, equilibrium);
	
	document.getElementById('current').innerHTML = 'Current Height: 0 Meters, Current Time: 0, Phase: 0/360';
}

function slow() {
	if (timer != undefined) {
		endTimer();
	}
	
	let input = document.getElementById('slowmo');
	if (!slowmo) {
		slowmo = true;
	} else {
		slowmo = false;
	}
		
	if (timer != undefined) {
		startTimer();
	}
}

function calculateWaveLength() {
	let lenght = (speed * 10)/frequency;
	return 1;
}