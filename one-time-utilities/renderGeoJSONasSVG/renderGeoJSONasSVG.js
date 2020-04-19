function renderNeighborhoodShape(neighborhoodId, position, size, colorId, neighborhoodName) {
    const colors = {
        'blue': '#0075FF',
        'orange': '#FF6600',
        'black': '#000000',
        'white': '#FFFFFF'
    };

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

renderNeighborhoodShape('g#neighborhood1', { x: 200, y: 0 }, { width: 370, height: 500 }, 'orange', 'Red Hook');
renderNeighborhoodShape('g#neighborhood2', { x: 10, y: 180 }, { width: 270, height: 240 }, 'blue', 'Governors Island');
renderNeighborhoodShape('g#neighborhood3', { x: 390, y: 10 }, { width: 600, height: 690 }, 'black', 'Middle Village');