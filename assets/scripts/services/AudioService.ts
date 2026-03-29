import { resources, AudioClip } from 'cc';

declare const Howl: any;

type SoundName = 'click' | 'win' | 'lose' | 'bg';

export class AudioService {
	private sounds: Partial<Record<SoundName, any>> = {};

	private initialized = false;
	private volume = 1;
	private muted = false;
	private masterVolume = 1;
	private bgVolume = 0.4;

	async init() {
		if (this.initialized) return;

		if (!(window as any).Howl) {
			console.warn('Howler not loaded yet');
			return;
		}

		console.log('[Audio] init');

		this.initialized = true;

		// грузим через Cocos
		const click = await this.loadClip('audio/sfx/click');
		const win = await this.loadClip('audio/sfx/win');
		const lose = await this.loadClip('audio/sfx/lose');
		const bg = await this.loadClip('audio/music/bg');

		// создаём Howl
		this.sounds.click = new Howl({
			src: [click],
			volume: 0.5,
		});

		this.sounds.win = new Howl({
			src: [win],
			volume: 0.7,
		});

		this.sounds.lose = new Howl({
			src: [lose],
			volume: 0.7,
		});

		this.sounds.bg = new Howl({
			src: [bg],
			loop: true,
			volume: 0.4,
		});
	}

	// =====================
	// LOAD
	// =====================

	private loadClip(path: string): Promise<string> {
		return new Promise((resolve, reject) => {
			resources.load(path, AudioClip, (err, clip) => {
				if (err) {
					console.error('[Audio] Load error:', path);
					reject(err);
					return;
				}

				resolve(clip.nativeUrl);
			});
		});
	}

	// =====================
	// PLAY
	// =====================

	play(name: SoundName) {
		if (this.muted) return;

		const sound = this.sounds[name];
		if (!sound) {
			console.warn('[Audio] not ready:', name);
			return;
		}

		// 🔥 фикс "накопления" звуков
		if (sound.playing()) {
			sound.stop();
		}

		sound.play();
	}

	// =====================
	// FADE
	// =====================

	fadeIn(name: SoundName, duration = 1000) {
		if (this.muted) return;

		const sound = this.sounds[name];
		if (!sound) return;

		if (sound.playing()) return;

		const targetVolume = name === 'bg' ? this.bgVolume : this.masterVolume;

		sound.volume(0);
		sound.play();
		sound.fade(0, targetVolume, duration);
	}

	fadeOut(name: SoundName, duration = 1000) {
		const sound = this.sounds[name];
		if (!sound) return;

		const currentVolume = sound.volume();

		sound.fade(currentVolume, 0, duration);

		setTimeout(() => {
			sound.stop();
		}, duration);
	}

	// =====================
	// GLOBAL CONTROL
	// =====================

	setVolume(value: number) {
		this.masterVolume = value;

		for (const key in this.sounds) {
			const sound = this.sounds[key as keyof typeof this.sounds];
			if (!sound) continue;

			if (key === 'bg') {
				sound.volume(Math.min(value * 0.4, 1));
			} else {
				sound.volume(Math.min(value, 1));
			}
		}
	}

	mute() {
		this.muted = true;

		for (const key in this.sounds) {
			const sound = this.sounds[key as keyof typeof this.sounds];
			if (sound) sound.mute(true);
		}
	}

	unmute() {
		this.muted = false;

		for (const key in this.sounds) {
			const sound = this.sounds[key as keyof typeof this.sounds];
			if (sound) sound.mute(false);
		}
	}

	toggleMute() {
		this.muted ? this.unmute() : this.mute();
	}

	isMuted() {
		return this.muted;
	}
}

export const audioService = new AudioService();
