mapboxgl.accessToken = 'pk.eyJ1IjoibGVvbWFuY2luaSIsImEiOiJjazdkbzZiYmkyMjlqM2xwNm5xdXJ0bTcyIn0.UN3YLKP-fEJbPFEY0e0PDw';

window.selectedBoroughs = [];
window.neighborhoodDatabaseWithoutPreviousRandomlySelectedNeighborhoods = neighborhoodDatabase;

let map,
    mapDiv = document.querySelector('#map');

let timer,
    timerValueSeconds = 0,
    secondsFormatted = 0,
    minutesFormatted = 0;

let gameState = {
    cityDisplayName: '',
    totalTime: 0,
    totalTimeMinutes: 0,
    totalTimeSeconds: 0,
    totalTimeFormatted: '',
    answeredCorrectly: 0,
    answeredIncorrectly: 0,
    answeredCorrectlyPercentage: 0,
    totalScore: 0,
    citySpecficMetrics: {
        newYorkCity: {
            selectedBoroughs: [],
            boroughScores: {
                'Manhattan': {
                    correct: 0,
                    seen: 0
                },
                'Queens': {
                    correct: 0,
                    seen: 0
                },
                'Brooklyn': {
                    correct: 0,
                    seen: 0
                },
                'The Bronx': {
                    correct: 0,
                    seen: 0
                },
                'Staten Island': {
                    correct: 0,
                    seen: 0
                }
            }
        }
    }
};

loadConfig();

function loadConfig() {
    fetch('config.json')
        .then((response) => {
            return response.json();
        })
        .then((config) => {
            window.config = config;

            getSelectedBoroughs();
        });
}

function getNextNeighborhoodData() {
    const selectedBoroughs = window.selectedBoroughs;

    const neighborhoodDatabaseSelectedBoroughsOnly = window.neighborhoodDatabaseWithoutPreviousRandomlySelectedNeighborhoods.filter((neighborhood) => {
        if (selectedBoroughs.includes(neighborhood.metadata.borough)) {
            return true;
        }
    });

    const randomlySelectedNeighborhood = neighborhoodDatabaseSelectedBoroughsOnly[Math.floor(Math.random() * neighborhoodDatabaseSelectedBoroughsOnly.length)];

    window.neighborhoodDatabaseWithoutPreviousRandomlySelectedNeighborhoods = window.neighborhoodDatabaseWithoutPreviousRandomlySelectedNeighborhoods.filter((neighborhood) => {
        if (neighborhood !== randomlySelectedNeighborhood) {
            return true;
        }
    });

    return {
        randomlySelectedNeighborhood,
        neighborhoodDatabaseSelectedBoroughsOnly
    };
}

function getNeighborhoodCoordsCenter(neighborhoodData) {        
    const neighborhoodCoords = neighborhoodData.randomlySelectedNeighborhood['geometry']['coordinates'].map((neighborhoodCoords) => {
        return neighborhoodCoords.map((coord) => {
            return {
                latitude: coord[0],
                longitude: coord[1]
            }
        })
    })[0];

    const neighborhoodCoordsCenter = averageGeolocation(neighborhoodCoords);

    // const offsetMapCenter = [neighborhoodCoordsCenter[0], neighborhoodCoordsCenter[1]-0.02];

    return neighborhoodCoordsCenter;
}

function getAnswerOptions(neighborhoodData) {
    const neighborhoodNames = neighborhoodData.neighborhoodDatabaseSelectedBoroughsOnly.map((neighborhood) => {
        return neighborhood.metadata.name;
    });

    const index = neighborhoodNames.indexOf(neighborhoodData.randomlySelectedNeighborhood.metadata.name);

    if (index > -1) {
        neighborhoodNames.splice(index, 1);
    }

    const shuffledNeighborhoodNames = neighborhoodNames.sort(() => Math.random() - 0.5);

    const answerOptions = [
        neighborhoodData.randomlySelectedNeighborhood.metadata.name,
        shuffledNeighborhoodNames[0],
        shuffledNeighborhoodNames[1],
        shuffledNeighborhoodNames[2]
    ];

    gameState.citySpecficMetrics.newYorkCity.boroughScores[neighborhoodData.randomlySelectedNeighborhood.metadata.borough].seen++;

    const shuffledAnswerOptions = answerOptions.sort(() => Math.random() - 0.5);

    window.correctAnswerOptionMetadata = neighborhoodData.randomlySelectedNeighborhood.metadata;

    return shuffledAnswerOptions;
}

