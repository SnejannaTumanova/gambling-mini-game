import { _decorator, Component, AudioSource, input, Input } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
	@property(AudioSource)
	backgroundMusic: AudioSource = null!;

	private unlocked = false;

	onLoad() {
		// подписываемся на первый клик/тап ГЛОБАЛЬНО
		input.on(Input.EventType.TOUCH_START, this.unlockAudio, this);
		input.on(Input.EventType.MOUSE_DOWN, this.unlockAudio, this);
	}

	private unlockAudio() {
		// защита от повторного вызова
		if (this.unlocked) return;

		this.unlocked = true;

		//запускаем звук
		this.backgroundMusic?.play();

		// удаляем listeners
		input.off(Input.EventType.TOUCH_START, this.unlockAudio, this);
		input.off(Input.EventType.MOUSE_DOWN, this.unlockAudio, this);
	}
}
