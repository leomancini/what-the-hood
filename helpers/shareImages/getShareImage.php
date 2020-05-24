<?php
    require('../functions.php');
    $config = loadConfig('../');

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
            <meta property='og:title' content='<?php echo $config['about']['title']; ?>' />
            <meta property='og:description' content='<?php echo $config['about']['shortDescription']; ?>' />
            <meta property='og:type' content='website' />
            <meta property='og:url' content='<?php echo $config['baseURL'].'/share/'.$shareImageShortHashLookup; ?>' />
            <meta property='fb:app_id' content='<?php echo $config['facebookAppId']; ?>' />
            <meta property='og:image:width' content='1200' />
            <meta property='og:image:height' content='630' />
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