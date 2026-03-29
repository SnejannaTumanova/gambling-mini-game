export class RandomService {
	rollWin(chance: number = 0.5): boolean {
		return Math.random() < chance;
	}

	// случайное число в диапазоне
	range(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}
}
