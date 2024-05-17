import { type Star } from '@/types/Star';

const GalxyToJson = (galaxy: Star[], pretty = false): string => {
	const shortendGalaxy = pretty
		? galaxy
		: galaxy.map((star) => {
				return {
					n: star.name,
					p: star.position,
					c: star.classification,
					t: star.temperature,
					m: star.mass,
					s: star.size,
					l: star.luminosity,
				};
			});
	return JSON.stringify(shortendGalaxy, null, pretty ? 4 : 0);
};

const convertGalaxy = (galaxy: any): Star[] => {
	if (galaxy.length > 0 && galaxy[0].name) return galaxy as Star[];

	return galaxy.map((star: any) => {
		return {
			name: star.n,
			position: star.p,
			classification: star.c,
			temperature: star.t,
			mass: star.m,
			size: star.s,
			luminosity: star.l,
		};
	});
};

export { GalxyToJson, convertGalaxy };
