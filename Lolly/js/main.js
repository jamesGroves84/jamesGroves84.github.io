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
    carouselWrap.id = 'carouselWrappy';
    carouselWrap.classList.add('carousel');
    carouselWrap.classList.add('slide');
    carouselWrap.setAttribute("data-bs-ride","carousel");

    var carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-inner');

    var carouselNextButton = document.createElement('button');
    carouselNextButton.classList.add('carousel-control-next'); 
    carouselNextButton.type='button'; 
    carouselNextButton.setAttribute('data-bs-target','#carouselWrappy');
    carouselNextButton.setAttribute('data-bs-slide','next');

    var carouselNextContent1 = document.createElement('span');
    carouselNextContent1.classList.add('carousel-control-next-icon'); 
    carouselNextContent1.setAttribute('aria-hidden','true');

    var carouselNextContent2 = document.createElement('span'); 
    carouselNextContent2.classList.add('visually-hidden');
    carouselNextContent2.innerHTML = 'Next';

    carouselNextButton.appendChild(carouselNextContent1);
    carouselNextButton.appendChild(carouselNextContent2);

    var carouselPrevButton = document.createElement('button');
    carouselPrevButton.classList.add('carousel-control-prev'); 
    carouselPrevButton.type='button'; 
    carouselPrevButton.setAttribute('data-bs-target','#carouselWrappy');
    carouselPrevButton.setAttribute('data-bs-slide','prev');

    var carouselPrevContent1 = document.createElement('span');
    carouselPrevContent1.classList.add('carousel-control-prev-icon'); 
    carouselPrevContent1.setAttribute('aria-hidden','true');

    var carouselPrevContent2 = document.createElement('span'); 
    carouselPrevContent2.classList.add('visually-hidden');
    carouselPrevContent2.innerHTML = 'Previous';

    carouselPrevButton.appendChild(carouselPrevContent1);
    carouselPrevButton.appendChild(carouselPrevContent2);

    document.querySelector('.imageLoader').classList.add('shown');

    for(var i = 0; i < imgs.length; i++) {
        const imageReader = new FileReader();
        imageReader.fileName = imgs[i].name;
        imageReader.readAsDataURL(imgs[i]);

        imageReader.addEventListener('load', function() {
            var carouselItem = document.createElement('div')
            carouselItem.classList.add('carousel-item');

            carouselItem.innerHTML ='<img class="d-block" src="'+this.result+'" alt="'+this.fileName+'">';
            carouselItem.style.backgroundImage = "url('"+this.result+"')";
          
            /* Center and scale the image nicely */
            carouselItem.style.backgroundPosition = "center";
            carouselItem.style.backgroundRepeat = "no-repeat";
            carouselItem.style.backgroundSize = "cover";
            carouselInner.appendChild(carouselItem); 
        });

        imageReader.addEventListener('progress', function(data){
            if (data.lengthComputable) {                                            
                var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                document.getElementById('imageLoading').innerHTML = "Loading: "+this.fileName;
                document.getElementById('progressbar').value = progress;
            }
        });

        imageReader.addEventListener('loaded', function(){
            document.querySelector('.imageLoader').classList.remove('shown');
        });
    };

    carouselWrap.appendChild(carouselInner);
    carouselWrap.appendChild(carouselPrevButton);
    carouselWrap.appendChild(carouselNextButton);
    document.getElementById('carousel-container').appendChild(carouselWrap);

    setTimeout(setActiveImg, 500);
};

function setActiveImg(){
    // Set first image as active
    document.getElementsByClassName('carousel-item')[0].classList.add('active');
    document.getElementById('endSlideshow').classList.add('blap');
}
// End Image Select //

function startCarousel() {
    const carousel = new bootstrap.Carousel('#carouselWrappy');
}

function endShow() {
    // Destroy the Slideshow
    document.getElementById('carousel-container').removeChild(document.getElementById('carouselWrappy'));
    // Hide the Exit Slideshow button
    document.getElementById('endSlideshow').classList.remove('blap');
    // Clear the Selected Files list
    document.getElementById('imgPicker').files = undefined;
}