import { getIdentificationQuiz } from './identification';

export const getQuizzes = () => {
	const identification = getIdentificationQuiz(5);
	const identificationAudio = getIdentificationQuiz(5, true);
	const result = [...identification, ...identificationAudio];
	return result;
};
