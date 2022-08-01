import { writable } from 'svelte/store';

export const quizzes = writable([]);
export const activeIndex = writable(0);
export const testScore = writable({});
