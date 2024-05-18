import { ref, type Ref, type ComputedRef } from 'vue';

// eslint-disable-next-line max-lines-per-function
const useDragAndZoom = (
	content: Ref<HTMLElement | undefined>,
	minScale: ComputedRef<number>
) => {
	const scale = ref(1);
	const xOffset = ref(0);
	const yOffset = ref(0);
	const xStart = ref(0);
	const yStart = ref(0);
	const isDragging = ref(false);

	// Zooming
	const onZoom = (event: WheelEvent) => {
		if (content.value === undefined) return;
		if (event.type === 'wheel') {
			const newScale = calculateNewScale(event);
			const { mouseX, mouseY } = calculateMousePosition(event);
			const { xDiff, yDiff } = calculateDiff(newScale, mouseX, mouseY);

			xOffset.value += xDiff;
			yOffset.value += yDiff;
			scale.value = newScale;
		}
	};

	const calculateNewScale = (event: WheelEvent) => {
		let newScale = scale.value + event.deltaY / 1000;

		if (newScale < minScale.value) newScale = minScale.value;
		if (newScale > 1) newScale = 1;

		return newScale;
	};

	const calculateMousePosition = (event: WheelEvent) => {
		const containerElement = content.value;
		const rect = containerElement!.getBoundingClientRect();
		const mouseX = event.clientX - (rect.left + rect.width / 2);
		const mouseY = event.clientY - (rect.top + rect.height / 2);

		return { mouseX, mouseY };
	};

	const calculateDiff = (newScale: number, mouseX: number, mouseY: number) => {
		const oldScale = scale.value;
		const ratio = 1 - newScale / oldScale;
		const xDiff = (mouseX - xOffset.value) * ratio;
		const yDiff = (mouseY - yOffset.value) * ratio;

		return { xDiff, yDiff };
	};

	// Dragging
	const onStartDrag = (event: PointerEvent) => {
		isDragging.value = true;
		xStart.value = event.clientX;
		yStart.value = event.clientY;

		window.addEventListener('pointermove', handleMove);

		window.addEventListener('pointerup', stopDrag);
	};

	const handleMove = (event: PointerEvent) => {
		if (content.value === undefined) return;

		const deltaX = event.clientX - xStart.value;
		const deltaY = event.clientY - yStart.value;

		xOffset.value += deltaX;
		yOffset.value += deltaY;

		xStart.value = event.clientX;
		yStart.value = event.clientY;
	};

	const stopDrag = () => {
		isDragging.value = false;
		window.removeEventListener('pointermove', handleMove);
		window.removeEventListener('pointerup', stopDrag);
	};

	return {
		scale,
		xOffset,
		yOffset,
		isDragging,
		onZoom,
		onStartDrag,
	};
};

export default useDragAndZoom;
