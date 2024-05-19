import fs from 'node:fs';
import generateGalaxy, {
	type GalaxyParameters,
} from '@/utils/GalaxyGenerator/GenerateGalaxy';
import { galaxyToJson } from '@/utils/GalaxyGenerator/GalaxyJsonHandlers';

const bigGalaxyParameters: GalaxyParameters = {
	seed: 42,
	arms: 3,
	stars: 5000,
	width: 5000,
	deviationFromArmY: 1000,
	deviationFromArmZ: 50,
	minimumDistance: 50,
	spiralAngle: 1,
};

const smallGalaxyParameters: GalaxyParameters = {
	seed: 42,
	arms: 3,
	stars: 500,
	width: 500,
	deviationFromArmY: 100,
	deviationFromArmZ: 5,
	minimumDistance: 50,
	spiralAngle: 1,
};

const galaxyGenerator = () => {
	const galaxy = generateGalaxy(bigGalaxyParameters);
	const galaxyJson = galaxyToJson(galaxy, false);
	console.log(`Generated galaxy with ${galaxy.length} stars`);
	fs.writeFileSync('./src/data/galaxy.json', galaxyJson);
};

galaxyGenerator();
