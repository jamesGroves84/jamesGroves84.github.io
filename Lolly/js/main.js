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

    // document.getElementById('carousel-container').innerHTML = '<div class="carousel slide" data-ride="carousel"><div id="imageFrame" class="carousel-inner"></div></div>';

    var carouselWrap = document.createElement('div');
    carouselWrap.classList.add('carousel');
    carouselWrap.classList.add('slide');
    carouselWrap.setAttribute("data-ride","carousel");

    var carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-inner');

    for(var i = 0; i < imgs.length; i++) {
        var firstImg = (i == 0) ? ' active ' : '';

        const imageReader = new FileReader();
        imageReader.readAsDataURL(imgs[i]);
        imageReader.addEventListener('load', function() {
            var carouselItem = document.createElement('div')
            carouselItem.classList.add('carousel-item');
            if(firstImg) carouselItem.classList.add(firstImg);
            carouselItem.innerHTML ='<img class="img-fluid d-block w-100" src="'+this.result+'" />';
            carouselInner.appendChild(carouselItem);
        });
    };

    carouselWrap.appendChild(carouselInner);
    document.getElementById('carousel-container').appendChild(carouselWrap);
};
// End Image Select //