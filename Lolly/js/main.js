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

function getImgs(evt) {
    evt.target.files.forEach(element => {
        const imageReader = new FileReader();
        imageReader.readAsDataURL(element);
        imageReader.addEventListener('load', function() {
            document.getElementById('imageFrame').innerHTML += '<img src="'+this.result+'" />'
        });
    });
};
// End Image Select //