import {
	API_KEY,
	APP_ID,
	AUTH_DOMAIN,
	BUCKET,
	MEASUREMENT_ID,
	MSG_SENDER_ID,
	PROJECT_ID
} from '$lib/env';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: BUCKET,
	messagingSenderId: MSG_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID
};

const app = initializeApp(config);
const authApp = getAuth(app);
const firestoreApp = getFirestore(app);

export { authApp, firestoreApp };
