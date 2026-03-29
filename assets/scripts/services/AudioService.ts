import { resources, AudioClip } from 'cc';

declare const Howl: any;

export class AudioService {
	private sounds: Record<string, any> = {};
	private initialized = false;
	private volume = 1;
	private muted = false;

	async init() {
		if (this.initialized) return;

		if (!(window as any).Howl) {
			console.warn('Howler not loaded yet');
			return;
		}

		this.initialized = true;

		// Загружаем через Cocos
		const click = await this.loadClip('audio/sfx/click');
		const win = await this.loadClip('audio/sfx/win');
		const lose = await this.loadClip('audio/sfx/lose');
		const bg = await this.loadClip('audio/music/bg');

		// передаём реальные URL в Howler
		this.sounds.click = new Howl({ src: [click], volume: 0.5 });
		this.sounds.win = new Howl({ src: [win], volume: 0.7 });
		this.sounds.lose = new Howl({ src: [lose], volume: 0.7 });
		this.sounds.bg = new Howl({ src: [bg], loop: true, volume: 0.4 });
	}

	private loadClip(path: string): Promise<string> {
		return new Promise((resolve, reject) => {
			resources.load(path, AudioClip, (err, clip) => {
				if (err) {
					console.error('Load error:', path);
					reject(err);
					return;
				}

				//получаем реальный URL
				resolve(clip.nativeUrl);
			});
		});
	}

	play(name: string) {
		const sound = this.sounds[name];
		if (!sound) {
			console.warn('Sound not ready:', name);
			return;
		}

		sound.stop();
		sound.play();
	}

	fadeIn(name: string, duration = 1000) {
		const sound = this.sounds[name];
		if (!sound) return;

		sound.volume(0);
		sound.play();
		sound.fade(0, this.volume, duration);
	}
}

export const audioService = new AudioService();
