import { writable } from 'svelte/store';

const userOBJ = { name: '', photoURL: '', uid: '', email: '', isAnonymous: false };
export const user = writable(userOBJ);
export const mobile = writable(false);
