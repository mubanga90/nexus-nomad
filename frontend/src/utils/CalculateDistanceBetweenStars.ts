import type Position from '@/types/Position';

const calculateDistanceBetweenStars = (
	position1: Position,
	position2: Position
): number => {
	const x = position1.x - position2.x;
	const y = position1.y - position2.y;
	const z = position1.z - position2.z;
	return Math.hypot(x, y, z);
};

export default calculateDistanceBetweenStars;
