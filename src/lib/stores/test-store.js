import { writable } from 'svelte/store';

export const mobile = writable(false);
export const quizzes = writable([]);
export const activeIndex = writable(0);
