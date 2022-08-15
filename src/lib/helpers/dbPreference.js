import { Preferences } from '@capacitor/preferences';

export const scoreDB = {
	_key() {
		return 'quizzes';
	},

	async set(scoreObj) {
		const { data } = await this.get();
		const addnew = { data: [...data, scoreObj] };
		await Preferences.set({
			key: this._key(),
			value: JSON.stringify(addnew)
		});
	},

	async get() {
		const { value } = await Preferences.get({ key: this._key() });
		return value ? JSON.parse(value) : { data: [] };
	},

	async clear() {
		await Preferences.remove({ key: this._key() });
	}
};
