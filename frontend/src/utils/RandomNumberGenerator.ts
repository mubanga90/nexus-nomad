const randomNumberGenerator =
	(seed: number): (() => number) =>
	(): number => {
		const x = Math.sin(seed++) * 10_000;
		return x - Math.floor(x);
	};

export { randomNumberGenerator };
