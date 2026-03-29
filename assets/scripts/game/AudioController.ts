import { _decorator, Component } from 'cc';
import { eventBus } from '../core/EventBus';
import { GameEvents } from '../core/GameEvents';
import { audioService } from '../services/AudioService';

const { ccclass } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
	private unlocked = false;

	onLoad() {
		eventBus.on(GameEvents.PLAY_REQUESTED, this.onClick);
		eventBus.on(GameEvents.BET_CHANGE_REQUEST, this.onClick);
		eventBus.on(GameEvents.COLOR_CHANGE_REQUEST, this.onClick);
		eventBus.on(GameEvents.RESULT_READY, this.onResult);

		eventBus.on(GameEvents.SOUND_TOGGLE, this.onToggleSound);
		eventBus.on(GameEvents.VOLUME_CHANGED, this.onVolumeChanged);

		eventBus.on(GameEvents.SETTINGS_TOGGLE, this.onAnyUiInteraction);
		eventBus.on(GameEvents.SOUND_TOGGLE, this.onAnyUiInteraction);
		eventBus.on(GameEvents.VOLUME_CHANGED, this.onAnyUiInteraction);
	}

	onDestroy() {
		eventBus.off(GameEvents.PLAY_REQUESTED, this.onClick);
		eventBus.off(GameEvents.BET_CHANGE_REQUEST, this.onClick);
		eventBus.off(GameEvents.COLOR_CHANGE_REQUEST, this.onClick);
		eventBus.off(GameEvents.RESULT_READY, this.onResult);

		eventBus.off(GameEvents.SOUND_TOGGLE, this.onToggleSound);
		eventBus.off(GameEvents.VOLUME_CHANGED, this.onVolumeChanged);

		eventBus.off(GameEvents.SETTINGS_TOGGLE, this.onAnyUiInteraction);
		eventBus.off(GameEvents.SOUND_TOGGLE, this.onAnyUiInteraction);
		eventBus.off(GameEvents.VOLUME_CHANGED, this.onAnyUiInteraction);
	}

	private unlockAudio = async () => {
		if (this.unlocked) return;

		this.unlocked = true;

		await audioService.init();

		// плавный запуск фоновой музыки
		audioService.fadeIn('bg', 1500);
	};

	private onAnyUiInteraction = async (_payload: void | number) => {
		if (!this.unlocked) {
			await this.unlockAudio();
		}
	};

	private onClick = async (_payload: void | number | string) => {
		if (!this.unlocked) {
			await this.unlockAudio();
		}

		audioService.play('click');
	};

	private onResult = async ({
		isWin,
	}: {
		isWin: boolean;
		amount: number;
		prevBalance: number;
		newBalance: number;
	}) => {
		if (!this.unlocked) {
			await this.unlockAudio();
		}

		if (isWin) {
			audioService.play('win');
		} else {
			audioService.play('lose');
		}
	};

	private onToggleSound = async (_payload: void) => {
		if (!this.unlocked) {
			await this.unlockAudio();
			return;
		}

		const wasMuted = audioService.isMuted();
		audioService.toggleMute();

		if (wasMuted) {
			audioService.fadeIn('bg', 500);
		}
	};

	private onVolumeChanged = (value: number) => {
		audioService.setVolume(value);
	};
}
