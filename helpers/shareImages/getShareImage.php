<?php
    require('../functions.php');
    $config = loadConfig('../');

    // if ($_SERVER['HTTP_HOST'] === 'localhost' || $_SERVER['HTTP_HOST'] === 'leo.local') {
    //     $rootURL = 'http://'.$_SERVER['HTTP_HOST'].'/nyc-neighborhood-quiz';
    // } else {
    //     $rootURL = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http').'://'.$_SERVER['HTTP_HOST'].'/';
    // }
    
    $shareImageShortHashLookup = $_GET['shortHashLookup'];

    $shareImagesDirectoryItems = scandir('../../'.$config['shareImagesDirectory']);
    $disallowedDirectories = ['.', '..', '.DS_Store'];
    $shareImageFileNames = array_diff($shareImagesDirectoryItems, $disallowedDirectories);

    $shareImageMatched = false;
    $shareImageFileNameMatched = '';

    foreach($shareImageFileNames as $shareImageFileName) {
        if ($shareImageShortHashLookup === substr($shareImageFileName, $config['shareImageHashDatePrefixLength'], strlen($shareImageShortHashLookup))) {
            $shareImageMatched = true;
            $shareImageFileNameMatched = $shareImageFileName;
        }
    }

    $shareImage = [
        'shareImageMatched' => $shareImageMatched ? 'true' : 'false',
    ];

    if ($shareImageMatched) {
        $shareImage['shareImageData'] = [
            'shortHashLookup' => $shareImageShortHashLookup,
            'fileNameMatched' => $shareImageFileNameMatched,
        ];
    }
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title>What the Hood?</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <?php if ($shareImageMatched) { ?>
            <meta property='og:title' content='What the Hood?' />
            <meta property='og:image:url' content='<?php echo $config['baseURL'].'/'.$config['shareImagesDirectory'].$shareImage['shareImageData']['fileNameMatched']; ?>' />
            <meta property='og:image' content='<?php echo $config['baseURL'].'/'.$config['shareImagesDirectory'].$shareImage['shareImageData']['fileNameMatched']; ?>' />
        <?php } ?>
        <style>
            html, body {
                background: #000000;
                color: #FFFFFF;
            }
        </style>
        <!-- <script type='text/javascript'>
            window.location.href = '<?php echo $config['baseURL']; ?>';
        </script> -->
	</head>
	<body></body>
</html>