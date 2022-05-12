import { getIdentificationQuiz } from './identification';

export const getQuizzes = () => {
	const identification = getIdentificationQuiz(5);
	const result = [...identification];
	return result;
};
