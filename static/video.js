function initVideoStream() {
    var video = document.getElementById('sampleVideo');
    var videoSrc = '/stream/out.m3u8';
    if (Hls.isSupported()) {
	var hls = new Hls();
	hls.loadSource(videoSrc);
	hls.attachMedia(video);
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
	video.src = videoSrc;
    }
}

window.onload = ()=>{
    initVideoStream();    
};
