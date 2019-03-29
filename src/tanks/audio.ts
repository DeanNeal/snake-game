class AudioController {
    play(url: string, volume: number = 0.2, loop = false) {
        var audio = new Audio('audio/' + url);
        audio.loop = loop;
        audio.volume = 0.1;//volume;
        audio.play();
    }
}

export default new AudioController();