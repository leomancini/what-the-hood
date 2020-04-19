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
            <meta property="og:title" content="What the Hood?" />
            <meta property="og:url" content="http://whatthehood.city" />
            <meta property='og:image:url' content='../../<?php echo $config['shareImagesDirectory'].$shareImage['shareImageData']['fileNameMatched']; ?>' />
            <meta property='og:image' content='../../<?php echo $config['shareImagesDirectory'].$shareImage['shareImageData']['fileNameMatched']; ?>' />
        <?php } ?>
	</head>
	<body>

	</body>
</html>