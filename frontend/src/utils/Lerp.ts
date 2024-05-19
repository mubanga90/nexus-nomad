const lerp = (start: number, end: number, t: number) => {
	const value = start * (1 - t) + end * t;
	return value;
};

export default lerp;
