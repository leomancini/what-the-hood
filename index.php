<!DOCTYPE HTML>
<html>
	<head>
		<title>What the Hood?</title>
		<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Tangerine'>
		<link rel='stylesheet/less' href='resources/css/style.less?v=<?php echo rand(0, 9999); ?>'>
		<script src='resources/js/lib/less.js'></script>
		<meta name='viewport' content='width=device-width, initial-scale=1'>
		<meta charset='UTF-8'>
	</head>
	<body ontouchstart=''>
		<div id='preloadImages'>
			<div id='preloadImage1'></div>
			<div id='preloadImage2'></div>
			<div id='preloadImage3'></div>
		</div>
		<div id='container'>
			<div id='gameSelectionScreen'>
				<div id='gameSelectionScreenContents'>
					<div class='gameSelector enabled' id='new-york-city'>
						<div class='gameSelectorContents'>
							<h1>New York<br>City</h1>
							<img src='resources/images/new-york-city/city-thumbnail.png' class='city-thumbnail'>
							<div class='playButton'>Play</div>
						</div>
					</div>
					<div class='gameSelector disabled' id='san-francisco'>
						<div class='gameSelectorContents'>
							<h1>San Francisco</h1>
							<img src='resources/images/san-francisco/city-thumbnail.png' class='city-thumbnail'>
							<div class='comingSoon'>Coming Soon</div>
						</div>
					</div>
					<div id='bottomLinks'>
						<a href='credits.html'>Credits</a>
					</div>
				</div>
			</div>
			<div id='preGameOptionsScreen'>
				<div id='preGameOptionsScreenContents'>
						<div class='titleWrapper'>
							<h2>What boroughs<br>do you want to<br>play?</h2>
						</div>
						<div id='boroughCheckboxesWrapper'>
							<div class='boroughCheckboxWrapper on'>
								<input type='checkbox' name='manhattan' value='Manhattan' checked='checked' class='boroughCheckbox'>
								<img src='resources/images/new-york-city/borough-thumbnails/manhattan.png' class='boroughCheckboxThumbnail'>
								<label for='manhattan'>Manhattan</label>
								<div class='toggleSwitch'>
									<div class='toggleSwitchHandle'></div>
								</div>
							</div>
							<div class='boroughCheckboxWrapper on'>
								<input type='checkbox' name='queens' value='Queens' checked='checked' class='boroughCheckbox'>
								<img src='resources/images/new-york-city/borough-thumbnails/queens.png' class='boroughCheckboxThumbnail'>
								<label for='queens'>Queens</label>
								<div class='toggleSwitch on'>
									<div class='toggleSwitchHandle'></div>
								</div>
							</div>
							<div class='boroughCheckboxWrapper on'>
								<input type='checkbox' name='brooklyn' value='Brooklyn' checked='checked' class='boroughCheckbox'>
								<img src='resources/images/new-york-city/borough-thumbnails/brooklyn.png' class='boroughCheckboxThumbnail'>
								<label for='brooklyn'>Brooklyn</label>
								<div class='toggleSwitch'>
									<div class='toggleSwitchHandle'></div>
								</div>
							</div>
							<div class='boroughCheckboxWrapper on'>
								<input type='checkbox' name='the-bronx' value='The Bronx' checked='checked' class='boroughCheckbox'>
								<img src='resources/images/new-york-city/borough-thumbnails/the-bronx.png' class='boroughCheckboxThumbnail'>
								<label for='the-bronx'>The Bronx</label>
								<div class='toggleSwitch'>
									<div class='toggleSwitchHandle'></div>
								</div>
							</div>
							<div class='boroughCheckboxWrapper on'>
								<input type='checkbox' name='staten-island' value='Staten Island' checked='checked' class='boroughCheckbox'>
								<img src='resources/images/new-york-city/borough-thumbnails/staten-island.png' class='boroughCheckboxThumbnail'>
								<label for='staten-island'>Staten Island</label>
								<div class='toggleSwitch'>
									<div class='toggleSwitchHandle'></div>
								</div>
							</div>
						</div>
					<div id='startButton'>Start</div>
				</div>
			</div>
			<div id='gameScreen'>
				<div id='gameScreenContents'>
					<div id='statusBar'>
						<div id='info'>NYC</div>
						<div id='clock'>
							<time>00:00</time>
						</div>
						<div id='level'></div>
					</div>
					<div id='mapWrapperContainer'>
						<div id='mapWrapper'>
							<div id='map'></div>
						</div>
					</div>
					<div id='questions'>
						<div id='options'>
							<div class='option' id='A'>
								<span class='letter'>A</span><label></label>
							</div>
							<div class='option' id='B'>
								<span class='letter'>B</span><label></label>
							</div>
							<div class='option' id='C'>
								<span class='letter'>C</span><label></label>
							</div>
							<div class='option' id='D'>
								<span class='letter'>D</span><label></label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id='gameOverScreen'>
				<div id='gameOverScreenContents'>
					<div id='gameOverLabel'>Game over</div>
					<div class='titleWrapper'>
						<h2>You got <span id='answeredCorrectlyPercentage'>0%</span> correct and took <span id='totalTimeFormattedString'>0 seconds</span>!</h2>
					</div>
					<div id='citySpecificMetricsWrapper'>
						<div class='citySpecificMetrics scoreDisplayTypeFraction' id='newYorkCity'></div>
					</div>
					<div id='buttons'>
						<div id='shareButton'>Share</div>
						<!-- <a href='.' class='button'><div id='playAgainButton'>Play Again</div></a> -->
						<div id='playAgainButton'>Play Again</div>
					</div>
				</div>
			</div>
		</div>
		<script src='resources/data/neighborhoods/new-york-city.js'></script>
		<script src='resources/js/functions/averageGeolocation.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/d3/4.9.1/d3.min.js'></script>
		<link href='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css' rel='stylesheet' />
		<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
		<script src='resources/js/config.js?hash=<?php echo rand(0, 9999); ?>'></script>
		<script src='resources/js/index.js?hash=<?php echo rand(0, 9999); ?>'></script>
		<script src='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js'></script>
		<script src='resources/js/game.js?hash=<?php echo rand(0, 9999); ?>'></script>
	</body>
</html>