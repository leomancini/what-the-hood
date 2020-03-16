function renderAllNeighborhoodShapes() {
    // Top
    renderNeighborhoodShape('g#neighborhood1', { x: 0, y: 0 }, { width: 350, height: 350 }, 'black', 'Lower East Side');

    // Left
    renderNeighborhoodShape('g#neighborhood2', { x: 200, y: 0 }, { width: 370, height: 500 }, 'orange', 'Red Hook');
    renderNeighborhoodShape('g#neighborhood3', { x: 10, y: 180 }, { width: 270, height: 240 }, 'blue', 'Governors Island');
    renderNeighborhoodShape('g#neighborhood4', { x: 200, y: 550 }, { width: 580, height: 570 }, 'black', 'Sunnyside');
    renderNeighborhoodShape('g#neighborhood5', { x: 80, y: 30 }, { width: 350, height: 420 }, 'orange', 'Financial District');
    renderNeighborhoodShape('g#neighborhood6', { x: 0, y: 600 }, { width: 450, height: 600 }, 'blue', 'Williamsburg');

    // Right
    renderNeighborhoodShape('g#neighborhood7', { x: 600, y: 600 }, { width: 820, height: 800 }, 'blue', 'Hunters Point/Long Island City');
    renderNeighborhoodShape('g#neighborhood8', { x: 80, y: 200 }, { width: 400, height: 440 }, 'orange', 'Inwood');
    renderNeighborhoodShape('g#neighborhood9', { x: 120, y: 200 }, { width: 400, height: 400 }, 'black', 'College Point');
    renderNeighborhoodShape('g#neighborhood10', { x: 0, y: 560 }, { width: 600, height: 640 }, 'blue', 'Midtown');

    // Bottom
    renderNeighborhoodShape('g#neighborhood11', { x: 0, y: 550 }, { width: 500, height: 600 }, 'orange', 'Wakefield');
}

renderAllNeighborhoodShapes();