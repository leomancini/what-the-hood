function selectGame(tappedGameSelector) {
    const selectedGameSelector = tappedGameSelector.target.closest('.gameSelector');

    if (selectedGameSelector.classList.contains('enabled')) {
        const selectedCityConfig = getCityConfig(selectedGameSelector.getAttribute('id'));

        const gameSelectors = document.querySelectorAll('.gameSelector');
    
        for (const gameSelector of gameSelectors) {
            if (selectedGameSelector !== gameSelector) {
                gameSelector.classList.add('notSelected');
            }
        }
    
        selectedGameSelector.children[0].classList.add('selected');
            
        if (selectedCityConfig.preGameOptionsScreen === true) {
            renderPreGameOptionsScreen(selectedCityConfig);
        }
        
        document.getElementById('bottomLinks').classList.add('hidden');

        setTimeout(function() {
            document.getElementById('gameSelectionScreen').classList.add('zoom');
            selectedGameSelector.classList.add('selected');

            if (window.deviceType === 'desktop') {
                selectedGameSelector.style.height = `${window.innerHeight}px`;
            }
    
            selectedGameSelector.style.top = `${document.querySelector('#gameSelectionScreen').scrollTop}px`;
    
            setTimeout(function() {
                selectedGameSelector.classList.add('selectedFullScreen');
                document.getElementById('gameSelectionScreen').classList.add('gameSelected');
                
                setTimeout(function() {
                    document.getElementById('gameSelectionScreen').classList.add('done');
                    
                    initalizeGame(selectedCityConfig);
                    
                    if (selectedCityConfig.preGameOptionsScreen === true) {
                        document.getElementById('preGameOptionsScreen').classList.add('visible');
                    } else {
                        prepareGame(selectedCityConfig);
                    }
                }, 400);
            }, 200);
        }, 400);
    }
}

function renderPreGameOptionsScreen(selectedCityConfig) {
    if (selectedCityConfig.id === 'new-york-city') {
        const boroughCheckboxes = document.querySelectorAll('.boroughCheckboxWrapper');

        for (const boroughCheckbox of boroughCheckboxes) {
            if (window.deviceType === 'mobile') {
                boroughCheckbox.addEventListener('touchend', toggleBoroughCheckbox);
            } else {
                boroughCheckbox.addEventListener('click', toggleBoroughCheckbox);
            }
        }
    }
}

function renderGameSelectors() {
    const   gameSelectors = document.querySelectorAll('.gameSelector'),
            gameSelectorCardHeight = Math.round(window.innerHeight / 3),
            gameSelectorCardMarginBottom = 30;

    let     gameSelectorIndex = 0,
            gameSelectionScreenContentsPaddingTop = 0,
            gameSelectionScreenContentsPaddingBottom = 0;

    if (window.deviceType === 'desktop') {
        gameSelectionScreenContentsPaddingTop = 120;
        gameSelectionScreenContentsPaddingBottom = 120;
    }
    
    for (const gameSelector of gameSelectors) {
        gameSelector.style.top = `${(gameSelectorIndex * (Math.clip(gameSelectorCardHeight, 184, gameSelectorCardHeight) + gameSelectorCardMarginBottom)) + gameSelectorCardMarginBottom + gameSelectionScreenContentsPaddingTop}px`;
        gameSelector.style.height = `${Math.clip(gameSelectorCardHeight, 184, gameSelectorCardHeight)}px`;
        gameSelectorIndex++;
        
        gameSelector.addEventListener('click', selectGame);
    }

    document.getElementById('bottomLinks').style.top = `${((gameSelectorIndex * (Math.clip(gameSelectorCardHeight, 184, gameSelectorCardHeight) + gameSelectorCardMarginBottom)) + gameSelectorCardMarginBottom) + gameSelectionScreenContentsPaddingTop}px`;

    const gameSelectionScreenContentsHeight = 
        gameSelectionScreenContentsPaddingTop
            + (
                (gameSelectorIndex * (Math.clip(gameSelectorCardHeight, 184, gameSelectorCardHeight) + gameSelectorCardMarginBottom))
                + gameSelectorCardMarginBottom
            )
            + document.getElementById('bottomLinks').offsetHeight
            + gameSelectionScreenContentsPaddingBottom;
    
    if (gameSelectionScreenContentsHeight > window.innerHeight) {
        document.getElementById('gameSelectionScreenContents').style.height = `${gameSelectionScreenContentsHeight}px`;
    } else {
        document.getElementById('gameSelectionScreenContents').style.height = '100%';
    }
    
    setTimeout(function() {
        document.querySelector('#gameSelectionScreenContents').style.opacity = 1;
    }, 500);
}

function toggleBoroughCheckbox(e) {
    const tappedBoroughCheckboxWrapper = e.target.closest('.boroughCheckboxWrapper');

    if (tappedBoroughCheckboxWrapper.classList.contains('on')) {
        if(document.querySelectorAll('input[type=checkbox].boroughCheckbox:checked').length > 1) {
            tappedBoroughCheckboxWrapper.classList.remove('on');
            tappedBoroughCheckboxWrapper.classList.add('off');
            tappedBoroughCheckboxWrapper.querySelector('input.boroughCheckbox').checked = false;
        }
    } else if (tappedBoroughCheckboxWrapper.classList.contains('off')) {
        tappedBoroughCheckboxWrapper.classList.remove('off');
        tappedBoroughCheckboxWrapper.classList.add('on');
        tappedBoroughCheckboxWrapper.querySelector('input.boroughCheckbox').checked = true;
    }
}

function getSelectedBoroughs() {
    var selectedBoroughs = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox].boroughCheckbox:checked');
    
    for (var i = 0; i < checkboxes.length; i++) {
        selectedBoroughs.push(checkboxes[i].value);
    }

    return selectedBoroughs;
}

window.addEventListener('resize', renderGameSelectors);

renderGameSelectors();