function populateAnswerOptions(answerOptions, neighborhoodData) {
    document.querySelector('.option#A label').classList.remove('hidden');
    document.querySelector('.option#A label').innerHTML = answerOptions[0];
    document.querySelector('.option#A').setAttribute('data-neighborhood-name', answerOptions[0]);

    document.querySelector('.option#B label').classList.remove('hidden');
    document.querySelector('.option#B label').innerHTML = answerOptions[1];
    document.querySelector('.option#B').setAttribute('data-neighborhood-name', answerOptions[1]);

    document.querySelector('.option#C label').classList.remove('hidden');
    document.querySelector('.option#C label').innerHTML = answerOptions[2];
    document.querySelector('.option#C').setAttribute('data-neighborhood-name', answerOptions[2]);

    document.querySelector('.option#D label').classList.remove('hidden');
    document.querySelector('.option#D label').innerHTML = answerOptions[3];
    document.querySelector('.option#D').setAttribute('data-neighborhood-name', answerOptions[3]);

    const optionsDivs = document.querySelectorAll('.option');

    for (i = 0; i < optionsDivs.length; ++i) {
        optionsDivs[i].style.pointerEvents = 'auto';
    }
}

function clearAnswerOptions() {
    const optionsDivs = document.querySelectorAll('.option');

    for (var i = 0; i < optionsDivs.length; ++i) {
        optionsDivs[i].style.pointerEvents = 'none';
        optionsDivs[i].setAttribute('data-neighborhood-name', '');
        optionsDivs[i].classList.remove('selectedAnswer');
        optionsDivs[i].classList.remove('correctAnswer');
        optionsDivs[i].querySelector('label').classList.add('hidden');
    }

    setTimeout(function(optionDiv) {
        for (var i = 0; i < optionsDivs.length; ++i) {
            optionsDivs[i].querySelector('label').innerHTML = '';
        }
    }, 300);
}

function getShapeColor(type) {
    if (type === 'random') {
        const availableColors = [window.config.colors.blue, window.config.colors.orange];
        const randomlySelectedColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    
        return randomlySelectedColor;
    } else if (type === 'order') {
        if (levelNumber % 2 === 1) {
            orderBasedColor = window.config.colors.blue;
        } else {
            orderBasedColor = window.config.colors.orange;
        }

        return orderBasedColor;
    }
}

function incrementTimer() {
    timerValueSeconds++;
    gameState.totalTime = timerValueSeconds;

    secondsFormatted++;

    if (secondsFormatted >= 60) {
        secondsFormatted = 0;
        minutesFormatted++;
    }
    
    gameState.totalTimeMinutes = minutesFormatted;
    gameState.totalTimeSeconds = secondsFormatted;

    document.querySelector('#clock').textContent =
        (minutesFormatted ? (minutesFormatted > 9 ? minutesFormatted : "0" + minutesFormatted) : "00") + ":" +
        (secondsFormatted > 9 ? secondsFormatted : "0" + secondsFormatted);

    startTimer();
}

function startTimer() {
    timer = setTimeout(incrementTimer, 1000);
}

function stopTimer(timer) {
    clearTimeout(timer);

    gameState.totalTimeFormatted = document.querySelector('#clock').textContent;
}

