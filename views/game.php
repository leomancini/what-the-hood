<?php
    require('../helpers/functions.php');
	$config = loadConfig('');
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title>What the Hood?</title>
		<link rel='stylesheet/less' href='resources/css/game.less<?php if($environment === 'development') { echo '?hash='.rand(0, 9999); } ?>'>
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
						<a href='about'>About</a>
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
						<div class='citySpecificMetrics scoreDisplayTypePercentage' id='newYorkCity'></div>
					</div>
					<div id='buttons'>
						<div id='shareButton'>Share Your Score</div>
						<div id='playAgainButton'>Play Again</div>
					</div>
				</div>
				<div id='shareSheetDesktopContainer'>
					<div id='modalContainer'>
						<div id='modalContents'>
							<a class='optionContainer' href='https://twitter.com/intent/tweet' target='_blank' rel='noopener' id='twitter'>
								<div class='icon'>
									<img src='https://pbs.twimg.com/profile_images/1111729635610382336/_65QFl7B_400x400.png'>
								</div>
								<div class='label'>Twitter</div>
							</a><a class='optionContainer' href='mailto:asd@asd.com' target='_blank' rel='noopener' id='facebook'>
								<div class='icon'>
									<img src='https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/58978526_10158354585751729_7411073224387067904_o.png?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=DB-xqjVXqYkAX_hSnX1&_nc_ht=scontent-sjc3-1.xx&oh=74fcb9207c85af941a34492bbeabf651&oe=5EEEBE88'>
								</div>
								<div class='label'>Facebook</div>
							</a><a class='optionContainer'>
								<div class='icon' id='email'>mail</div>
								<div class='label'>Email</div>
							</a><a class='optionContainer'>
								<div class='icon' id='link'>link</div>
								<div class='label'>Copy Link</div>
							</a>
							<div id='cancelButton'>Cancel</div>
						</div>
					</div>
					<div id='backgroundOverlay'></div>
				</div>
			</div>
		</div>
		<script src='resources/data/neighborhoods/new-york-city.js'></script>
		<script src='resources/js/functions/averageGeolocation.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/d3/4.9.1/d3.min.js'></script>
		<link href='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css' rel='stylesheet' />
		<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
		<script src='resources/js/index.js<?php if($environment === 'development') { echo '?hash='.rand(0, 9999); } ?>'></script>
		<script src='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js'></script>
		<script src='resources/js/game.js<?php if($environment === 'development') { echo '?hash='.rand(0, 9999); } ?>'></script>
		<script>
			window.fbAsyncInit = function() {
				FB.init({
					appId: '<?php echo $config['facebookAppId']; ?>',
					autoLogAppEvents: true,
					xfbml: true,
					version: 'v7.0'
				});
			};
		</script>
		<script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>

	</body>
</html>