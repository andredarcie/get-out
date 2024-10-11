export class AudioManager {
    private audioEffects: HTMLAudioElement;
    private audioBackground: HTMLAudioElement;
    private noSound: boolean = false;

    // Mapa para armazenar os sons
    private sounds: Map<string, string>;

    constructor() {
        this.audioEffects = new Audio();
        this.audioBackground = new Audio();
        this.sounds = new Map<string, string>([
            ['button', new URL('../audio/button1.wav', import.meta.url).toString()],
            ['dice', new URL('../audio/dice.mp3', import.meta.url).toString()],
            ['ding', new URL('../audio/ding.wav', import.meta.url).toString()],
            ['fail', new URL('../audio/fail.mp3', import.meta.url).toString()],
            ['rain', new URL('../audio/rain.mp3', import.meta.url).toString()],
            ['success', new URL('../audio/success.wav', import.meta.url).toString()],
            ['takeItem', new URL('../audio/take-item.wav', import.meta.url).toString()],
            ['throw', new URL('../audio/throw.wav', import.meta.url).toString()],
            ['walk', new URL('../audio/walk.mpeg', import.meta.url).toString()],
            ['write', new URL('../audio/write.wav', import.meta.url).toString()],
        ]);
    }

    // Método para tocar efeitos sonoros
    public playSound(soundName: string, loop: boolean = false): void {
        const soundSource = this.sounds.get(soundName);
        if (!soundSource) {
            console.error(`Sound ${soundName} not found.`);
            return;
        }

        if (loop) {
            this.playAudioLoop(soundSource);
        } else {
            this.playAudioEffect(soundSource);
        }
    }

    // Métodos públicos para tocar sons específicos
    public playButtonSound(): void {
        this.playSound('button');
    }

    public playDiceSound(): void {
        this.playSound('dice');
    }

    public playDingSound(): void {
        this.playSound('ding');
    }

    public playFailSound(): void {
        this.playSound('fail');
    }

    public playRainSound(): void {
        this.playSound('rain', true);
    }

    public playSuccessSound(): void {
        this.playSound('success');
    }

    public playTakeItemSound(): void {
        this.playSound('takeItem');
    }

    public playThrowSound(): void {
        this.playSound('throw');
    }

    public playWalkSound(): void {
        this.playSound('walk', true);
    }

    public playWriteSound(): void {
        this.playSound('write');
    }

    // Métodos privados para tocar os sons
    private async playAudioEffect(soundSource: string): Promise<void> {
        if (this.noSound) return;

        try {
            this.audioEffects.src = soundSource;
            await this.audioEffects.play();
        } catch (error) {
            console.error('Error playing audio effect:', soundSource, error);
        }
    }

    private async playAudioLoop(soundSource: string): Promise<void> {
        if (this.noSound) return;

        try {
            this.audioBackground.src = soundSource;
            this.audioBackground.volume = 0.2;
            this.audioBackground.loop = true;

            await this.audioBackground.play();
        } catch (error) {
            console.error('Error playing audio loop:', soundSource, error);
        }
    }
}
