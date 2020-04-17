if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.deviceType = 'mobile';
} else {
    window.deviceType = 'desktop';
}

function selectGame(tappedGameSelector) {
    const selectedGameSelector = tappedGameSelector.target.closest('.gameSelector');

    if (selectedGameSelector.classList.contains('enabled')) {
        const gameSelectors = document.querySelectorAll('.gameSelector');
    
        for (const gameSelector of gameSelectors) {
            if (selectedGameSelector !== gameSelector) {
                gameSelector.classList.add('notSelected');
            }
        }
    
        selectedGameSelector.children[0].classList.add('hidden');
        
        setTimeout(function() {
            document.getElementById('gameSelectionScreen').classList.add('zoom');
            selectedGameSelector.children[0].classList.add('selected');
            selectedGameSelector.classList.add('selected');
            selectedGameSelector.style.height = `${window.innerHeight}px`;
    
            selectedGameSelector.style.top = `${document.querySelector('#gameSelectionScreen').scrollTop}px`;
    
            setTimeout(function() {
                selectedGameSelector.classList.add('selectedFullScreen');
                document.getElementById('gameSelectionScreen').classList.add('gameSelected');
            }, 200);
        }, 100);
    
        document.querySelector('body').classList.add('fixScrollDuringGame');
    
        setTimeout(function() {
            document.getElementById('gameSelectionScreen').classList.add('done');
            document.getElementById('preGameOptionsScreen').classList.add('visible');
        }, 800);
    }
}

function renderGameSelectors() {
    const gameSelectors = document.querySelectorAll('.gameSelector');

    let gameSelectorIndex = 0;
    const gameSelectorCardHeight = 300;
    const gameSelectorCardMarginBottom = 30;
    
    for (const gameSelector of gameSelectors) {
        gameSelector.style.top = `${(gameSelectorIndex * (gameSelectorCardHeight + gameSelectorCardMarginBottom)) + gameSelectorCardMarginBottom}px`;
        gameSelector.style.height = `${gameSelectorCardHeight}px`;
        gameSelectorIndex++;
        
        gameSelector.addEventListener('click', selectGame);
    }

    const bottomLinksHeight = document.getElementById('bottomLinks').offsetHeight;
    const bottomLinksMarginTop = 5;
    
    document.getElementById('gameSelectionScreenContents').style.height = `${(gameSelectorIndex * (gameSelectorCardHeight + gameSelectorCardMarginBottom)) + gameSelectorCardMarginBottom + bottomLinksHeight + bottomLinksMarginTop}px`;
    
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

    window.selectedBoroughs = selectedBoroughs;
    
    initalizeGame();
}

function renderBoroughCheckboxes() {
    const boroughCheckboxes = document.querySelectorAll('.boroughCheckboxWrapper');

    for (const boroughCheckbox of boroughCheckboxes) {
        if (window.deviceType === 'mobile') {
            boroughCheckbox.addEventListener('touchend', toggleBoroughCheckbox);
        } else {
            boroughCheckbox.addEventListener('click', toggleBoroughCheckbox);
        }
    }
}

renderGameSelectors();
renderBoroughCheckboxes();