import {
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signInAnonymously
} from 'firebase/auth';
import auth from './app';

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
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.email;
		// The AuthCredential type that was used.
		const credential = GoogleAuthProvider.credentialFromError(error);

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
	console.log('sign out success');
};

const checkAuth = () =>
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			console.log('logged in', user);
			console.log(auth.currentUser);
		} else {
			// User is signed out
			// ...
			console.log('signed out');
		}
	});
export { signinWithGoogle, signInAnonym, signupWithEmail, signinWithEmail, checkAuth, signout };
