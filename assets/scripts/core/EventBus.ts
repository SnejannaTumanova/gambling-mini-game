type Callback<T = any> = (payload: T) => void;

interface Listener<T = any> {
	callback: Callback<T>;
	target?: unknown;
}

class EventBus {
	private listeners: Map<string, Listener[]> = new Map();

	on<T>(event: string, callback: Callback<T>, target?: unknown) {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, []);
		}

		this.listeners.get(event)!.push({ callback, target });
	}

	off<T>(event: string, callback: Callback<T>, target?: unknown) {
		const arr = this.listeners.get(event);
		if (!arr) return;

		this.listeners.set(
			event,
			arr.filter(
				(listener) =>
					listener.callback !== callback || listener.target !== target,
			),
		);
	}

	emit<T>(event: string, payload?: T) {
		const arr = this.listeners.get(event);
		if (!arr) return;

		arr.forEach((listener) => {
			if (listener.target) {
				listener.callback.call(listener.target, payload);
			} else {
				listener.callback(payload as T);
			}
		});
	}
}

export const eventBus = new EventBus();
