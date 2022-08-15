export const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

export const getMultipleRandomItem = (arr, n = 1) => {
	const newArr = [];
	const newArrID = [];

	for (let i = 0; i < n; i++) {
		const isObject = typeof arr[i] !== 'object';
		const filterStr = () => arr.filter((v) => !newArr.includes(v));
		const filterObject = () => arr.filter(({ id }) => !newArrID.includes(id));
		const filteredArr = isObject ? filterStr() : filterObject();
		const item = getRandomItem(filteredArr);
		newArr.push(item);
		newArrID.push(item.id);
	}

	return newArr;
};
