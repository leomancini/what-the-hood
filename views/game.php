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
        <title><?php echo $config['about']['title']; ?></title>
        <link rel='stylesheet/less' href='resources/css/game.less<?php if($config['environment'] === 'development') { echo '?hash='.rand(0, 9999); } ?>'>
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
        <meta property='og:image:url' content='<?php echo $config['baseURL']?>/resources/images/share/linkPreview/facebookTest6.png' />
        <meta property='og:image' content='<?php echo $config['baseURL']?>/resources/images/share/linkPreview/facebookTest6.png' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@leomancini' />
        <meta name='twitter:creator' content='@leomancini' />
        <meta name='twitter:title' content='<?php echo $config['about']['title']; ?>' />
        <meta name='twitter:description' content='<?php echo $config['about']['shortDescription']; ?>' />
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
                    <?php foreach($config['cities'] as $city) { ?>
                        <div class='gameSelector <?php echo $city['enabled'] === true ? 'enabled' : 'disabled'; echo $city['beta'] === true ? ' beta' : ''; ?>' id='<?php echo $city['id']; ?>'>
                            <div class='gameSelectorContents'>
                                <h1><?php echo $city['displayNameFormatted']; ?></h1>
                                <?php if ($city['beta'] === false) { ?><img src='resources/images/<?php echo $city['id']; ?>/city-thumbnail.png' class='city-thumbnail'><?php } ?>
                                <?php if ($city['enabled'] === true) { ?>
                                    <div class='playButton'>Play</div><?php echo $city['beta'] === true ? "<div class='betaLabel'>BETA</div>" : ''; ?>
                                <?php } else { ?>
                                    <div class='comingSoonLabel'>Coming Soon</div>
                                <?php } ?>
                            </div>
                        </div>
                    <?php } ?>
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
                                <div class='toggleSwitch'>
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
                <div id='preGameLoadingIndicator'>
                    <div class='loadingio-spinner-spinner-22287q9bq5'><div class='ldio-t7o22lret'>
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div></div>
                </div>
                <div id='gameScreenContents'>
                    <div id='statusBar'>
                        <div id='info'></div>
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
                                <label></label>
                            </div>
                            <div class='option' id='B'>
                                <label></label>
                            </div>
                            <div class='option' id='C'>
                                <label></label>
                            </div>
                            <div class='option' id='D'>
                                <label></label>
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
                            <a class='optionContainer' target='_blank' rel='noopener' id='twitter'>
                                <div class='icon'>
                                    <img src='resources/images/share/logos/twitter.png'>
                                </div>
                                <div class='label'>Twitter</div>
                            </a><a class='optionContainer' target='_blank' rel='noopener' id='facebook'>
                                <div class='icon'>
                                    <img src='resources/images/share/logos/facebook.png'>
                                </div>
                                <div class='label'>Facebook</div>
                            </a><a class='optionContainer' id='email'>
                                <div class='icon'>mail</div>
                                <div class='label'>Email</div>
                            </a><a class='optionContainer' id='link'>
                                <input type='text'>
                                <div class='icon'>link</div>
                                <div class='label'>Copy Link</div>
                            </a>
                            <div id='cancelButton'>Cancel</div>
                        </div>
                    </div>
                    <div id='backgroundOverlay'></div>
                </div>
            </div>
        </div>
        <link href='resources/css/spinner.css' rel='stylesheet' />
        <link href='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
        <script src='resources/js/functions.js'></script>
        <script src='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js'></script>
        <script src='resources/js/index.js<?php if($config['environment'] === 'development') { echo '?hash='.rand(0, 9999); } ?>'></script>
        <script src='resources/js/game.js<?php if($config['environment'] === 'development') { echo '?hash='.rand(0, 9999); } ?>'></script>
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