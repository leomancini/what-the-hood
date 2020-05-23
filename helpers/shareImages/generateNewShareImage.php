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
            if($box[2] > $imageSize['width'] - $textData['attributes']['margin-right']){
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
    
        $outputImage = imagecreatetruecolor($imageSize['width'], $imageSize['height']);
    
        $colorWhite = imagecolorallocate($outputImage, 255, 255, 255);
        $colorBlack = imagecolorallocate($outputImage, 0, 0, 0);
        $colorGray = imagecolorallocate($outputImage, 179, 179, 179);
    
        imagefilledrectangle($outputImage, 0, 0, $imageSize['width'], $imageSize['height'], $colorWhite);
    
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
                'font-size' => 84,
                'margin-top' => 200,
                'margin-right' => 100,
                'margin-bottom' => 0,
                'margin-left' => 80,
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
                'font-size' => 36,
                'margin-top' => 80,
                'margin-right' => 400,
                'margin-bottom' => 0,
                'margin-left' => 80,
                'rotation' => 0,
                'color' => $colorGray
            ]
        ]);
        
        imagepng($outputImage, '../../'.$config['shareImagesDirectory'].$fileName.'.png');
        imagedestroy($outputImage);
    }

    $imageSize = [
        'width' => 1200,
        'height' => 630
    ];

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