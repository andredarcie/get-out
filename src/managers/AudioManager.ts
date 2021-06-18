import { Game } from '../Game';

export class AudioManager {
    private audioFiles: string[] = [];
    private audioEffects: HTMLAudioElement;
    private audioBackground: HTMLAudioElement;
    private audioLoaded: number;
    private noSound: boolean = true;
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();

        this.audioFiles = [
            'success.wav',
            'button1.wav',
            'dice.mp3',
            'fail.mp3',
            'take-item.wav',
            'write.wav',
            'throw.wav',
            'ding.wav',
            'walk.mpeg'
        ];

        this.audioEffects = new Audio();
        this.audioBackground = new Audio();

        for (const i in this.audioFiles) {
            this.preloadAudio(this.audioFiles[i]);
        }
    }

    private preloadAudio(url: string): void {
        let audio = new Audio();
        audio.addEventListener('canplaythrough', this.loadedAudio, false);
        audio.src = url;
    }

    private loadedAudio() {
        this.audioLoaded++;
        if (this.audioLoaded == (this.audioFiles.length -1)){
            this.allAudioHaveBeenLoaded();
        }
    }

    private allAudioHaveBeenLoaded() {
        console.log('load all audios');
    }

    public playButtonSound(): void {
        this.playAudioEffect('button1.wav');
    }

    public playDiceSound(): void {
        this.playAudioEffect('dice.mp3');
    }

    public playSuccessSound(): void {
        this.playAudioEffect('success.wav');
    }

    public playFailSound(): void {
        this.playAudioEffect('fail.mp3');
    }

    public playTakeItemSound(): void {
        this.playAudioEffect('take-item.wav');
    }

    public playWriteSound(): void {
        this.playAudioEffect('write.wav');
    }

    public playThrowSound(): void {
        this.playAudioEffect('throw.wav');
    }

    public playDingSound(): void {
        this.playAudioEffect('ding.wav');
    }

    public playRainSound(): void {
        this.playAudioLoop('walk.mpeg');
    }

    private playAudioEffect(soundName: string): void {
        if (this.noSound) 
            return

        this.audioEffects.src = 'audio/' + soundName;
        this.audioEffects.play();
    }

    private playAudioLoop(soundName: string): void {
        if (this.noSound) 
            return

        this.audioBackground.src = 'audio/' + soundName;
        this.audioBackground.volume = 0.2;
        if (typeof this.audioBackground.loop == 'boolean')
        {
            this.audioBackground.loop = true;
        }
        else
        {
            this.audioBackground.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
                console.log('loop');
            }, false);
        }
        this.audioBackground.play();
    }
}