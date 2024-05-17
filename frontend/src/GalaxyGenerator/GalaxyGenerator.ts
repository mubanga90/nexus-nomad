import fs from 'node:fs';
import generateGalaxy, {
	type GalaxyParameters,
} from '@/GalaxyGenerator/GenerateGalaxy';
import { galaxyToJson } from '@/GalaxyGenerator/GalaxyJsonHandlers';

const parameters: GalaxyParameters = {
	seed: 42,
	arms: 3,
	stars: 5000,
	width: 5000,
	deviationFromArmY: 1000,
	deviationFromArmZ: 50,
	minimumDistance: 50,
	spiralAngle: 1,
};

const galaxyGenerator = () => {
	const galaxy = generateGalaxy(parameters);
	const galaxyJson = galaxyToJson(galaxy, false);
	console.log(`Generated galaxy with ${galaxy.length} stars`);
	fs.writeFileSync('./src/data/galaxy.json', galaxyJson);
};

galaxyGenerator();
