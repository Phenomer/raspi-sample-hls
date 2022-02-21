function initVideoStream() {
    let url = '/stream/manifest.mpd';
    let player = dashjs.MediaPlayer().create();
    player.initialize(document.querySelector('#sampleVideo'), url, true);
}

window.onload = ()=>{
    initVideoStream();
};
