import { _decorator, Component, input, Input } from 'cc';
import { eventBus } from '../core/EventBus';
import { GameEvents } from '../core/GameEvents';
import { audioService } from '../services/AudioService';

const { ccclass } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
	private unlocked = false;

	onLoad() {
		eventBus.on(GameEvents.PLAY_REQUESTED, this.onClick, this);
		eventBus.on(GameEvents.BET_CHANGE_REQUEST, this.onClick, this);
		eventBus.on(GameEvents.COLOR_CHANGE_REQUEST, this.onClick, this);
		eventBus.on(GameEvents.RESULT_READY, this.onResult, this);
	}

	onDestroy() {
		input.off(Input.EventType.TOUCH_START, this.unlockAudio, this);
		input.off(Input.EventType.MOUSE_DOWN, this.unlockAudio, this);
	}

	private async unlockAudio() {
		if (this.unlocked) return;

		this.unlocked = true;

		await audioService.init(); // ← ВАЖНО

		audioService.play('bg');
	}

	private onClick() {
		if (!this.unlocked) {
			this.unlockAudio();
		}

		audioService.play('click');
	}

	private onResult({ isWin }: any) {
		if (!this.unlocked) {
			this.unlockAudio();
		}

		if (isWin) {
			audioService.play('win');
		} else {
			audioService.play('lose');
		}
	}
}
