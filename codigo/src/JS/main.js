/*
> Seria interessante algo como: 
> aside = conteudo aside da página
> $('.telaInteira').prepend(aside);
*/

console.log('main.js');

import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = jQuery;
await import("jquery-ui-dist/jquery-ui.min.js");

var currentAudio = null;
function stopSound() {
    // if (currentAudio) {
    //     currentAudio.pause();
    //     currentAudio.currentTime = 0;
    //     currentAudio = null;
    // }
}
function whooshMid() {
    // if (currentAudio) {
    //     currentAudio.pause();
    //     currentAudio.currentTime = 0;
    //     currentAudio = null;
    // }
    // var audio = new Audio('../MP3/whooshMid.mp3');
    // audio.volume = 0.3;
    // audio.play();
    // currentAudio = audio;
}
function whooshLow(e) {
    // if ($(e).hasClass('active')) return;
    // if (currentAudio) {
    //     currentAudio.pause();
    //     currentAudio.currentTime = 0;
    //     currentAudio = null;
    // }
    // var audio = new Audio('../MP3/whooshLow.mp3');
    // audio.volume = 0.5;
    // audio.play();
    // currentAudio = audio;
}

