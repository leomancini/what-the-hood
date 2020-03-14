function getSelectedBoroughs() {
    var selectedBoroughs = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox].boroughCheckbox:checked');
    
    for (var i = 0; i < checkboxes.length; i++) {
        selectedBoroughs.push(checkboxes[i].value);
    }

    window.selectedBoroughs = selectedBoroughs;

    initalizeGame();
}

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

    console.log(randomlySelectedNeighborhood.metadata.name);

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

    const offsetMapCenter = [neighborhoodCoordsCenter[0], neighborhoodCoordsCenter[1]-0.02];

    return offsetMapCenter;
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
    document.querySelector('.option#A label').innerHTML = answerOptions[0];
    document.querySelector('.option#A').setAttribute('data-neighborhood-name', answerOptions[0]);

    document.querySelector('.option#B label').innerHTML = answerOptions[1];
    document.querySelector('.option#B').setAttribute('data-neighborhood-name', answerOptions[1]);

    document.querySelector('.option#C label').innerHTML = answerOptions[2];
    document.querySelector('.option#C').setAttribute('data-neighborhood-name', answerOptions[2]);

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
        optionsDivs[i].querySelector('label').innerHTML = '';
    }
}

function updateStatusBar(status) {
    const delayToShowStatus = 500;

    if (status === 'correct') {
        document.querySelector('#statusBar #correct').style.opacity = 1;
        setTimeout(function() {
            document.querySelector('#statusBar #correct').style.opacity = 0;
        }, delayToShowStatus);
    } else if (status === 'wrong') {
        document.querySelector('#statusBar #wrong').style.opacity = 1;

        setTimeout(function() {
            document.querySelector('#statusBar #wrong').style.opacity = 0;
        }, delayToShowStatus);
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
    if (e && e.type === 'click') {
        if (e.target.getAttribute('data-neighborhood-name') === window.correctAnswerOption) {
            updateStatusBar('correct');

            gameState.answeredCorrectly++;
        } else {
            updateStatusBar('wrong');

            gameState.answeredIncorrectly++;
        }
    }

    if (window.levelNumber === config.maxNumLevels) {
        // Stop game

        stopGame();
    } else {
        // Go to next level
        updateStatusBar();

        window.levelNumber++;

        document.querySelector('#statusBar #info').textContent = `Level ${window.levelNumber} of ${config.maxNumLevels}`;
    
        const neighborhoodData = getNextNeighborhoodData();
        const offsetMapCenter = getNeighborhoodCoordsCenter(neighborhoodData);
        const answerOptions = getAnswerOptions(neighborhoodData);

        if (window.levelNumber !== 0) {
            mapContainer.style.opacity = 0;
            clearAnswerOptions();
        }
    
        setTimeout(function() {
            if(map.getLayer('neighborhood')) map.removeLayer('neighborhood');
            if(map.getSource('neighborhood')) map.removeSource('neighborhood');
    
            map.setCenter(offsetMapCenter);
    
            map.addSource('neighborhood', {
                'type': 'geojson',
                'data': neighborhoodData.randomlySelectedNeighborhood
            });
        
            map.addLayer({
                'id': 'neighborhood',
                'type': 'fill',
                'source': 'neighborhood',
                'layout': {},
                'paint': {
                    'fill-color': '#3291FF',
                    'fill-opacity': 1
                }
            });
        
            setTimeout(function() {
                mapContainer.style.opacity = 1;
        
                populateAnswerOptions(answerOptions, neighborhoodData);  
            }, 300);
        }, 500);
    }
}

function initalizeMap() {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/leomancini/ck7dqwjzu1ezu1jlc9s6ardfc',
        center: [-73.935242, 40.730610],
        interactive: false,
        zoom: 12
    });

    return map;
}

function initalizeGame() {
    window.levelNumber = 0; // need to redo this
    map = initalizeMap();

    document.getElementById('startScreen').classList.remove('mapReady');
    document.getElementById('startButton').innerHTML = 'Loading...';
    
    map.on('load', function() {
        map.resize();

        document.getElementById('startScreen').classList.add('mapReady');
        document.getElementById('startButton').innerHTML = 'Start';
        document.getElementById('startButton').addEventListener('click', startGame);   
    });
    
    const optionDivs = document.querySelectorAll('.option');
    for (const optionDiv of optionDivs) {
        optionDiv.addEventListener('click', goToNextLevel);
    }
}

function startGame() {
    startTimer();
    goToNextLevel();
    
    document.getElementById('startScreen').classList.add('gameStarted');
}

function stopGame() {
    stopTimer(timer);

    mapContainer.style.opacity = 0;
    clearAnswerOptions();

    answeredCorrectlyPercentage = gameState.answeredCorrectly / (gameState.answeredCorrectly + gameState.answeredIncorrectly);
    gameState.answeredCorrectlyPercentage = answeredCorrectlyPercentage;

    // gameState.totalScore = answeredCorrectlyPercentage * gameState.totalTime;

    setTimeout(function() {
        document.getElementById('gameScreen').classList.add('gameOver');
        document.getElementById('gameOverScreen').classList.add('visible');

        document.querySelector('#gameOverScreen #content #clock').textContent = gameState.totalTimeFormatted;
        document.querySelector('#gameOverScreen #content #answerTotals #answeredCorrectly').textContent = gameState.answeredCorrectly;
        document.querySelector('#gameOverScreen #content #answerTotals #answeredIncorrectly').textContent = gameState.answeredIncorrectly;
    }, 1000);
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

const boroughCheckboxes = document.querySelectorAll('input[type=checkbox].boroughCheckbox');

for (const boroughCheckbox of boroughCheckboxes) {
    boroughCheckbox.addEventListener('click', getSelectedBoroughs);
}

let map;
const mapContainer = document.querySelector('#map');
window.selectedBoroughs = [];
window.neighborhoodDatabaseWithoutPreviousRandomlySelectedNeighborhoods = neighborhoodDatabase;

getSelectedBoroughs();