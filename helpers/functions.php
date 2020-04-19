<?php
    function loadConfig($additionalPath) {
        $projectManifestFile = file_get_contents($additionalPath.'../config.json');
        
        return json_decode($projectManifestFile, true);
    }
?>