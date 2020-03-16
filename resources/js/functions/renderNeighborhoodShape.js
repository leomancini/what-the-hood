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