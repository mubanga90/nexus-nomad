import type StarStatsRanges from '@/types/StarStatRanges';

const starStats: StarStatsRanges = {
	o: {
		size: { min: 6.6, max: 9.6 },
		temperature: { min: 30_000, max: 40_000 },
		mass: { min: 16, max: 66 },
		luminosity: { min: 30_000, max: 60_000 },
		probability: 0.000_03,
	},
	b: {
		size: { min: 1.8, max: 6.6 },
		temperature: { min: 97_000, max: 120_000 },
		mass: { min: 2.1, max: 16 },
		luminosity: { min: 25, max: 30_000 },
		probability: 0.000_07,
	},
	a: {
		size: { min: 1.4, max: 1.8 },
		temperature: { min: 7200, max: 9700 },
		mass: { min: 1.4, max: 2.1 },
		luminosity: { min: 5, max: 25 },
		probability: 0.006,
	},
	f: {
		size: { min: 1.1, max: 1.4 },
		temperature: { min: 5700, max: 6500 },
		mass: { min: 1.04, max: 1.4 },
		luminosity: { min: 1.5, max: 5 },
		probability: 0.033,
	},
	g: {
		size: { min: 0.9, max: 1.1 },
		temperature: { min: 4900, max: 5700 },
		mass: { min: 0.8, max: 1.04 },
		luminosity: { min: 0.6, max: 1.5 },
		probability: 0.08,
	},
	h: {
		size: { min: 0.7, max: 0.9 },
		temperature: { min: 3400, max: 4900 },
		mass: { min: 0.45, max: 0.8 },
		luminosity: { min: 0.08, max: 0.6 },
		probability: 0.12,
	},
	m: {
		size: { min: 0.4, max: 0.7 },
		temperature: { min: 2100, max: 3400 },
		mass: { min: 0.08, max: 0.45 },
		luminosity: { min: 0.01, max: 0.08 },
		probability: 0.76,
	},
};

export default starStats;
