import type Range from '@/types/Range';

type StarStatsRanges = Record<
	string,
	{
		size: Range;
		temperature: Range;
		mass: Range;
		luminosity: Range;
		probability: number;
	}
>;

export default StarStatsRanges;
