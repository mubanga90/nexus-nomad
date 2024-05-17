import { type StarClassification, type Star } from '@/types/Star';
import normalDistribution from '@/utils/NormalDistribution';
import { randomNumberGenerator } from '@/utils/RandomNumberGenerator';

type GalaxyParameters = {
	arms: number;
	stars: number;
	width: number;
	deviationFromArm: number;
	spiralAngle: number;
};

const createGalaxy = (
	parameters: GalaxyParameters = {
		arms: 3,
		stars: 5000,
		width: 5000,
		deviationFromArm: 1000,
		spiralAngle: 1,
	},
	seed = 42
): Star[] => {
	global.random = randomNumberGenerator(seed);
	const galaxy = [];

	for (let i = 0; i < parameters.arms; i++) {
		const arm = createArm(parameters, i);
		galaxy.push(...arm);
	}

	return galaxy;
};

const createArm = (parameters: GalaxyParameters, armNumber: number): Star[] => {
	const arm = [];
	const armRotation = ((Math.PI * 2) / parameters.arms) * armNumber;
	const starsPerArm = Math.floor(parameters.stars / parameters.arms);

	for (let index = 0; index < starsPerArm; index++) {
		const star = createStar(parameters, armRotation);
		arm.push(star);
	}

	return arm;
};

const createStar = (
	parameters: GalaxyParameters,
	armRotation: number
): Star => {
	const name = generateStarName();
	const position = generateStarPosition(parameters, armRotation);
	const classification = generateStarClassification();
	const temperature = generateStarTemperature(classification);
	const mass = generateStarMass(classification);
	const size = generateStarSize(classification);
	const luminosity = generateStarLuminosity(classification);

	return {
		name,
		position,
		classification,
		temperature,
		mass,
		size,
		luminosity,
	};
};

const generateStarPosition = (
	parameters: GalaxyParameters,
	armRotation: number
): Position => {
	const positionOnArm = calculatePositionOnArm(parameters);
	const localRotation = calculateLocalRotation(
		parameters,
		armRotation,
		positionOnArm
	);
	const position = calculateStarCoordinates(localRotation, positionOnArm);
	return position;
};

const generateStarName = (): string => {
	const generateSyllable = (): string => {
		const consonants = 'bcdfghjklmnpqrstvwxyz';
		const vowels = 'aeiou';
		const constenant =
			consonants[Math.floor(global.random() * consonants.length)];
		const vowel = vowels[Math.floor(global.random() * vowels.length)];
		return global.random() < 0.5 ? constenant + vowel : vowel + constenant;
	};

	const length = Math.round(normalDistribution(0, 0.7) + 2) * 3;
	let index = 0;
	let name = '';

	while (name.length < length) {
		name += generateSyllable();
		const randomNumber = Math.round(global.random() * 10) + index;
		if (randomNumber === 3) {
			name += ' ' + capitalize(generateSyllable());
			index = 0;
			continue;
		}

		if (randomNumber === 4) {
			name += '-' + generateSyllable();
			index = 0;
			continue;
		}

		if (randomNumber === 5) {
			name += '/' + capitalize(generateSyllable());
			index = 0;
			continue;
		}

		if (randomNumber === 6) {
			name += '-' + Math.round(global.random() * 99);
			break;
		}
	}

	name = capitalize(name);

	return name;
};

const capitalize = (word: string): string => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

const generateStarClassification = (): StarClassification => {
	const random = global.random();
	if (random < 0.0003) return 'O';
	if (random < 0.001) return 'B';
	if (random < 0.007) return 'A';
	if (random < 0.04) return 'F';
	if (random < 0.12) return 'G';
	if (random < 0.24) return 'K';
	return 'M';
};

const generateStarSize = (classification: StarClassification): number => {
	if (classification === 'O') return global.random() * 3 + 6.6;
	if (classification === 'B') return global.random() * 4.8 + 1.8;
	if (classification === 'A') return global.random() * 0.4 + 1.4;
	if (classification === 'F') return global.random() * 0.3 + 1.1;
	if (classification === 'G') return global.random() * 0.2 + 0.9;
	if (classification === 'K') return global.random() * 0.2 + 0.7;
	return global.random() * 0.3 + 0.4;
};

const generateStarTemperature = (
	classification: StarClassification
): number => {
	if (classification === 'O') return global.random() * 10_000 + 30_000;
	if (classification === 'B') return global.random() * 23_000 + 97_000;
	if (classification === 'A') return global.random() * 2500 + 7200;
	if (classification === 'F') return global.random() * 800 + 5700;
	if (classification === 'G') return global.random() * 800 + 4900;
	if (classification === 'K') return global.random() * 1500 + 3400;
	return global.random() * 1300 + 2100;
};

const generateStarMass = (classification: StarClassification): number => {
	if (classification === 'O') return global.random() * 50 + 16;
	if (classification === 'B') return global.random() * 13.9 + 2.1;
	if (classification === 'A') return global.random() * 0.7 + 1.4;
	if (classification === 'F') return global.random() * 0.36 + 1.04;
	if (classification === 'G') return global.random() * 0.24 + 0.8;
	if (classification === 'K') return global.random() * 0.35 + 0.45;
	return global.random() * 0.37 + 0.08;
};

const generateStarLuminosity = (classification: StarClassification): number => {
	if (classification === 'O') return global.random() * 30_000 + 30_000;
	if (classification === 'B') return global.random() * 29_975 + 25;
	if (classification === 'A') return global.random() * 20 + 5;
	if (classification === 'F') return global.random() * 3.5 + 1.5;
	if (classification === 'G') return global.random() * 0.9 + 0.6;
	if (classification === 'K') return global.random() * 0.52 + 0.08;
	return global.random() * 0.07 + 0.01;
};

const calculatePositionOnArm = (parameters: GalaxyParameters): Position => {
	return {
		x: normalDistribution(0, 1) * parameters.width,
		y: normalDistribution(0, 1) * parameters.deviationFromArm,
		z: normalDistribution(0, 1) * parameters.deviationFromArm,
	};
};

const calculateLocalRotation = (
	parameters: GalaxyParameters,
	armRotation: number,
	positionOnArm: Position
): number => {
	return (
		armRotation +
		(Math.abs(positionOnArm.x) / parameters.width) * parameters.spiralAngle
	);
};

const calculateStarCoordinates = (
	localRotation: number,
	positionOnArm: Position
): Position => {
	const x =
		positionOnArm.x * Math.cos(localRotation) -
		positionOnArm.y * Math.sin(localRotation);
	const y =
		positionOnArm.x * Math.sin(localRotation) +
		positionOnArm.y * Math.cos(localRotation);
	const z = positionOnArm.z;

	return { x, y, z };
};

export default createGalaxy;
export type { GalaxyParameters };
