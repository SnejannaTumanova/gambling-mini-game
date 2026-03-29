import { BetType, RoundOutcome } from '../data/Types';
import { GameFlowState } from './GameFlowState';

export const GameEvents = {
	PLAY_REQUESTED: 'PLAY_REQUESTED',

	BET_CHANGE_REQUEST: 'BET_CHANGE_REQUEST',
	COLOR_CHANGE_REQUEST: 'COLOR_CHANGE_REQUEST',

	BET_UPDATED: 'BET_UPDATED',
	COLOR_UPDATED: 'COLOR_UPDATED',

	BALANCE_CHANGED: 'BALANCE_CHANGED',
	STATE_CHANGED: 'STATE_CHANGED',

	ROUND_STARTED: 'ROUND_STARTED',
	WHEEL_SPIN_COMPLETED: 'WHEEL_SPIN_COMPLETED',

	RESULT_READY: 'RESULT_READY',
	RESULT_HIDDEN: 'RESULT_HIDDEN',

	SOUND_TOGGLE: 'SOUND_TOGGLE',
	VOLUME_CHANGED: 'VOLUME_CHANGED',
	SETTINGS_TOGGLE: 'SETTINGS_TOGGLE',
} as const;

export interface EventPayloadMap {
	PLAY_REQUESTED: void;

	BET_CHANGE_REQUEST: number;
	COLOR_CHANGE_REQUEST: BetType;

	BET_UPDATED: number;
	COLOR_UPDATED: BetType;

	BALANCE_CHANGED: number;
	STATE_CHANGED: GameFlowState;

	ROUND_STARTED: {
		outcome: RoundOutcome;
		prevBalance: number;
	};

	WHEEL_SPIN_COMPLETED: {
		outcome: RoundOutcome;
		prevBalance: number;
	};

	RESULT_READY: {
		isWin: boolean;
		amount: number;
		prevBalance: number;
		newBalance: number;
	};

	RESULT_HIDDEN: void;

	SOUND_TOGGLE: void;
	VOLUME_CHANGED: number;
	SETTINGS_TOGGLE: void;
}

export type GameEventName = keyof EventPayloadMap;
