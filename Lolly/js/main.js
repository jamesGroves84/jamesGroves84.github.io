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
    var imgs = [...document.getElementById('imgPicker').files];

    var carouselWrap = document.createElement('div');
    carouselWrap.id = 'carouselWrappy';
    carouselWrap.classList.add('carousel');
    carouselWrap.classList.add('slide');
    carouselWrap.setAttribute("data-bs-pause","false");

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

    imgs.forEach((img, idx) => {
        const imageReader = new FileReader();
        imageReader.fileName = img.name;
        imageReader.readAsDataURL(img);

        imageReader.addEventListener('load', function() {
            var carouselItem = document.createElement('div')
            carouselItem.classList.add('carousel-item');
            if(idx == 0) carouselItem.classList.add('active');
            carouselItem.innerHTML ='<img class="d-block" src="'+this.result+'" alt="'+this.fileName+'">';
            carouselItem.style.backgroundImage = "url('"+this.result+"')";
            /* Center and scale the image nicely */
            carouselItem.style.backgroundPosition = "center";
            carouselItem.style.backgroundRepeat = "no-repeat";
            carouselItem.style.backgroundSize = "cover";
            carouselInner.appendChild(carouselItem); 
            document.querySelector('.imageLoader').classList.add('shown');
        });

        imageReader.addEventListener('progress', function(data){
            if (data.lengthComputable) {                                            
                var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                document.getElementById('imageLoading').innerHTML = "Loading: "+this.fileName;
                document.getElementById('progressbar').value = progress;
            }
        });

        imageReader.addEventListener('loadend', function(){
            document.querySelector('.imageLoader').classList.remove('shown');
        });
    });

    carouselWrap.appendChild(carouselInner);
    carouselWrap.appendChild(carouselPrevButton);
    carouselWrap.appendChild(carouselNextButton);
    document.getElementById('carousel-container').appendChild(carouselWrap);
    window.setTimeout(setActiveImg,500);
};

function setActiveImg(){
    // Set first image as active
    // document.getElementsByClassName('carousel-item')[0].classList.add('active');
    document.getElementById('endSlideshow').classList.add('blap');

    const carousel = new bootstrap.Carousel('#carouselWrappy');
    carousel.cycle(); // Start the Carousel

    // Trigger wakeLock
    try {
        const wakeLock = await navigator.wakeLock.request('screen');
    } catch (err) {
        // the wake lock request fails - usually system related, such being low on battery
        console.log(`${err.name}, ${err.message}`);
    }
}
// End Image Select //

function endShow() {
    // Destroy the Slideshow
    document.getElementById('carousel-container').removeChild(document.getElementById('carouselWrappy'));
    // Hide the Exit Slideshow button
    document.getElementById('endSlideshow').classList.remove('blap');
    // Clear the Selected Files list
    document.getElementById('imgPicker').value = null;
}