function goToNextLevel(e) {
    const optionsDivs = document.querySelectorAll('.option');
    
    for (var i = 0; i < optionsDivs.length; ++i) {
        optionsDivs[i].style.pointerEvents = 'none';
    }

    if (e && (e.type === 'touchend' || e.type === 'click')) {
        if (e.target.getAttribute('data-neighborhood-name') === window.correctAnswerOptionMetadata.name) {
            gameState.answeredCorrectly++;
            gameState.citySpecficMetrics.newYorkCity.boroughScores[window.correctAnswerOptionMetadata.borough].correct++;
        } else {
            gameState.answeredIncorrectly++;
        }

        e.target.classList.add('selectedAnswer');

        const optionDivs = document.querySelectorAll('.option');
        for (const optionDiv of optionDivs) {
            if (optionDiv.getAttribute('data-neighborhood-name') === window.correctAnswerOptionMetadata.name) {
                optionDiv.classList.add('correctAnswer');
            }
        }
    }

    delayToHideFirstLevel = 0;
    delayToHideCurrentLevelForEachSubsequentLevel = 1500;

    delayToShowFirstLevel = 500;
    delayToShowNextLevelForEachSubsequentLevel = 500;

    delayToShowAnswerOptionsForFirstLevel = 0;
    delayToShowAnswerOptionsForEachSubsequentLevel = 500;

    if(window.levelNumber === 0) {
        document.querySelector('#statusBar #level').textContent = `1 of ${window.config.maxNumLevels}`;
        document.getElementById('gameScreen').classList.add('gameInProgress');
        startTimer();
    }

    if (window.levelNumber === window.config.maxNumLevels) {
        // Stop game
        setTimeout(function() {
            mapDiv.style.opacity = 0;
            clearAnswerOptions();

            setTimeout(function() {            
                stopGame();
            }, delayToShowNextLevel);
        }, delayToHideCurrentLevel);
    } else {
        // Go to next level
        window.levelNumber++;
    
        const neighborhoodData = getNextNeighborhoodData();
        const mapCenter = getNeighborhoodCoordsCenter(neighborhoodData);
        const answerOptions = getAnswerOptions(neighborhoodData);

        if (window.levelNumber === 1) {
            delayToHideCurrentLevel = delayToHideFirstLevel;
            delayToShowNextLevel = delayToShowFirstLevel;
            delayToShowAnswerOptions = delayToShowAnswerOptionsForFirstLevel;
        } else {
            delayToHideCurrentLevel = delayToHideCurrentLevelForEachSubsequentLevel;
            delayToShowNextLevel = delayToShowNextLevelForEachSubsequentLevel;
            delayToShowAnswerOptions = delayToShowAnswerOptionsForEachSubsequentLevel;
        }
    
        setTimeout(function() {
            if (window.levelNumber !== 0) {
                mapDiv.style.opacity = 0;
                clearAnswerOptions();
            }

            setTimeout(function() {
                if(map.getLayer('neighborhood')) map.removeLayer('neighborhood');
                if(map.getSource('neighborhood')) map.removeSource('neighborhood');
        
                map.setCenter(mapCenter);
        
                map.addSource('neighborhood', {
                    'type': 'geojson',
                    'data': neighborhoodData.randomlySelectedNeighborhood
                });
    
                const fillColor = window.config.colors.orange;
            
                map.addLayer({
                    'id': 'neighborhood',
                    'type': 'fill',
                    'source': 'neighborhood',
                    'layout': {},
                    'paint': {
                        'fill-color': fillColor,
                        'fill-opacity': 1
                    }
                });

                document.querySelector('#statusBar #level').textContent = `${window.levelNumber} of ${window.config.maxNumLevels}`;

                setTimeout(function() {
                    mapDiv.style.opacity = 1;
                    
                    populateAnswerOptions(answerOptions, neighborhoodData);  
                }, delayToShowAnswerOptions);
            }, delayToShowNextLevel);
        }, delayToHideCurrentLevel);
    }
}

function initalizeMap() {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/leomancini/ck7dqwjzu1ezu1jlc9s6ardfc',
        center: [-73.935242, 40.730610],
        interactive: false,
        zoom: 11
    });

    return map;
}

function initalizeGame() {
    window.levelNumber = 0; // need to redo this
    map = initalizeMap();

    map.on('load', function() {
        map.resize();  
    });

    if (window.deviceType === 'mobile') {
        document.getElementById('startButton').addEventListener('touchend', getSelectedBoroughs);
        document.getElementById('startButton').addEventListener('touchend', startGame);
    } else {
        document.getElementById('startButton').addEventListener('click', getSelectedBoroughs);
        document.getElementById('startButton').addEventListener('click', startGame);
    }
    
    const optionDivs = document.querySelectorAll('.option');
    for (const optionDiv of optionDivs) {
        if (window.deviceType === 'mobile') {
            optionDiv.addEventListener('touchend', goToNextLevel);
        } else {
            optionDiv.addEventListener('click', goToNextLevel);
        }
    }
}

