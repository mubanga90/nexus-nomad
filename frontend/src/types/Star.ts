import type Position from '@/types/Position';

type Star = {
	name: string;
	position: Position;
	classification: StarClassification;
	temperature: number;
	mass: number;
	size: number;
	luminosity: number;
};

type StarClassification = 'O' | 'B' | 'A' | 'F' | 'G' | 'K' | 'M';

export type { Star, StarClassification };
