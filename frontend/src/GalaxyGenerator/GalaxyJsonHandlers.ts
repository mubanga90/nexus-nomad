import type Position from '@/types/Position';
import type { Star, StarClassification } from '@/types/Star';

type ShortenedStar = {
	n: string;
	p: { x: number; y: number; z: number };
	c: string;
	t: number;
	m: number;
	s: number;
	l: number;
};

const galaxyToJson = (galaxy: Star[], pretty = false): string => {
	const shortenedGalaxy = pretty
		? galaxy
		: galaxy.map((star) => mapStarToShortenedForm(star));
	return JSON.stringify(shortenedGalaxy, null, pretty ? 4 : 0);
};

const mapStarToShortenedForm = (star: Star) => {
	return {
		n: star.name,
		p: star.position,
		c: star.classification,
		t: star.temperature,
		m: star.mass,
		s: star.size,
		l: star.luminosity,
	};
};

const convertGalaxy = (galaxy: ShortenedStar[] | Star[]): Star[] => {
	if (isStarArray(galaxy)) return galaxy;

	return galaxy.map((star: ShortenedStar): Star => {
		return {
			name: star.n,
			position: star.p as Position,
			classification: star.c as StarClassification,
			temperature: star.t,
			mass: star.m,
			size: star.s,
			luminosity: star.l,
		};
	});
};

const isStarArray = (galaxy: any): galaxy is Star[] => {
	return galaxy.length > 0 && typeof galaxy[0].name === 'string';
};

export { galaxyToJson, convertGalaxy };
