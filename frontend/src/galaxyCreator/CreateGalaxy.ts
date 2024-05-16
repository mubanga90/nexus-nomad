import { type Star } from '@/types/Star';
import normalDistribution from '@/utils/normalDistribution';

type GalaxyParameters = {
	arms: number;
	stars: number;
	width: number;
	deviationFromArm: number;
	spiralAngle: number;
};

const createGalaxy = (parameters: GalaxyParameters): Star[] => {
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
	const positionOnArm = calculatePositionOnArm(parameters);
	const localRotation = calculateLocalRotation(
		parameters,
		armRotation,
		positionOnArm
	);
	const position = calculateStarPosition(localRotation, positionOnArm);
	const brightness = Math.random() * 0.5 + 0.5;

	return { position, brightness };
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

const calculateStarPosition = (
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
