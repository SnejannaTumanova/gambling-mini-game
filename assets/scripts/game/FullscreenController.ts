import { _decorator, Component, Node } from 'cc';

const { ccclass } = _decorator;

@ccclass('FullscreenController')
export class FullscreenController extends Component {
	private isFullscreen = false;

	onLoad() {
		this.node.on(Node.EventType.TOUCH_START, this.tryFullscreen, this);
		this.node.on(Node.EventType.MOUSE_DOWN, this.tryFullscreen, this);
	}

	private tryFullscreen() {
		if (document.fullscreenElement) return;

		document.documentElement.requestFullscreen?.().catch(() => {
			console.log('Fullscreen blocked');
		});
	}
}
