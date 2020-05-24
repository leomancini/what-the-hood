<?php
    require('../helpers/functions.php');
	$config = loadConfig('');
?>
<!DOCTYPE HTML>
<html>
	<head>
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-112757234-6"></script>
		<script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-112757234-6');
		</script>
		<title><?php echo $config['about']['title']; ?> – About</title>
		<link rel='stylesheet/less' href='resources/css/about.less?v=<?php echo rand(0, 9999); ?>'>
		<script src='resources/js/lib/less.js'></script>
		<meta name='viewport' content='width=device-width, initial-scale=1'>
        <meta charset='UTF-8'>
	</head>
	<body ontouchstart=''>
        <div id='about'>
            <span class='link'><a href='./'>← back to game</a></span>
            <br>
            <br>
            <br>
            <h2><?php echo $config['about']['title']; ?> is a neighborhood quiz game by Leo Mancini.</h2>
            <br>
            <br>
            <a class='button' href='https://leomancini.net/what-the-hood' target='_blank'>Learn More</a>
            <a class='button' href='https://github.com/leomancini/nyc-neighborhood-quiz' target='_blank'>View on GitHub</a>
            <br>
            <br>
            <h3>Credits</h3>
            <br>
            <h6>New York City Neighborhoods Polygon Data</h6>
            <span class='link'><a href='https://www.google.com/maps/d/u/1/viewer?hl=en&ll=40.70476551690573%2C-73.97829884999999&z=10&mid=1_gsxJNfmcGZI4ZL_7LnEHj72YpvgNq-w' title='NYC Neighborhoods Map' target='_blank'>NYC Neighborhoods Map</a></span>
            <br>
            <br>
            <h6>New York City Thumbnail SVG</h6>
            <span class='link'><a href='https://commons.wikimedia.org/wiki/File:5_Boroughs_Labels_New_York_City_Map.svg' title='via Wikimedia Commons' target='_blank'>Nafsadh</a> / Public domain</span>
            <br>
            <br>
            <h6>San Francisco Thumbnail SVG</h6>
            <span class='link'><a href='https://commons.wikimedia.org/wiki/File:San_Francisco_districts_map.svg' title='via Wikimedia Commons' target='_blank'>Peter Fitzgerald, OpenStreetMap [2]</a> / <a href='https://creativecommons.org/licenses/by-sa/2.0'>CC BY-SA</a></a>
            <br>
            <br>
            <br>
        </div>
	</body>
</html>