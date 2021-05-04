<!DOCTYPE html>
<html>
	<head>
		<script src='sineWave.js'></script>
		<link rel='stylesheet' href='sineWave.css'>
	</head>
	<body onload='init()'>
		<p id='display'>Amplitude: 125, Frequency: 2.5Hz, Speed: 1.5</p>
		<p id='attributes'>Crest: 125 Meters, Trough: -125 Meters</p>
		<p id='current'>Current Height: 0 Meters, Current Time: 0, Phase: 0/360</p>
		<div>
			<div>
				<p>Amplitude</p>
				<input id='amplitude' type='range' min='1' max='250' value='125' oninput='reset()'>
			</div>
			<div>
				<p>Frequency</p>
				<input id='frequency' type='range' min='1' max='20' value='10' oninput='reset()'>
			</div>
			<!--<div>
				<p>Speed</p>
				<input id='speed' type='range' min='1' max='6' value='3' oninput='reset()'>
			</div>-->
			<div>
				<p>Slow Motion</p>
				<input id='slowmo' type='checkbox' oninput='slow()'>
			</div>
		</div>
		<br>
		<div>
			<button onclick='startTimer()'>Run</button>
			<button onclick='endTimer()'>Pause</button>
			<button onclick='clearCanvas()'>Clear</button>
		</div>
		<canvas id='canvas' width='100' height='500'></canvas>
   </body>
</html>
