const normalDistribution = (
	mean: number,
	standardDeviation: number
): number => {
	let u = 0,
		v = 0;
	while (u === 0) u = Math.random();
	while (v === 0) v = Math.random();
	let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
	num = num * standardDeviation + mean;
	return num;
};

export default normalDistribution;
