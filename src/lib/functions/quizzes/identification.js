import { identification } from '$lib/bank-soal/identifikasi.json';
import { getMultipleRandomItem, getRandomItem } from '../random';

export const getIdentificationQuiz = (n, audio = false) => {
	const arr = getMultipleRandomItem(identification, n);
	const result = arr.map((item) => {
		const { letter, options, id } = item;
		if (!options) return;
		const modified = { id };
		const i = getRandomItem([0, 1]);

		modified.category = audio ? 'identifikasi-huruf-audio' : 'identifikasi-huruf';
		modified.letter = i > 0 ? letter.toUpperCase() : letter;
		modified.answerKey = modified.letter.toLowerCase();
		modified.options = i > 0 ? options[1] : options[0];
		return modified;
	});

	return result;
};
