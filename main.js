var amplitude = 125; // in [cm]
var time = 0; // in [ms]
var frequency = 1.25; // in [Hz] => [1/sec]
var speed = 1; // in [ms]
var equilibrium;
var last;
var canvas;
var timer;
var slowmo = false;
var round = true;
var wait = 25;


function startTimer()
{

	if (timer == undefined) 
	{
	
		timer = setInterval(function()
		{

			start();

		}, wait);
		
	}
}

function endTimer()
{

	clearInterval(timer);
	timer = undefined;
	
}

function init()
{

	canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth - 20;
	equilibrium = canvas.height / 2;
	last = equilibrium;
	drawLine(0, equilibrium, canvas.width, equilibrium);
	
}

function runpause(run)
{

	let button = document.getElementById('run/pause');

	if (run == true)
	{	
	
		startTimer();
		button.innerHTML = 'Pause';
		button.onclick = function() { runpause(false); }
	
	}
		
	else
	
	{
		endTimer();
		button.innerHTML = 'Run';
		button.onclick = function() { runpause(true); }
		
	}

}

function reset()
{

	time = 0;
	last = equilibrium;
	endTimer();
	amplitude = document.getElementById('amplitude').value;
	frequency = document.getElementById('frequency').value / 4;
	
	document.getElementById('aDisplay').innerHTML = 'Amplitude: ' + amplitude + ' cm';
	document.getElementById('fDisplay').innerHTML = 'Frequency: ' + frequency + ' Hz';
	let period;
	if (round) { period = Math.floor((1/frequency)*100) / 100; }
	else { period = 1/frequency; }
	document.getElementById('attributes').innerHTML = 'Crest: ' + amplitude + ' cm, Trough: -' + amplitude + ' cm, Period: ' + period + ' seconds';
	
	runpause(false);
	
}

function sineWave()
{

	let pi2 = Math.PI * 2;
	let time_sec = time/100; // convert ms to sec !!!
	return (Math.sin(time_sec * frequency * pi2)) * amplitude + equilibrium;
	
}

function start()
{

	var y = sineWave(time,frequency);
	drawLine(time - (speed), last, time, y);
	last = y;
	time += speed;
	
	let phase = ((time / 100) * frequency).toFixed(2);
	let percent;
	if (phase == 0)
	{
		
		percent = 0;
		
	} else
	{
		
		percent = Math.floor((phase) * 100)%100;
			
	}
	
	let height;
	if (round) { height = (Math.floor((y - equilibrium) * -1000)/1000).toFixed(3); }
	else { height = y - equilibrium * -1 }
	let period = 1/frequency;
	document.getElementById('current').innerHTML = 'Current Height: ' + height + ' cm, Current Time: ' + (time/100) + ' seconds, Percent Done: ' + percent + '%';
	
}

function drawLine(startX, startY, endX, endY)
{

	let ctx = document.getElementById('canvas').getContext('2d');
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
	
}

function clearCanvas()
{

	endTimer();
	
	document.getElementById('canvas').remove();
	let canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	document.getElementById('canvasHolder').appendChild(canvas);
	
	canvas.width = window.innerWidth - 20;
	canvas.height = 500;
	last = equilibrium;
	time = 0;
	drawLine(0, equilibrium, canvas.width, equilibrium);
	
	document.getElementById('current').innerHTML = 'Current Height: 0 cm, Current Time: 0, Percent Done: 0%';
	
	runpause(false);
	
}

function slow()
{
	
	let input = document.getElementById('slowmo');
	if (!slowmo)
	{
	
		slowmo = true;
		wait = 150;
		
	} else
	{
	
		slowmo = false;
		wait = 25;
		
	}
	
	if (timer != undefined)
	{
	
		endTimer();
		startTimer();
	
	}
		
}

function rounded()
{

	if (round)
	{
	
		round = false;
		
	} else 
	{
	
		round = true;
	
	}
	
	let period;
	if (round) { period = Math.floor((1/frequency)*100) / 100; }
	else { period = 1/frequency; }
	document.getElementById('attributes').innerHTML = 'Crest: ' + amplitude + ' cm, Trough: -' + amplitude + ' cm, Period: ' + period + ' seconds';

}
