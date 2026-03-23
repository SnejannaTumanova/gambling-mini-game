export class RandomService {
	rollWin(chance: number = 0.5): boolean {
		return Math.random() < chance;
	}

	// пригодится для выбора угла/разброса
	range(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}
}
