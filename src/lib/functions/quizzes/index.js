import { getIdentificationQuiz } from './identification';

export const getQuizzes = () => {
	const identification = getIdentificationQuiz();
	const result = [...identification];
	return result;
};
