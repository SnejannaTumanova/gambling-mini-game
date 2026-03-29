import { _decorator, Component, Node } from 'cc';

const { ccclass } = _decorator;

@ccclass('FullscreenController')
export class FullscreenController extends Component {
	private isFullscreen = false;

	onLoad() {
		// подписываемся  и ждём взаимодействия
		this.node.on(Node.EventType.TOUCH_START, this.tryFullscreen, this);
		this.node.on(Node.EventType.MOUSE_DOWN, this.tryFullscreen, this);
	}

	private tryFullscreen() {
		if (document.fullscreenElement) return; // если уже fullscreen — ничего не делаем

		document.documentElement.requestFullscreen?.().catch(() => {
			//пытаемся включить fullscreen, если браузер не дал — не падаем
			console.log('Fullscreen blocked');
		});
	}
}
