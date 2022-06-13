export const checkAnswer = (quizzes) => {
	const skor = {};
	quizzes.forEach(({ category, userAnswer, answerKey }) => {
		const isAnswerTrue = answerKey === userAnswer.toLowerCase();

		skor[category] = skor[category] || { trueAnswer: 0, total: 0 };
		const { trueAnswer, total } = skor[category];

		skor[category].trueAnswer = isAnswerTrue ? trueAnswer + 1 : trueAnswer;
		skor[category].total = total + 1;
	});
	return skor;
};
