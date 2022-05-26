// Start ServiceWorker //
window.onload = () => {
    'use strict';

    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/Lolly/sw.js', {scope: '/Lolly/'});
    }
}
// End //

// Start Select Images //
document.getElementById('imgPicker').addEventListener('change', function(){
    getImgs();
});

function getImgs() {
    var imgs = document.getElementById('imgPicker').files;

    for(var i = 0; i < imgs.length; i++) {
        var isActive = (i == 0) ? ' active ' : '';
        const imageReader = new FileReader();
        imageReader.readAsDataURL(imgs[i]);
        imageReader.addEventListener('load', function() {
            document.getElementById('imageFrame').innerHTML += '<div class="carousel-item '+isActive+'"><img class="img-fluid d-block w-100" src="'+this.result+'" />';
        });
    };
};
// End Image Select //