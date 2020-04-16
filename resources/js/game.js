function getNextNeighborhoodData() {
    const selectedBoroughs = window.selectedBoroughs;

    const neighborhoodDatabaseSelectedBoroughsOnly = window.neighborhoodDatabaseWithoutPreviousRandomlySelectedNeighborhoods.filter((neighborhood) => {
        if(selectedBoroughs.includes(neighborhood.metadata.borough)) {
            return true;
        }
    });

    const randomlySelectedNeighborhood = neighborhoodDatabaseSelectedBoroughsOnly[Math.floor(Math.random() * neighborhoodDatabaseSelectedBoroughsOnly.length)];

    window.neighborhoodDatabaseWithoutPreviousRandomlySelectedNeighborhoods = window.neighborhoodDatabaseWithoutPreviousRandomlySelectedNeighborhoods.filter((neighborhood) => {
        if(neighborhood !== randomlySelectedNeighborhood) {
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

    const shuffledAnswerOptions = answerOptions.sort(() => Math.random() - 0.5);

    window.correctAnswerOption = neighborhoodData.randomlySelectedNeighborhood.metadata.name;

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
        // if (optionsDivs[i].getAttribute('data-neighborhood-name') === neighborhoodData.randomlySelectedNeighborhood.metadata.name) {
        // }
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
        const availableColors = [config.colors.blue, config.colors.orange];
        const randomlySelectedColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    
        return randomlySelectedColor;
    } else if (type === 'order') {
        if (levelNumber % 2 === 1) {
            orderBasedColor = config.colors.blue;
        } else {
            orderBasedColor = config.colors.orange;
        }

        return orderBasedColor;
    }
}

let timer;
let secondsRaw = 0, secondsFormatted = 0, minutesFormatted = 0;

function incrementTimer() {
    secondsRaw++;
    gameState.totalTime = secondsRaw;

    secondsFormatted++;

    if (secondsFormatted >= 60) {
        secondsFormatted = 0;
        minutesFormatted++;
    }
    
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
    if (e && (e.type === 'touchend' || e.type === 'click')) {
        if (e.target.getAttribute('data-neighborhood-name') === window.correctAnswerOption) {
            gameState.answeredCorrectly++;
        } else {
            gameState.answeredIncorrectly++;
        }

        e.target.classList.add('selectedAnswer');

        const optionDivs = document.querySelectorAll('.option');
        for (const optionDiv of optionDivs) {
            if (optionDiv.getAttribute('data-neighborhood-name') === window.correctAnswerOption) {
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
        document.getElementById('gameScreen').classList.add('gameInProgress');
        document.querySelector('#statusBar #level').textContent = `1 of ${config.maxNumLevels}`;

        startTimer();
    }

    if (window.levelNumber === config.maxNumLevels) {
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
    
                const fillColor = config.colors.orange;
            
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

                document.querySelector('#statusBar #level').textContent = `${window.levelNumber} of ${config.maxNumLevels}`;

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

    goToNextLevel();
}

function stopGame() {
    const delayToShowGameOverScreen = 0;
    stopTimer(timer);

    answeredCorrectlyPercentage = gameState.answeredCorrectly / (gameState.answeredCorrectly + gameState.answeredIncorrectly);
    gameState.answeredCorrectlyPercentage = answeredCorrectlyPercentage;

    // gameState.totalScore = answeredCorrectlyPercentage * gameState.totalTime;

    setTimeout(function() {
        document.getElementById('gameScreen').classList.remove('gameInProgress');
        document.getElementById('gameScreen').classList.add('gameOver');
        document.getElementById('gameOverScreen').classList.add('visible');

        document.querySelector('#gameOverScreen #gameOverScreenContents #clock').textContent = gameState.totalTimeFormatted;
        document.querySelector('#gameOverScreen #gameOverScreenContents #answerTotals #answeredCorrectly').textContent = gameState.answeredCorrectly;
        document.querySelector('#gameOverScreen #gameOverScreenContents #answerTotals #answeredIncorrectly').textContent = gameState.answeredIncorrectly;
    }, delayToShowGameOverScreen);
}

let gameState = {
    totalTime: 0,
    totalTimeFormatted: '',
    answeredCorrectly: 0,
    answeredIncorrectly: 0,
    answeredCorrectlyPercentage: 0,
    totalScore: 0
};

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvbWFuY2luaSIsImEiOiJjazdkbzZiYmkyMjlqM2xwNm5xdXJ0bTcyIn0.UN3YLKP-fEJbPFEY0e0PDw';

let map;
const mapDiv = document.querySelector('#map');
window.selectedBoroughs = [];
window.neighborhoodDatabaseWithoutPreviousRandomlySelectedNeighborhoods = neighborhoodDatabase;

getSelectedBoroughs();