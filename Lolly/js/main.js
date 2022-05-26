// Start ServiceWorker //
window.onload = () => {
    'use strict';

    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/Lolly/sw.js', {scope: '/Lolly/'});
    }

    const carousel = new bootstrap.Carousel('#carouselWrappy');
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
    carouselWrap.id = 'carouselWrappy';
    carouselWrap.classList.add('carousel');
    carouselWrap.classList.add('slide');
    carouselWrap.setAttribute("data-bs-ride","carousel");

    var carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-inner');
    carouselInner.classList.add('d-flex');
    carouselInner.classList.add('justify-content-center');
    carouselInner.classList.add('align-items-center');

    for(var i = 0; i < imgs.length; i++) {
        const imageReader = new FileReader();
        imageReader.readAsDataURL(imgs[i]);

        imageReader.addEventListener('load', function() {
            var carouselItem = document.createElement('div')
            carouselItem.classList.add('carousel-item');
            // carouselItem.setAttribute("data-bs-interval","500");

            carouselItem.innerHTML ='<img class="d-block w-100 h-100" src="'+this.result+'">';
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