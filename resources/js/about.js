let aboutScreenContentsPaddingTopAndBottom = 0;

if (window.deviceType === 'desktop') {
    aboutScreenContentsPaddingTopAndBottom = 120;
}

document.getElementById('about').style.paddingTop = `${aboutScreenContentsPaddingTopAndBottom}px`;
document.getElementById('about').style.paddingBottom = `${aboutScreenContentsPaddingTopAndBottom}px`;