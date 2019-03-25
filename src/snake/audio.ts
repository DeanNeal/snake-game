export class AudioController {
    play(url: string) {
        var audio = new Audio('audio/' + url);
        audio.volume = 0.2;
        audio.play();
    }
}