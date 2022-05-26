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
    let imgs = document.getElementById('imgPicker').files;

    imgs.forEach(img => {
        const imageReader = new FileReader();
        imageReader.readAsDataURL(img);
        imageReader.addEventListener('load', function() {
            document.getElementById('imageFrame').innerHTML += '<img src="'+this.result+'" />'
        });
    });
};
// End Image Select //