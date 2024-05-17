import fs from 'node:fs';
import path from 'node:path';
import createGalaxy from './CreateGalaxy';
import { GalxyToJson } from './GalaxyJsonHandlers';

const GalaxyGenerator = () => {
	const galaxy = createGalaxy();
	const galaxyJSON = GalxyToJson(galaxy, false);

	fs.writeFileSync('./src/data/galaxy.json', galaxyJSON);
};

GalaxyGenerator();
