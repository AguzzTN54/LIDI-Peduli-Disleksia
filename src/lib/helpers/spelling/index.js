import { spells } from '$lib/data/global/spelling.json';
import { letters } from '$lib/data/materi/letters.json';
import { getMultipleRandomItem, getRandomItem } from '../random';

let spellWordList = [];
spells.forEach(({ category, list }) => {
	const x = list.map((val) => ({ item: val, category }));
	spellWordList = x;
});

const removeDuplicateLetter = (text) => {
	const tmp = [];
	text.split('').forEach((l) => {
		const isDuplicate = tmp.includes(l);
		if (isDuplicate) return;
		tmp.push(l);
	});
	return tmp.reverse();
};

const getLetterExluded = (textArr) => {
	const tmp = [];
	letters.forEach(({ letter }) => {
		const l = letter.toLowerCase();
		if (textArr.includes(l)) return;
		tmp.push(l);
	});
	return getMultipleRandomItem(tmp, 10 - textArr.length);
};

const getItem = () => {
	const { item, category } = getRandomItem(spellWordList);
	const filterDuplicateL = removeDuplicateLetter(item);
	const textExcluded = getLetterExluded(filterDuplicateL);
	const rand = [...filterDuplicateL, ...textExcluded].sort(() => Math.random() - 0.5);

	const data = { category, word: item, letterList: rand };
	return data;
};

export { spellWordList, getItem };
