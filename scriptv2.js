var fileUp = (function() {
    var fileInput = document.querySelector("#files"),
        dropZone = document.querySelector("#dragg"),
        thumb = document.querySelector("#thumbnails"),
        gallery = document.querySelector("#gallery");
    //Event recognition
    function filesHolder(evt) {
            var filesHolder;
            if (evt.type == 'drop') {
                filesHolder = evt.dataTransfer.files; // FileList object from dnd
            } else if (evt.type == 'change') {
                filesHolder = evt.target.files; // FileList object from input
            }
            return filesHolder || false;
        }
        //Making canvas with an image, and link on it.
    function makeCanvas(img) {
            var canvas = document.createElement('canvas'),
                canvasUrl = document.createElement('a'),
                ctx = canvas.getContext('2d');
            canvas.width = 150;
            canvas.height = 150;
            // Append
            gallery.appendChild(canvasUrl);
            var canvasHref = document.createAttribute("href"),
                canvasTarget = document.createAttribute("target");
            canvasHref.value = img.src;
            canvasTarget.value = "_blank";
            canvasUrl.setAttribute(canvasHref);
            canvasUrl.setAttribute(canvasTarget);
            canvasUrl.appendChild(canvas);
            img.onload = function() {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        }
        //fileInput.onchange 
    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        for (var i = 0, file;
            (file = filesHolder(evt)[i]); i++) {
            var reader = new FileReader();
            // Only process image files.
            if (file.type.match("image.*")) {
                reader.onload = function() {
                        var img = new Image();
                        img.src = this.result;
                        //thumbnails
                        makeCanvas(img)
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
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
    fileInput.addEventListener('change', handleFileSelect, false);
})();
