import type Position from '@/types/Position';
import normalDistribution from '@/utils/NormalDistribution';
import { type GalaxyParameters } from '@/GalaxyGenerator/GenerateGalaxy';

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

const calculatePositionOnArm = (parameters: GalaxyParameters): Position => ({
	x: normalDistribution(0, 1) * parameters.width,
	y: normalDistribution(0, 1) * parameters.deviationFromArmY,
	z: normalDistribution(0, 1) * parameters.deviationFromArmZ,
});

const calculateLocalRotation = (
	parameters: GalaxyParameters,
	armRotation: number,
	positionOnArm: Position
): number =>
	armRotation +
	(Math.abs(positionOnArm.x) / parameters.width) * parameters.spiralAngle;

const calculateStarCoordinates = (
	localRotation: number,
	positionOnArm: Position
): Position => {
	const x = Math.round(
		positionOnArm.x * Math.cos(localRotation) -
			positionOnArm.y * Math.sin(localRotation)
	);
	const y = Math.round(
		positionOnArm.x * Math.sin(localRotation) +
			positionOnArm.y * Math.cos(localRotation)
	);
	const z = Math.round(positionOnArm.z);

	return { x, y, z };
};

export default generateStarPosition;
