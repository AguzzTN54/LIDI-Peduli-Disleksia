import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const config = {
	apiKey: 'AIzaSyCPNTK9dwdVcdQDcCVB0XmXQdaFUYu7ZgI',
	authDomain: 'lidi-apps.firebaseapp.com',
	projectId: 'lidi-apps',
	storageBucket: 'lidi-apps.appspot.com',
	messagingSenderId: '676536242379',
	appId: '1:676536242379:web:e2a3880df18b1ab742cb4e',
	measurementId: 'G-T918KM7LRY'
};
const app = initializeApp(config);
const auth = getAuth(app);

export default auth;
