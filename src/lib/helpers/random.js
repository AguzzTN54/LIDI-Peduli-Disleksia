export const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

export const getMultipleRandomItem = (arr, n) => {
	const newArr = [];
	const newArrID = [];

	for (let i = 0; i < n; i++) {
		const filteredArr = arr.filter(({ id }) => !newArrID.includes(id));
		const item = getRandomItem(filteredArr);
		newArr.push(item);
		newArrID.push(item.id);
	}

	return newArr;
};
