const normalDistribution = (
	mean: number,
	standardDeviation: number
): number => {
	let u = 0;
	let v = 0;
	while (u === 0) u = global.random();
	while (v === 0) v = global.random();
	let number_ = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
	number_ = number_ * standardDeviation + mean;
	return number_;
};

export default normalDistribution;
