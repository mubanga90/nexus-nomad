import { type Star } from '@/types/Star';

const calculateViewBoxAndScale = (
	containerElement: HTMLElement,
	stars: Star[]
): {
	calculatedMinScale: number;
	calculatedViewBox: number;
} => {
	const maxValue = calculateMaxValue(stars);
	const calculatedViewBox = maxValue * 2;

	const calculatedMinScale = calculateMinScale(containerElement, maxValue);

	return {
		calculatedMinScale,
		calculatedViewBox,
	};
};

const calculateMaxValue = (stars: Star[]): number =>
	// eslint-disable-next-line unicorn/no-array-reduce
	stars.reduce(
		(max, star) => Math.max(max, star.position.x, star.position.y),
		0
	);

const calculateMinScale = (containerElement: HTMLElement, maxValue: number) =>
	Math.min(containerElement.clientWidth, containerElement.clientHeight) /
	(maxValue * 2);

export default calculateViewBoxAndScale;
