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
    document.getElementById('carousel-container').innerHTML = '';
    getImgs();
});

function getImgs() {
    var imgs = document.getElementById('imgPicker').files;

    var carouselWrap = document.createElement('div');
    carouselWrap.classList.add('carousel');
    carouselWrap.classList.add('slide');
    carouselWrap.setAttribute("data-ride","carousel");

    var carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-inner');

    for(var i = 0; i < imgs.length; i++) {
        const imageReader = new FileReader();
        imageReader.readAsDataURL(imgs[i]);

        imageReader.addEventListener('load', function() {
            var carouselItem = document.createElement('div')
            carouselItem.classList.add('carousel-item');

            carouselItem.innerHTML ='<img class="img-fluid d-block w-100" src="'+this.result+'" />';
            carouselInner.appendChild(carouselItem); 
        });
    };

    carouselWrap.appendChild(carouselInner);
    document.getElementById('carousel-container').appendChild(carouselWrap);

    setTimeout(setActiveImg, 2500);
};

function setActiveImg(){
    // Set first image as active
    document.getElementsByClassName('carousel-item')[0].classList.add('active');
}
// End Image Select //