function startGame() {
    window.scrollTo(0, 0);
    document.getElementById('preGameOptionsScreen').classList.add('gameInProgress');

    gameState.citySpecficMetrics.newYorkCity.selectedBoroughs = window.selectedBoroughs

    goToNextLevel();
}

function stopGame() {
    gameState.cityDisplayName = 'New York City';
    const delayToShowGameOverScreen = delayToShowNextLevelForEachSubsequentLevel;
    stopTimer(timer);

    answeredCorrectlyPercentage = Math.round((gameState.answeredCorrectly / (gameState.answeredCorrectly + gameState.answeredIncorrectly)) * 100);
    gameState.answeredCorrectlyPercentage = answeredCorrectlyPercentage;

    // gameState.totalScore = answeredCorrectlyPercentage * gameState.totalTime;

    let seenBoroughScores = {};
    for (const boroughScore in gameState.citySpecficMetrics.newYorkCity.boroughScores) {
        if (gameState.citySpecficMetrics.newYorkCity.boroughScores[boroughScore].seen > 0) {
            seenBoroughScores[boroughScore] = {
                correctPercentage: Math.round((gameState.citySpecficMetrics.newYorkCity.boroughScores[boroughScore].correct / gameState.citySpecficMetrics.newYorkCity.boroughScores[boroughScore].seen) * 100),
                correct: gameState.citySpecficMetrics.newYorkCity.boroughScores[boroughScore].correct,
                seen: gameState.citySpecficMetrics.newYorkCity.boroughScores[boroughScore].seen
            }
        }
    }

    let totalTimeFormattedString = '';
    if (gameState.totalTimeMinutes > 0) {
        totalTimeFormattedString += `${gameState.totalTimeMinutes} minute`;
        if (gameState.totalTimeMinutes > 1) {
            totalTimeFormattedString += 's';
        }
    }

    if (gameState.totalTimeMinutes > 0 && gameState.totalTimeSeconds > 0) {
        totalTimeFormattedString += ' and ';
    }

    if (gameState.totalTimeSeconds > 0) {
        totalTimeFormattedString += `${gameState.totalTimeSeconds} second`;
        if (gameState.totalTimeSeconds > 1) {
            totalTimeFormattedString += 's';
        }
    }

    if (window.deviceType === 'mobile') {
        document.querySelector('#gameOverScreen #gameOverScreenContents #playAgainButton').addEventListener('touchend', restartGame);
    } else {
        document.querySelector('#gameOverScreen #gameOverScreenContents #playAgainButton').addEventListener('click', restartGame);
    }
    
    const seenBoroughScoresSortedByCorrectPercentage = Object.keys(seenBoroughScores).sort(function(a, b) { return seenBoroughScores[b]['correctPercentage'] - seenBoroughScores[a]['correctPercentage'] });

    let seenBoroughScoresHTML = '';

    for (i = 0; i < seenBoroughScoresSortedByCorrectPercentage.length; i++) {
        boroughName = seenBoroughScoresSortedByCorrectPercentage[i];

        seenBoroughScoresHTML += `<div class='boroughScoreRow'>
            <label>${boroughName}</label>
            <span class='scorePercentage'>${seenBoroughScores[boroughName].correctPercentage}%</span>
            <span class='scoreFraction'>${seenBoroughScores[boroughName].correct} of ${seenBoroughScores[boroughName].seen}</span>
        </div>`;
    }

    document.querySelector('#gameOverScreen #gameOverScreenContents #citySpecificMetricsWrapper .citySpecificMetrics#newYorkCity').innerHTML = seenBoroughScoresHTML;

    const boroughScoreRows = document.querySelector('.citySpecificMetrics#newYorkCity');

    if (window.deviceType === 'mobile') {
        boroughScoreRows.addEventListener('touchend', toggleBoroughScoreRowsScoreDisplayType);
    } else {
        boroughScoreRows.addEventListener('click', toggleBoroughScoreRowsScoreDisplayType);
    }

    document.querySelector('#gameOverScreen #gameOverScreenContents #totalTimeFormattedString').textContent = totalTimeFormattedString;
    document.querySelector('#gameOverScreen #gameOverScreenContents #answeredCorrectlyPercentage').textContent = `${gameState.answeredCorrectlyPercentage}%`;

    fetch(`helpers/shareImages/generateNewShareImage.php?answeredCorrectlyPercentage=${gameState.answeredCorrectlyPercentage}&totalTimeFormattedString=${encodeURIComponent(totalTimeFormattedString)}&cityDisplayName=${gameState.cityDisplayName}`).then((response) => {
        return response.json();
    }).then((response) => {
        shareImageShortHash = response.newShareImage.fileName.substr(window.config.shareImageHashDatePrefixLength, window.config.shareImageShortHashLength);

        document.getElementById('shareButton').classList.add('shareImageURLReady');

        if (navigator.share) {
            document.getElementById('shareButton').addEventListener('touchend', function() {
                showMobileShareSheet(shareImageShortHash);;
            });
        } else {
            document.getElementById('shareButton').classList.add('shareImageURLReady');

            const twitterShareButton = document.querySelector('#shareSheetDesktopContainer #modalContainer #modalContents .optionContainer#twitter');

            twitterShareButton.href = `${twitterShareButton.href}?text=What the Hood? ${gameState.cityDisplayName} – I got ${gameState.answeredCorrectlyPercentage}${encodeURIComponent('%')} correct and took ${encodeURIComponent(totalTimeFormattedString)}! ${config.baseURL}`;
            
            const facebookShareButton = document.querySelector('#shareSheetDesktopContainer #modalContainer #modalContents .optionContainer#facebook');

            facebookShareButton.addEventListener('click', function() {  
                FB.ui({
                    display: 'popup',
                    method: 'share',
                    href: `${config.baseURL}/share/${shareImageShortHash}`,
                }, function(response) { });
            });
            
            document.getElementById('shareButton').addEventListener('click', function() {
                showDesktopShareSheet();
            });
        }
    });

    setTimeout(function() {
        document.getElementById('gameScreen').classList.remove('gameInProgress');
        document.getElementById('gameOverScreen').classList.add('visible');
    }, delayToShowGameOverScreen);
}

