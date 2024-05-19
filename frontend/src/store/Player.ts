import { defineStore } from 'pinia';

const usePlayerInfoStore = defineStore('playerInfo', {
	state: (): { currentStarIndex: number } => ({
		currentStarIndex: 0,
	}),
	actions: {
		setCurrentStar(index: number) {
			this.currentStarIndex = index;
		},
	},
});

export default usePlayerInfoStore;
