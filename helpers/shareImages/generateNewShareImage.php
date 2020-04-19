<?php
    require('../functions.php');
    $config = loadConfig('../');

    function generateNewShareImageFileName() {
        global $config;
        $shareImagesDirectoryItems = scandir('../../'.$config['shareImagesDirectory']);

        $newFileNameIndex = count($shareImagesDirectoryItems) + 1;
        $newFileNameHash = md5($newFileNameIndex);

        date_default_timezone_set('America/Los_Angeles');
        $timeFormatted = date('Y-m-d-h-i-s');;

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
            $scoreComponents['answeredCorrectlyPercentage'] = $_GET['answeredCorrectlyPercentage'];
        }
    
        if (isset($_GET['totalTimeFormattedString']) && $_GET['totalTimeFormattedString'] !== '') {
            $scoreComponents['totalTimeFormattedString'] = $_GET['totalTimeFormattedString'];
        }
        
        renderWrappedText($outputImage, [
            'textContent' => 'I got '.$scoreComponents['answeredCorrectlyPercentage'].'% correct and took '.$scoreComponents['totalTimeFormattedString'].'!',
            'attributes' => [
                'font-family' => 'resources/fonts/helvetica-bold.ttf',
                'font-size' => 56,
                'margin-top' => 142,
                'margin-right' => 100,
                'margin-bottom' => 0,
                'margin-left' => 60,
                'rotation' => 0,
                'color' => $colorBlack
            ]
        ]);

        renderWrappedText($outputImage, [
            'textContent' => 'New York City',
            'attributes' => [
                'font-family' => 'resources/fonts/helvetica.ttf',
                'font-size' => 24,
                'margin-top' => 60,
                'margin-right' => 200,
                'margin-bottom' => 0,
                'margin-left' => 60,
                'rotation' => 0,
                'color' => $colorGray
            ]
        ]);
        
        imagepng($outputImage, '../../'.$config['shareImagesDirectory'].$fileName.'.png');
        imagedestroy($outputImage);
    }

    $imageSize = 600;
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