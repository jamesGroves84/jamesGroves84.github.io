// Start ServiceWorker //
window.onload = () => {
    'use strict';

    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/Lolly-sw.js');
    }
}
// End //

// Start set Image Dir //
var imageDir = '/Lolly/images/tmpDisplay/';
//