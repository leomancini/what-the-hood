function addMetadataToNeighborhoodList(neighborhoodDatabase) {
    const neighborhoodDatabaseWithBoroughs = neighborhoodDatabase.map(neighborhoodData => {
        // console.log(neighborhoodData.metadata.name);

        let neighborhoodNameURLFormatted = encodeURIComponent(neighborhoodData.metadata.name);
        let cityNameURLFormatted = encodeURIComponent('New York City');

        const openstreetmapLookupResponseData = $.ajax({
            url: `https://nominatim.openstreetmap.org/search/?q=${neighborhoodNameURLFormatted}%20${cityNameURLFormatted}&format=json`,
            type: 'GET',   
            dataType: 'json',
            cache: false,
            async: false
        }).responseText;

        const openstreetmapLookupResponse = JSON.parse(openstreetmapLookupResponseData);
        
        let borough = null;

        neighborhoodDataWithBorough = neighborhoodData;

        if (openstreetmapLookupResponse && openstreetmapLookupResponse[0]) {
            if (openstreetmapLookupResponse[0].display_name.includes('Queens, Queens County')) {
                borough = 'Queens';
            } else if (openstreetmapLookupResponse[0].display_name.includes('Brooklyn, Kings County')) {
                borough = 'Brooklyn';
            } else if (openstreetmapLookupResponse[0].display_name.includes('The Bronx, Bronx County')) {
                borough = 'The Bronx';
            } else if (openstreetmapLookupResponse[0].display_name.includes('Manhattan, New York County')) {
                borough = 'Manhattan';
            } else if (openstreetmapLookupResponse[0].display_name.includes('Staten Island, Richmond County')) {
                borough = 'Staten Island';
            }

            // console.log(`${neighborhoodData.metadata.name} is in ${boroughLabel}`);

            if (borough) {
                neighborhoodDataWithBorough.metadata.borough = borough;
            } else {
                neighborhoodDataWithBorough.metadata.borough = 'UNDEFINED';
            }
        } else {
            neighborhoodDataWithBorough.metadata.borough = 'UNDEFINED';
        }

        return neighborhoodDataWithBorough;
    });

    console.log(neighborhoodDatabaseWithBoroughs);

    return neighborhoodDatabaseWithBoroughs;
}

document.getElementById('output').innerHTML = JSON.stringify(addMetadataToNeighborhoodList(neighborhoodDatabase), undefined, 2);