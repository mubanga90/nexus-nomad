import type { Star, StarClassification } from '@/types/Star';
import { type GalaxyParameters } from '@/utils/GalaxyGenerator/GenerateGalaxy';
import starStats from '@/utils/GalaxyGenerator/StarStats';
import capitalizeString from '@/utils/CapitalizeString';
import normalDistribution from '@/utils/NormalDistribution';
import generateStarPosition from '@/utils/GalaxyGenerator/GenerateStarPosition';

// eslint-disable-next-line max-lines-per-function
const generateStar = (
	parameters: GalaxyParameters,
	armRotation: number
): Star => {
	const classification = generateStarClassification();
	return {
		id: 0,
		classification,
		name: generateStarName(),
		position: generateStarPosition(parameters, armRotation),
		temperature: generateStarTemperature(classification),
		mass: generateStarMass(classification),
		size: generateStarSize(classification),
		luminosity: generateStarLuminosity(classification),
	};
};

const generateStarName = (): string => {
	const length = Math.round(normalDistribution(0, 0.7) + 2) * 3 + 1;
	let name = '';

	while (name.length < length) {
		name += generateSyllable();
		const randomNumber = Math.round(global.random() * 10);
		name = appendRandomSuffix(name, randomNumber);
		if (randomNumber === 3) break;
	}

	return capitalizeString(name);
};

const appendRandomSuffix = (name: string, randomNumber: number): string => {
	const suffixes: string[] = [
		' ' + capitalizeString(generateSyllable()),
		'-' + generateSyllable(),
		'/' + capitalizeString(generateSyllable()),
		'-' + Math.round(global.random() * 99),
	];
	return name + (suffixes[randomNumber] || '');
};

const generateSyllable = (): string => {
	const consonants = 'bcdfghjklmnpqrstvwxyz';
	const vowels = 'aeiou';
	const consonant = consonants[Math.floor(global.random() * consonants.length)];
	const vowel = vowels[Math.floor(global.random() * vowels.length)];
	return global.random() < 0.5 ? consonant + vowel : vowel + consonant;
};

const generateStarClassification = (): StarClassification => {
	const random = global.random();
	let cumulativeProbability = 0;
	for (const classification in starStats) {
		cumulativeProbability +=
			starStats[classification.toLowerCase()].probability;
		if (random < cumulativeProbability)
			return classification.toUpperCase() as StarClassification;
	}

	return 'M';
};

const generateStarAttribute = (
	classification: StarClassification,
	attribute: keyof (typeof starStats)['o']
): number => {
	if (attribute === 'probability') return 0;
	const range = starStats[classification.toLowerCase()][attribute];
	return global.random() * (range.max - range.min) + range.min;
};

const generateStarSize = (classification: StarClassification): number =>
	generateStarAttribute(classification, 'size');
const generateStarTemperature = (classification: StarClassification): number =>
	generateStarAttribute(classification, 'temperature');
const generateStarMass = (classification: StarClassification): number =>
	generateStarAttribute(classification, 'mass');
const generateStarLuminosity = (classification: StarClassification): number =>
	generateStarAttribute(classification, 'luminosity');

export default generateStar;
