function initVideoStream() {
    let video = document.querySelector('#sampleVideo');
    let videoSrc = '/stream/out.m3u8';
    if (Hls.isSupported()) {
	let hls = new Hls();
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
