import type { Star } from '@/types/Star';
import { randomNumberGenerator } from '@/utils/RandomNumberGenerator';
import generateStar from '@/GalaxyGenerator/GenerateStar';
import calculateDistanceBetweenStars from '@/utils/CalculateDistanceBetweenStars';

type GalaxyParameters = {
	seed: number;
	arms: number;
	stars: number;
	width: number;
	deviationFromArmY: number;
	deviationFromArmZ: number;
	minimumDistance: number;
	spiralAngle: number;
};

const generateGalaxy = (parameters: GalaxyParameters): Star[] => {
	global.random = randomNumberGenerator(parameters.seed);
	const galaxy = [];

	for (let index = 0; index < parameters.arms; index++) {
		const arm = createArm(parameters, index);
		galaxy.push(...arm);
	}

	const filteredGalaxy = filterStarsThatAreTooClose(
		galaxy,
		parameters.minimumDistance
	);
	return filteredGalaxy;
};

// Each star is checked against all other stars, this result in a O(n^2) complexity
// This is not a problem for small galaxies, but for large galaxies this can be a performance bottleneck
const filterStarsThatAreTooClose = (
	galaxy: Star[],
	minimumDistance: number
): Star[] => {
	const filteredGalaxy: Star[] = [];

	for (const star of galaxy) {
		if (!isStarTooClose(star, galaxy, minimumDistance)) {
			filteredGalaxy.push(star);
		}
	}

	return filteredGalaxy;
};

const isStarTooClose = (
	star: Star,
	galaxy: Star[],
	minimumDistance: number
): boolean =>
	galaxy.some((otherStar) => {
		if (star === otherStar) return false;
		const distance = calculateDistanceBetweenStars(
			star.position,
			otherStar.position
		);
		return distance < minimumDistance;
	});

const createArm = (parameters: GalaxyParameters, armNumber: number): Star[] => {
	const arm = [];
	const armRotation = ((Math.PI * 2) / parameters.arms) * armNumber;
	const starsPerArm = Math.floor(parameters.stars / parameters.arms);

	for (let index = 0; index < starsPerArm; index++) {
		const star = generateStar(parameters, armRotation);
		arm.push(star);
	}

	return arm;
};

export default generateGalaxy;
export type { GalaxyParameters };
