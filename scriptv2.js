var conf = (function (filesElement, dragElement, galleryElement) {
    var configuration = configuration || {};
    var config = {
        fileInput : document.querySelector(filesElement),
        gallery : document.querySelector(galleryElement),
        dropZone : document.querySelector(dragElement),
    }

    Object.keys(config).forEach(function(key) {
        if (configuration[key]) { config[key] = configuration[key] }
    });

    return config;
})('#files', '#drag', '#gallery');

var handleFile = (function (conf) {


    function select(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var filesHolder;
        (evt.type == 'drop') ? (filesHolder = evt.dataTransfer.files) : (filesHolder = evt.target.files);

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
        return {
            select: select
        };

})(conf);


var thumbnails = (function() {
    function makeCanvas(img, width, height) {
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
    return {
        makeCanvas: makeCanvas
    }
})();

var fileUp = (function (conf) {

    function input() {
        conf.fileInput.addEventListener('change', handleFile.select, false);
    }
    return {
            input:input()    
        };
})(conf);


var dragAndDrop = (function(dragElement) {
    
    function drag() {
        function handleDragOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        }
    // Setup the dnd listeners.

        conf.dropZone.addEventListener('dragover', handleDragOver, false);
        conf.dropZone.addEventListener('drop', handleFile.select, false);
    };

    
    return {
        drag:drag()
    };
})(conf);
