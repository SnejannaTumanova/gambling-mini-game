import { EventPayloadMap, GameEventName } from './GameEvents';

type Callback<T> = (payload: T) => void;

class EventBus {
	private listeners: Partial<Record<GameEventName, Function[]>> = {};

	on<K extends GameEventName>(
		event: K,
		callback: Callback<EventPayloadMap[K]>,
	) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event]!.push(callback);
	}

	off<K extends GameEventName>(
		event: K,
		callback: Callback<EventPayloadMap[K]>,
	) {
		const arr = this.listeners[event];
		if (!arr) return;

		this.listeners[event] = arr.filter((cb) => cb !== callback);
	}

	emit<K extends GameEventName>(event: K, payload: EventPayloadMap[K]) {
		const arr = this.listeners[event];
		if (!arr) return;

		arr.forEach((cb) => {
			(cb as Callback<EventPayloadMap[K]>)(payload);
		});
	}
}

export const eventBus = new EventBus();
