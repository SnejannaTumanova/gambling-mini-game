import { _decorator, Component } from 'cc';
import { gameStore } from './GameStore';

const { ccclass } = _decorator;

@ccclass('GameEntry')
export class GameEntry extends Component {
	start() {
		gameStore.init();
	}
}
