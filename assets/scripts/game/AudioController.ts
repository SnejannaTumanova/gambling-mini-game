import { _decorator, Component, AudioSource, input, Input } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
	@property(AudioSource)
	backgroundMusic: AudioSource = null!;

	private unlocked = false;

	onLoad() {
		input.on(Input.EventType.TOUCH_START, this.unlockAudio, this);
		input.on(Input.EventType.MOUSE_DOWN, this.unlockAudio, this);
	}

	private unlockAudio() {
		if (this.unlocked) return;

		this.unlocked = true;

		this.backgroundMusic?.play();

		// удаляем listeners
		input.off(Input.EventType.TOUCH_START, this.unlockAudio, this);
		input.off(Input.EventType.MOUSE_DOWN, this.unlockAudio, this);
	}
}
