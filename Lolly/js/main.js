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
document.getElementById('imgPicker').addEventListener('change', readMultipleFiles, false);

function readMultipleFiles(evt) {
 //Retrieve all the files from the FileList object
 var files = evt.target.files; 

 if (files) {
     for (var i=0, f; f=files[i]; i++) {
           var r = new FileReader();
         r.onload = (function(f) {
             return function(e) {
                 var contents = e.target.result;
                 document.getElementById('imageFrame').innerHTML+='<h2>' + f.name + '</h2><img src="learn/' + f.name + '"/>';
             };
         })(f);

         r.readAsText(f);
     }   
 } else {
       alert("Failed to load files"); 
 }
}
//