import { data } from 'autoprefixer';
import { collection, addDoc, getDocs, getDoc, doc, query, where, setDoc } from 'firebase/firestore';
import { firestoreApp as db } from './app';

const firestore = {
	async add({ name = null, uid = null, born = 0 }) {
		try {
			if (!arguments) throw new Error('Argument for add function is required');
			const docRef = await addDoc(collection(db, 'users'), { name, uid, born });
			console.log('Document written with ID: ', docRef.id);
			return docRef;
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	},

	// eslint-disable-next-line no-unused-vars
	async set(uid, { name = null, born = 0, score = 0, newUser = false }) {
		try {
			const data = arguments[1];
			const usersRef = collection(db, 'users');
			await setDoc(doc(usersRef, uid), { ...data }, { merge: true });
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	},

	async getAll() {
		const querySnapshot = await getDocs(collection(db, 'users'));
		querySnapshot.forEach((doc) => {
			console.log(doc.id, doc.data());
		});
	},

	async getByUid(uid) {
		try {
			if (!uid) return;
			const ref = await doc(db, 'users', uid);
			const docSnap = await getDoc(ref);

			if (docSnap.exists()) {
				return { status: 'success', data: docSnap.data() };
			} else {
				console.log('No such document!');
				return { status: 'success', data: null };
			}
		} catch (e) {
			console.error(e);
			return { status: 'failed', data: null };
		}
	},

	async query(key, operator, value) {
		try {
			const ref = query(collection(db, 'users'), where(key, operator, value));
			const querySnapshot = await getDocs(ref);
			const size = querySnapshot.size;

			if (querySnapshot.empty) return { status: 'success', msg: 'No Data', size };

			const docs = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				data.id = doc.id;
				docs.push(data);
			});
			return { status: 'success', msg: 'success', size, data };
		} catch (e) {
			console.error(e);
			return { status: 'failed', msg: 'Failed to get Data', size: 0 };
		}
	}
};

const isUserAlreadyFillData = async (uid) => {
	const { data } = await firestore.getByUid(uid);
	return data !== null;
};

export default firestore;
export { isUserAlreadyFillData };
