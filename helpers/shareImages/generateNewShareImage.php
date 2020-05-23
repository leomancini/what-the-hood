<?php
    require('../functions.php');
    $config = loadConfig('../');

    if (!file_exists('../../'.$config['shareImagesDirectory'])) {
        mkdir('../../'.$config['shareImagesDirectory'], 0777, true);
    }

    function generateNewShareImageFileName() {
        global $config;
        $shareImagesDirectoryItems = scandir('../../'.$config['shareImagesDirectory']);

        $newFileNameIndex = count($shareImagesDirectoryItems) + 1;
        date_default_timezone_set('America/Los_Angeles');
        $timeFormatted = date('Y-m-d-h-i-s');
        $newFileNameHash = md5($timeFormatted.'-'.$newFileNameIndex);
        $newFileName = $timeFormatted.'-'.$newFileNameHash;

        return $newFileName;
    }

    function renderWrappedText($outputImage, $textData) {
        global $imageSize;
        $textDataTextContentWordComponents = explode(' ', $textData['textContent']);
        $textDataTextContentWrapped = '';
    
        foreach($textDataTextContentWordComponents as $textDataTextContentWordComponent){
            $box = imagettfbbox($textData['attributes']['font-size'], 0, $textData['attributes']['font-family'], $textDataTextContentWrapped.' '.$textDataTextContentWordComponent);
            if($box[2] > $imageSize - $textData['attributes']['margin-right']){
                $textDataTextContentWrapped .= "\n".$textDataTextContentWordComponent;
            } else {
                $textDataTextContentWrapped .= " ".$textDataTextContentWordComponent;
            }
        }
    
        $textDataTextContentWrapped = trim($textDataTextContentWrapped);
    
        imagettftext(
            $outputImage,
            $textData['attributes']['font-size'],
            $textData['attributes']['rotation'],
            $textData['attributes']['margin-left'],
            $textData['attributes']['font-size'] + $textData['attributes']['margin-top'],
            $textData['attributes']['color'],
            $textData['attributes']['font-family'],
            $textDataTextContentWrapped
        );
    }

    function generateNewShareImage($fileName) {
        global $config;
        global $imageSize;
    
        $outputImage = imagecreatetruecolor($imageSize, $imageSize);
    
        $colorWhite = imagecolorallocate($outputImage, 255, 255, 255);
        $colorBlack = imagecolorallocate($outputImage, 0, 0, 0);
        $colorGray = imagecolorallocate($outputImage, 179, 179, 179);
    
        imagefilledrectangle($outputImage, 0, 0, $imageSize, $imageSize, $colorWhite);
    
        $scoreComponents = [
            'answeredCorrectlyPercentage' => 0,
            'totalTimeFormattedString' => '0 seconds'
        ];
    
        if (isset($_GET['answeredCorrectlyPercentage']) && $_GET['answeredCorrectlyPercentage'] !== '') {
            $scoreComponents['answeredCorrectlyPercentage'] = htmlspecialchars($_GET['answeredCorrectlyPercentage']);
        }
    
        if (isset($_GET['totalTimeFormattedString']) && $_GET['totalTimeFormattedString'] !== '') {
            $scoreComponents['totalTimeFormattedString'] = htmlspecialchars($_GET['totalTimeFormattedString']);
        }
        
        renderWrappedText($outputImage, [
            'textContent' => 'I got '.$scoreComponents['answeredCorrectlyPercentage'].'% correct and took '.$scoreComponents['totalTimeFormattedString'].'!',
            'attributes' => [
                'font-family' => 'resources/fonts/helvetica-bold.ttf',
                'font-size' => 112,
                'margin-top' => 284,
                'margin-right' => 200,
                'margin-bottom' => 0,
                'margin-left' => 120,
                'rotation' => 0,
                'color' => $colorBlack
            ]
        ]);

        if (isset($_GET['cityDisplayName']) && $_GET['cityDisplayName'] !== '') {
            $scoreComponents['cityDisplayName'] = htmlspecialchars($_GET['cityDisplayName']);
        }

        renderWrappedText($outputImage, [
            'textContent' => $scoreComponents['cityDisplayName'],
            'attributes' => [
                'font-family' => 'resources/fonts/helvetica.ttf',
                'font-size' => 48,
                'margin-top' => 120,
                'margin-right' => 400,
                'margin-bottom' => 0,
                'margin-left' => 120,
                'rotation' => 0,
                'color' => $colorGray
            ]
        ]);
        
        imagepng($outputImage, '../../'.$config['shareImagesDirectory'].$fileName.'.png');
        imagedestroy($outputImage);
    }

    $imageSize = 1200;
    $newShareImageFileName = generateNewShareImageFileName();
    generateNewShareImage($newShareImageFileName);

    $response = [
        'newShareImage' => [
            'fileName' => $newShareImageFileName.'.png'
        ]
    ];

    $responseJSON = json_encode($response);

    echo $responseJSON;
?>