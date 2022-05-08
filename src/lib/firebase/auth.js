import {
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInAnonymously
} from 'firebase/auth';
import { authApp as auth } from './app';

const provider = new GoogleAuthProvider();
const signinWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		// This gives you a Google Access Token. You can use it to access the Google API.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential.accessToken;
		// The signed-in user info.
		const user = result.user;

		console.log(user, token);
		return { status: 'success', user };
	} catch (error) {
		// Handle Errors here.
		console.log(error);
		return { status: 'failed', error };
	}
};

const signupWithEmail = async (email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		console.log(userCredential, user);
		return { status: 'success', user };
	} catch (error) {
		const codeMsg = error.code.split('/')[1];
		return { status: 'failed', codeMsg };
	}
};

const signinWithEmail = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		console.log(userCredential);
		return { status: 'success', userCredential };
	} catch (error) {
		const codeMsg = error.code.split('/')[1];
		return { status: 'failed', codeMsg };
	}
};

const signInAnonym = async () => {
	try {
		const userCredential = await signInAnonymously(auth);
		console.log(userCredential);
		return { status: 'success', userCredential };
	} catch (error) {
		const codeMsg = error.code.split('/')[1];
		return { status: 'failed', codeMsg };
	}
};

const signout = async () => {
	await signOut(auth);
};

export { signinWithGoogle, signInAnonym, signupWithEmail, signinWithEmail, signout };
