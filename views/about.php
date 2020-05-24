<?php
    require('../helpers/functions.php');
    $config = loadConfig('');
?>
<!DOCTYPE HTML>
<html lang='en'>
    <head>
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
        <meta property='og:title' content='<?php echo $config['about']['title']; ?>' />
        <meta property='og:description' content='<?php echo $config['about']['shortDescription']; ?>' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='<?php echo $config['baseURL']; ?>' />
        <meta property='fb:app_id' content='<?php echo $config['facebookAppId']; ?>' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:url' content='<?php echo $config['baseURL']?>/resources/images/share/linkPreview/facebookTest4.png' />
        <meta property='og:image' content='<?php echo $config['baseURL']?>/resources/images/share/linkPreview/facebookTest4.png' />
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
            <a class='button' href='https://github.com/leomancini/what-the-hood' target='_blank'>View on GitHub</a>
            <br>
            <br>
            <h3>Credits</h3>
            <br>
            <h6>New York City Neighborhoods Polygon Data</h6>
            <span class='link'><a href='https://www.google.com/maps/d/u/1/viewer?hl=en&ll=40.70476551690573%2C-73.97829884999999&z=10&mid=1_gsxJNfmcGZI4ZL_7LnEHj72YpvgNq-w' target='_blank' rel='noopener'>NYC Neighborhoods Map</a></span>
            <br>
            <br>
            <h6>New York City Thumbnail SVG</h6>
            <span class='link'><a href='https://commons.wikimedia.org/wiki/File:5_Boroughs_Labels_New_York_City_Map.svg' target='_blank' rel='noopener'>Nafsadh via Wikimedia Commons</a> / Public domain</span>
            <br>
            <br>
            <h6>San Francisco Thumbnail SVG</h6>
            <span class='link'><a href='https://commons.wikimedia.org/wiki/File:San_Francisco_districts_map.svg' target='_blank' rel='noopener'>Peter Fitzgerald, OpenStreetMap via Wikimedia Commons</a> / <a href='https://creativecommons.org/licenses/by-sa/2.0' target='_blank' rel='noopener'>CC BY-SA</a></span>
            <br>
            <br>
            <h6>Background Maps</h6>
            <span class='link'><a href='https://www.mapbox.com/' target='_blank' rel='noopener'>Mapbox</a></span>
            <br>
            <br>
            <h6>Map Thumbnail in Share Preview Image</h6>
            <span class='link'><a href='https://www.mapbox.com/' target='_blank' rel='noopener'>Mapbox</a></span>
            <br>
            <br>
            <h6>Device Thumbnail in Share Preview Image</h6>
            <span class='link'><a href='https://facebook.design/devices' target='_blank' rel='noopener'>Facebook Design</a></span>
            <br>
            <br>
            <h6>Icons</h6>
            <span class='link'><a href='https://material.io/resources/icons/' target='_blank' rel='noopener'>Google Material Icons</a> / <a href='https://www.apache.org/licenses/LICENSE-2.0.html' target='_blank' rel='noopener'>Apache license version 2.0</a></span>
            <br>
            <br>
            <br>
        </div>
    </body>
</html>