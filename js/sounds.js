function WebAudio(src) {
    if(src) this.load(src);
}

WebAudio.prototype.audioContext = new AudioContext;

WebAudio.prototype.load = function(src) {
    if(src) this.src = src;
    console.log('Loading audio ' + this.src);
    var self = this;
    var request = new XMLHttpRequest;
    request.open("GET", this.src, true);
    request.responseType = "arraybuffer";
    request.onload = function() {
        self.audioContext.decodeAudioData(request.response, function(buffer) {
            if (!buffer) {
                if(self.onerror) self.onerror();
                return;
            }

            self.buffer = buffer;

            if(self.onload)
                self.onload(self);
        }, function(error) {
            self.onerror(error);
        });
    };
    request.send();
};

WebAudio.prototype.play = function() {
    var source = this.audioContext.createBufferSource();
    source.buffer = this.buffer;
    source.connect(this.audioContext.destination);
    source.start(0);
};


