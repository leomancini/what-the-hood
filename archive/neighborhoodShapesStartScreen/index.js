function renderNeighborhoodShape(neighborhoodId, position, size, colorId, neighborhoodName) {
    const colors = config.colors;

    const projection = d3.geoMercator().scale(1000000).translate([ position.x, position.y ]);
    const geoGenerator = d3.geoPath().projection(projection);
    
    const neighborhoodData = neighborhoodDatabase.filter((neighborhoodData) => {
        if (neighborhoodData.metadata.name === neighborhoodName) {
            return true;
        }
    })[0];

    const neighborhoodShape = d3.select(neighborhoodId).selectAll('path').data([
        neighborhoodData
    ]);
    
    projection.center(neighborhoodData.geometry.coordinates[0][0]);
    
    neighborhoodShape.enter().append('path').attr('d', geoGenerator);

    document.querySelector(neighborhoodId).parentElement.style.width = size.width;
    document.querySelector(neighborhoodId).parentElement.style.height = size.height;

    document.querySelector(neighborhoodId).setAttribute('fill', colors[colorId]);
}

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