function showMobileShareSheet(shareImageShortHash) {
    navigator.share({
        title: 'What the Hood?',
        url: `${config.baseURL}/share/${shareImageShortHash}`,
    })
}

function showDesktopShareSheet() {
    document.querySelector('#shareSheetDesktopContainer #modalContainer #modalContents #cancelButton').addEventListener('click', function() {  
        document.querySelector('#shareSheetDesktopContainer #modalContainer').classList.remove('visible');
        document.querySelector('#shareSheetDesktopContainer #backgroundOverlay').classList.remove('visible');

        setTimeout(function() {
            document.getElementById('shareSheetDesktopContainer').classList.remove('visible');
        }, 200);
    });

    document.getElementById('shareSheetDesktopContainer').classList.add('visible');
    document.querySelector('#shareSheetDesktopContainer #backgroundOverlay').classList.add('visible');
    document.querySelector('#shareSheetDesktopContainer #modalContainer').classList.add('visible');
}

function toggleBoroughScoreRowsScoreDisplayType(e) {
    const boroughScoreRows = e.target.closest('.citySpecificMetrics#newYorkCity');

    if (boroughScoreRows.classList.contains('scoreDisplayTypeFraction')) {
        boroughScoreRows.classList.remove('scoreDisplayTypeFraction');
        boroughScoreRows.classList.add('scoreDisplayTypePercentage');
    } else if (boroughScoreRows.classList.contains('scoreDisplayTypePercentage')) {
        boroughScoreRows.classList.remove('scoreDisplayTypePercentage');
        boroughScoreRows.classList.add('scoreDisplayTypeFraction');
    }
}

function restartGame() {
    document.querySelector('body').classList.add('reload');

    setTimeout(function() {
        location.reload();
    }, 500);
}