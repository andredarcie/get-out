export class AudioManager {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private noSound: boolean = false;

    private walkActive: boolean = false;
    private walkStepIndex: number = 0;
    private walkTimeoutId: ReturnType<typeof setTimeout> | null = null;

    // ─── Core ─────────────────────────────────────────────────────────────

    private getCtx(): AudioContext {
        if (!this.ctx) {
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.70;
            this.masterGain.connect(this.ctx.destination);
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
        return this.ctx;
    }

    private out(): GainNode {
        this.getCtx();
        return this.masterGain!;
    }

    private makeNoise(seconds: number): AudioBuffer {
        const ctx = this.getCtx();
        const n = Math.max(1, Math.floor(ctx.sampleRate * seconds));
        const buf = ctx.createBuffer(1, n, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
        return buf;
    }

    // Hard clip — simulates piezo buzzer / ceramic resonator distortion
    private hardClip(): WaveShaperNode {
        const ctx = this.getCtx();
        const ws = ctx.createWaveShaper();
        const n = 256;
        const curve = new Float32Array(n);
        for (let i = 0; i < n; i++) {
            const x = (i / (n - 1)) * 2 - 1;
            curve[i] = Math.max(-0.65, Math.min(0.65, x * 3.5));
        }
        ws.curve = curve;
        return ws;
    }

    // ─── Primitives ───────────────────────────────────────────────────────

    // Soviet piezo buzzer: square wave → hard clip.
    // This is how BK-0010 / UKNC played sounds — CPU toggling a port bit.
    private buzzer(freq: number, dur: number, vol: number, delay = 0): void {
        if (this.noSound) return;
        try {
            const ctx = this.getCtx();
            const t = ctx.currentTime + delay;
            const o = ctx.createOscillator();
            o.type = 'square';
            o.frequency.value = freq;
            const ws = this.hardClip();
            const g = ctx.createGain();
            g.gain.setValueAtTime(vol, t);
            g.gain.setValueAtTime(0.0001, t + dur - 0.002);
            o.connect(ws); ws.connect(g); g.connect(this.out());
            o.start(t); o.stop(t + dur + 0.004);
        } catch {
            this.noSound = true;
        }
    }

    // FSK burst: single oscillator with scheduled frequency flips between f1/f2.
    // Exactly how Soviet computers encoded data on cassette tape (МК-60, etc.)
    // and how the CPU sounded when doing intensive I/O.
    private fsk(dur: number, delay = 0, vol = 0.062, f1 = 1200, f2 = 2400): void {
        if (this.noSound) return;
        try {
            const ctx = this.getCtx();
            const t0 = ctx.currentTime + delay;
            const o = ctx.createOscillator();
            o.type = 'square';
            o.frequency.setValueAtTime(f1, t0);
            let t = 0.002;
            while (t < dur - 0.002) {
                // Segment lengths: ~4–13 ms (encode 0s and 1s at tape speed)
                const seg = 0.004 + Math.random() * 0.009;
                o.frequency.setValueAtTime(Math.random() > 0.5 ? f1 : f2, t0 + t);
                t += seg;
            }
            const ws = this.hardClip();
            const g = ctx.createGain();
            g.gain.setValueAtTime(vol, t0);
            g.gain.setValueAtTime(0.0001, t0 + dur - 0.001);
            o.connect(ws); ws.connect(g); g.connect(this.out());
            o.start(t0); o.stop(t0 + dur + 0.003);
        } catch {
            this.noSound = true;
        }
    }

    // Mechanical relay / keyboard click — physical impact sound
    private relayClick(vol = 0.065, delay = 0): void {
        if (this.noSound) return;
        try {
            const ctx = this.getCtx();
            const t = ctx.currentTime + delay;
            const dur = 0.016;
            const src = ctx.createBufferSource();
            src.buffer = this.makeNoise(dur);
            const lp = ctx.createBiquadFilter();
            lp.type = 'lowpass';
            lp.frequency.value = 4000;
            const g = ctx.createGain();
            g.gain.setValueAtTime(vol, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + dur);
            src.connect(lp); lp.connect(g); g.connect(this.out());
            src.start(t);
        } catch {
            this.noSound = true;
        }
    }

    // ─── Button ───────────────────────────────────────────────────────────
    // Heavy Soviet keyboard key: mechanical click + buzzer confirmation

    public playButtonSound(): void {
        this.relayClick(0.07);
        this.buzzer(880, 0.032, 0.050, 0.010);
    }

    // ─── Dice rolling ─────────────────────────────────────────────────────
    // FSK burst — sounds like the computer reading random data from tape
    // while "rolling" the result. Distinctly Soviet-computer.

    public playDiceSound(): void {
        this.fsk(0.480, 0, 0.068, 1200, 2400);
    }

    // ─── Dice settle ──────────────────────────────────────────────────────
    // Single short buzzer beep — result confirmed

    public playDiceSettleSound(): void {
        this.buzzer(440, 0.075, 0.085);
    }

    // ─── Ding ─────────────────────────────────────────────────────────────
    // Three identical buzzer pulses — notification pattern

    public playDingSound(): void {
        [0, 0.090, 0.180].forEach((d) => this.buzzer(660, 0.055, 0.060, d));
    }

    // ─── Fail ─────────────────────────────────────────────────────────────
    // Three slow descending buzzer tones — Soviet alarm pattern.
    // Not a melody — just three falling steps, functional.

    public playFailSound(): void {
        this.buzzer(440, 0.160, 0.085, 0.000);
        this.buzzer(330, 0.160, 0.085, 0.200);
        this.buzzer(220, 0.240, 0.085, 0.400);
    }

    // ─── Success ──────────────────────────────────────────────────────────
    // Two ascending buzzer beeps — minimal positive confirmation

    public playSuccessSound(): void {
        this.buzzer(440, 0.080, 0.075, 0.000);
        this.buzzer(880, 0.110, 0.075, 0.110);
    }

    // ─── Take item ────────────────────────────────────────────────────────
    // Single buzzer beep

    public playTakeItemSound(): void {
        this.buzzer(660, 0.065, 0.065);
    }

    // ─── Throw ────────────────────────────────────────────────────────────
    // Relay click + low buzzer — discarding with physical feedback

    public playThrowSound(): void {
        this.relayClick(0.07);
        this.buzzer(220, 0.080, 0.065, 0.012);
    }

    // ─── Walk ─────────────────────────────────────────────────────────────
    // Relay click per step — no musical tone, purely mechanical

    public playWalkSound(): void {
        if (this.noSound || this.walkActive) return;
        this.walkActive = true;
        this.walkStepIndex = 0;
        this.scheduleStep();
    }

    public stopWalkSound(): void {
        this.walkActive = false;
        if (this.walkTimeoutId !== null) {
            clearTimeout(this.walkTimeoutId);
            this.walkTimeoutId = null;
        }
    }

    private scheduleStep(): void {
        if (!this.walkActive) return;
        this.relayClick(0.08);
        this.walkStepIndex++;
        const interval = this.walkStepIndex % 2 === 0 ? 670 : 750;
        this.walkTimeoutId = setTimeout(() => this.scheduleStep(), interval);
    }

    // ─── Write ────────────────────────────────────────────────────────────
    // Mechanical keyboard key press — click only, no buzzer

    public playWriteSound(): void {
        this.relayClick(0.048);
    }

    // ─── Event reveal ─────────────────────────────────────────────────────
    // 50 Hz hum (Soviet power grid frequency) slowly rising — like a
    // transformer or CRT powering up something you shouldn't have opened

    public playEventRevealSound(): void {
        if (this.noSound) return;
        try {
            const ctx = this.getCtx();
            const now = ctx.currentTime;

            const o = ctx.createOscillator();
            o.type = 'triangle';
            o.frequency.value = 50;
            const g = ctx.createGain();
            g.gain.setValueAtTime(0, now);
            g.gain.linearRampToValueAtTime(0.042, now + 0.40);
            g.gain.exponentialRampToValueAtTime(0.001, now + 1.30);
            o.connect(g); g.connect(this.out());
            o.start(now); o.stop(now + 1.35);
        } catch {
            this.noSound = true;
            return;
        }

        // Brief static burst at the start (relay switching / CRT discharge)
        this.relayClick(0.055);
    }

    // ─── Image reveal ─────────────────────────────────────────────────────
    // Short FSK burst — like data being loaded from tape into memory

    public playImageRevealSound(): void {
        this.fsk(0.180, 0, 0.055, 600, 1200);
    }

    // ─── Sleep ────────────────────────────────────────────────────────────
    // Slow low buzzer pulses — "standby" indicator on Soviet terminal

    public playSleepSound(): void {
        [0, 0.70, 1.40, 2.10].forEach((d) => this.buzzer(120, 0.130, 0.038, d));
    }

    // ─── Wake ─────────────────────────────────────────────────────────────
    // Two short ascending buzzer beeps — wake signal

    public playWakeSound(): void {
        this.buzzer(220, 0.045, 0.048, 0.000);
        this.buzzer(440, 0.060, 0.048, 0.055);
    }

    // ─── Character death ──────────────────────────────────────────────────
    // Single continuous tone descending over 3 seconds — like a flatline
    // on old Soviet medical equipment. No melody, no steps. One long fall.

    public playCharacterDeathSound(): void {
        if (this.noSound) return;
        try {
            const ctx = this.getCtx();
            const now = ctx.currentTime;
            const dur = 3.2;

            const o = ctx.createOscillator();
            o.type = 'triangle';
            o.frequency.setValueAtTime(330, now);
            o.frequency.exponentialRampToValueAtTime(88, now + dur);
            const g = ctx.createGain();
            g.gain.setValueAtTime(0.075, now);
            g.gain.exponentialRampToValueAtTime(0.001, now + dur);
            o.connect(g); g.connect(this.out());
            o.start(now); o.stop(now + dur + 0.05);
        } catch {
            this.noSound = true;
        }
    }

    // ─── Game over ────────────────────────────────────────────────────────
    // Three slow identical alarm buzzes — Soviet industrial alarm.
    // No descending melody — just three functional warning pulses.

    public playGameOverSound(): void {
        [0, 0.38, 0.76].forEach((d) => this.buzzer(220, 0.280, 0.090, d));
    }

    // ─── Victory ──────────────────────────────────────────────────────────
    // Five short ascending buzzer steps — still Soviet-terse, just upward

    public playVictorySound(): void {
        [220, 330, 440, 550, 660].forEach((f, i) =>
            this.buzzer(f, 0.085, 0.072, i * 0.100)
        );
    }

    // ─── Map open ─────────────────────────────────────────────────────────
    // Brief FSK burst — accessing stored map data from memory

    public playMapOpenSound(): void {
        this.fsk(0.075, 0, 0.050, 800, 1600);
    }

    // ─── Item found ───────────────────────────────────────────────────────
    // Short FSK burst + two confirmation beeps

    public playItemFoundSound(): void {
        this.fsk(0.120, 0, 0.058, 1200, 2400);
        this.buzzer(660, 0.055, 0.060, 0.130);
        this.buzzer(880, 0.070, 0.060, 0.195);
    }

    // ─── Rain / Geiger (no-ops) ───────────────────────────────────────────

    public playRainSound(): void {}
    public stopRainSound(): void {}
    public startGeigerAmbient(): void {}
    public stopGeigerAmbient(): void {}

    // ─── Legacy compat ────────────────────────────────────────────────────

    public playSound(soundName: string, loop = false): void {
        switch (soundName) {
            case 'button':   return this.playButtonSound();
            case 'dice':     return this.playDiceSound();
            case 'ding':     return this.playDingSound();
            case 'fail':     return this.playFailSound();
            case 'success':  return this.playSuccessSound();
            case 'takeItem': return this.playTakeItemSound();
            case 'throw':    return this.playThrowSound();
            case 'walk':     return loop ? this.playWalkSound() : undefined;
            case 'write':    return this.playWriteSound();
        }
    }
}
