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
var round = true;


function startTimer()
{

	if (timer == undefined) 
	{
	
		let wait;
		if (slowmo)
		{

			wait = 125;

		} else
		{

			wait = 10;

		}

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

function reset()
{

	time = 0;
	last = equilibrium;
	endTimer();
	amplitude = document.getElementById('amplitude').value;
	frequency = document.getElementById('frequency').value / 4;
	
	document.getElementById('aDisplay').innerHTML = 'Amplitude: ' + amplitude + ' Cm';
	document.getElementById('fDisplay').innerHTML = 'Frequency: ' + frequency + ' Hz';
	let period;
	if (round) { period = Math.floor((360*speed)/frequency)/100; }
	else { period = ((360*speed)/frequency)/100 }
	document.getElementById('attributes').innerHTML = 'Crest: ' + amplitude + ' Cm, Trough: -' + amplitude + ' Cm, Period: ' + period + ' Seconds';
	
}

function sineWave()
{

	return (Math.sin(time * (Math.PI/180) * frequency)) * amplitude + equilibrium;
	
}

function start()
{

	var y = sineWave();
	drawLine(time - (speed), last, time, y);
	last = y;
	time += speed;
	
	let phase = ((time*frequency)%360).toFixed(2);
	let percent;
	if (phase == 0)
	{
		
		percent = 0;
		
	} else
	{
		
		percent = Math.floor((phase/360) * 100);
			
	}
	
	let height;
	if (round) { height = (Math.floor((y - equilibrium) * -1000)/1000).toFixed(3); }
	else { height = y - equilibrium * -1 }
	
	document.getElementById('current').innerHTML = 'Current Height: ' + height + ' Cm, Current Time: ' + (time/100).toFixed(2) + ' Seconds, Phase: ' + phase + '/360(' + percent + '%)';
	
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
	
	document.getElementById('current').innerHTML = 'Current Height: 0 Cm, Current Time: 0, Phase: 0/360(0%)';
	
}

function slow()
{

	endTimer();
	
	let input = document.getElementById('slowmo');
	if (!slowmo)
	{
	
		slowmo = true;
		
	} else
	{
	
		slowmo = false;
		
	}
		
	startTimer();
		
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
	if (round) { period = Math.floor((360*speed)/frequency)/100; }
	else { period = ((360*speed)/frequency)/100 }
	document.getElementById('attributes').innerHTML = 'Crest: ' + amplitude + ' Cm, Trough: -' + amplitude + ' Cm, Period: ' + period + ' Seconds';

}
