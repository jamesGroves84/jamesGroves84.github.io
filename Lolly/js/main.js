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
        const imageReader = new FileReader();
        imageReader.readAsDataURL(imgs[i]);
        imageReader.addEventListener('load', function() {
            document.getElementById('imageFrame').innerHTML += '<img src="'+this.result+'" />';
        });
    };
};
// End Image Select //