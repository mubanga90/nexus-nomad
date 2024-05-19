import type Position from '@/types/Position';
import { type Star } from '@/types/Star';

// Whole thing should be a class, with an instance stored in a store

type Node = {
	id: number;
	position: Position;
	neighbors: Node[];
};

const createNodes = (stars: Star[], jumpDistance: number): Node[] => {
	const nodes: Node[] = stars.map((star) => ({
		id: star.id,
		position: star.position,
		neighbors: [],
	}));

	for (const node of nodes) {
		node.neighbors = nodes
			.filter((neighbor) => neighbor.id !== node.id)
			.filter(
				(neighbor) => distance(node.position, neighbor.position) <= jumpDistance
			);
	}

	return nodes;
};

const distance = (a: Position, b: Position) => {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	const dz = a.z - b.z;
	return Math.hypot(dx, dy, dz);
};

const reconstructPath = (cameFrom: Map<Node, Node>, current: Node): Node[] => {
	const totalPath = [current];
	while (cameFrom.has(current)) {
		current = cameFrom.get(current)!;
		totalPath.unshift(current);
	}

	return totalPath;
};

const heuristic = (a: Node, b: Node) => distance(a.position, b.position);

// eslint-disable-next-line max-lines-per-function
const aStar = (nodes: Node[], start: Node, end: Node): Node[] => {
	const openSet = [start];
	const cameFrom = new Map<Node, Node>();
	const gScore = new Map();
	const fScore = new Map();
	gScore.set(start, 0);
	fScore.set(start, heuristic(start, end));

	while (openSet.length > 0) {
		// eslint-disable-next-line unicorn/no-array-reduce
		const current = openSet.reduce((a, b) =>
			fScore.get(a) < fScore.get(b) ? a : b
		);
		if (current === end) {
			return reconstructPath(cameFrom, current);
		}

		openSet.splice(openSet.indexOf(current), 1);

		for (const neighbor of current.neighbors) {
			const gScoreTentative =
				(gScore.get(current) as number) +
				distance(current.position, neighbor.position);
			// eslint-disable-next-line max-depth
			if (gScoreTentative < (gScore.get(neighbor) ?? Infinity)) {
				cameFrom.set(neighbor, current);
				gScore.set(neighbor, gScoreTentative);
				fScore.set(neighbor, gScoreTentative + heuristic(neighbor, end));
				// eslint-disable-next-line max-depth
				if (!openSet.includes(neighbor)) {
					openSet.push(neighbor);
				}
			}
		}
	}

	return [];
};

// eslint-disable-next-line max-lines-per-function
const findPath = (
	stars: Star[],
	start: number,
	end: number,
	jumpDistance: number
	// eslint-disable-next-line max-params
) => {
	const nodes = createNodes(stars, jumpDistance);
	const startNode = nodes.find((node) => node.id === start);
	const endNode = nodes.find((node) => node.id === end);
	if (!startNode || !endNode) {
		return [];
	}

	const path = aStar(nodes, startNode, endNode).map(
		(node) => stars.find((star) => star.id === node.id)!
	);

	console.log(path);
	return path;
};

export default findPath;
