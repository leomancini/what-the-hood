if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.deviceType = 'mobile';
} else {
    window.deviceType = 'desktop';
}

Math.clip = function(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

function averageGeolocation(coords) {
    // Source: https://gist.github.com/tlhunter/0ea604b77775b3e7d7d25ea0f70a23eb
    // http://stackoverflow.com/a/14231286/538646

    if (coords.length === 1) {
        return coords[0];
    }

    let x = 0.0;
    let y = 0.0;
    let z = 0.0;

    for (let coord of coords) {
        let latitude = coord.latitude * Math.PI / 180;
        let longitude = coord.longitude * Math.PI / 180;

        x += Math.cos(latitude) * Math.cos(longitude);
        y += Math.cos(latitude) * Math.sin(longitude);
        z += Math.sin(latitude);
    }

    let total = coords.length;

    x = x / total;
    y = y / total;
    z = z / total;

    let centralLongitude = Math.atan2(y, x);
    let centralSquareRoot = Math.sqrt(x * x + y * y);
    let centralLatitude = Math.atan2(z, centralSquareRoot);

    return [
        centralLatitude * 180 / Math.PI,
        centralLongitude * 180 / Math.PI
    ];
}

function getCityConfig(cityID) {
    const cityConfig = window.config.cities.filter(function (city) {
        return city.id === cityID;
    });

    return cityConfig[0];
}

function getConfig() {
    fetch('config.json')
        .then((response) => {
            return response.json();
        })
        .then((config) => {
            window.config = config;
            mapboxgl.accessToken = config.mapboxAccessToken;

            loadNeighborhoodData();
        });
}