<script>
	import { activeIndex, quizzes } from '$lib/stores/test-store';
	import { setContext } from 'svelte';
	import IdentifikasiHuruf from './quiz-items/identifikasi-huruf.svelte';

	$: quiz = $quizzes[$activeIndex];
	$: questionNumber = $activeIndex + 1;

	const select = (l) => {
		quizzes.update((arr) => {
			return arr.map((d) => {
				if (d.letter !== quiz.letter) return d;
				d.answered = true;
				d.answer = l;
				return d;
			});
		});
	};

	setContext('selectAnswer', select);
</script>

{#if !!quiz}
	{#if quiz.category === 'identifikasi-huruf'}
		<IdentifikasiHuruf {...quiz} {questionNumber} />
	{:else if quiz.category === 'identifikasi-huruf-audio'}
		<IdentifikasiHuruf {...quiz} {questionNumber} audio />
	{/if}
{/if}
