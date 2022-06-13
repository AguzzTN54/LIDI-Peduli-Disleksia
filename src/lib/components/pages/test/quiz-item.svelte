<script>
	import { activeIndex, quizzes } from '$lib/stores/test-store';
	import { setContext } from 'svelte';
	import IdentifikasiHuruf from './quiz-items/identifikasi-huruf.svelte';

	$: quiz = $quizzes[$activeIndex];
	$: questionNumber = $activeIndex + 1;

	const select = (l) => {
		quizzes.update((arr) => {
			arr[$activeIndex].answered = true;
			arr[$activeIndex].userAnswer = l;
			return arr;
		});
	};

	setContext('selectAnswer', select);
</script>

{#if !!quiz}
	{#if quiz.category === 'mengidentifikasi-huruf'}
		<IdentifikasiHuruf {...quiz} {questionNumber} />
	{:else if quiz.category === 'mengidentifikasi-huruf-dari-audio'}
		<IdentifikasiHuruf {...quiz} {questionNumber} audio />
	{/if}
{/if}
