var thumbnails = (function() {
    return {
        makeCanvas: function makeCanvas(img, width, height) {
            var canvas = document.createElement('canvas'),
                canvasUrl = document.createElement('a'),
                ctx = canvas.getContext('2d');

            canvas.width = width;
            canvas.height = height;  
            canvasUrl.setAttribute("href", img.src);
            canvasUrl.setAttribute("target", "_blank");
            canvasUrl.appendChild(canvas);            

            img.onload = function() {
                ctx.drawImage(img, 0, 0, width, height);
            };
            return canvasUrl;
        }
    }
})();

var fileUp = (function (filesElement, galleryElement) {
    var conf = {
        fileInput : document.querySelector(filesElement),
        gallery : document.querySelector(galleryElement)
    };

    //fileInput.onchange 
    function handleFileSelect(evt) {

        var filesHolder = evt.target.files;
        for (var i = 0, file;
            (file = filesHolder[i]); i++) {
            var reader = new FileReader();

            // Only process image files.
            if (file.type.match("image.*")) {

                reader.onload = function() {
                    var img = new Image();
                    img.src = this.result;
                    //thumbnails
                    conf.gallery.appendChild(thumbnails.makeCanvas(img, 150, 150));
                }

                // Read in the image file as a data URL.
                reader.readAsDataURL(file);
            }
        }
    }

    conf.fileInput.addEventListener('change', handleFileSelect, false);

    return {
        
    };
})('#files', '#gallery');


var draggAndDrop = (function(draggElement, galleryElement) {
    var conf = {
        dropZone : document.querySelector(draggElement),
        gallery : document.querySelector(galleryElement)
    };
    
    //files handler
    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var filesHolder = evt.dataTransfer.files;

        for (var i = 0, file;
            (file = filesHolder[i]); i++) {
            var reader = new FileReader();

            // Only process image files.
            if (file.type.match("image.*")) {

                reader.onload = function() {
                    var img = new Image();
                    img.src = this.result;
                    //thumbnails
                    conf.gallery.appendChild(thumbnails.makeCanvas(img, 150, 150));
                }

                // Read in the image file as a data URL.
                reader.readAsDataURL(file);
            }
        }
    }


    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }
    // Setup the dnd listeners.

    conf.dropZone.addEventListener('dragover', handleDragOver, false);
    conf.dropZone.addEventListener('drop', handleFileSelect, false);

    return {

    };
})('#dragg', '#gallery');
