import { browser } from '$app/env';

let voiceEN;
let voiceID;
let synth;

const initspeechSynthesis = () => {
	synth = window.speechSynthesis;
	speechSynthesis.addEventListener('voiceschanged', populateVoice);
	populateVoice();
};

const populateVoice = () => {
	voiceEN = synth.getVoices().find(({ lang }) => lang === 'en-US');
	voiceID = synth.getVoices().find(({ lang }) => lang === 'id-ID');
};

if (browser) initspeechSynthesis();

export const speak = (text) => {
	return new Promise((resolve, reject) => {
		if (synth.speaking) {
			return;
		}

		if (text !== '') {
			const utterThis = new SpeechSynthesisUtterance(text);

			utterThis.addEventListener('end', () => {
				console.log('Audio end');
				resolve();
			});

			utterThis.addEventListener('error', () => {
				console.error('Audio Error');
				reject();
			});

			const txtToSpeak = typeof text === 'string' ? text.toLocaleLowerCase() : text;

			utterThis.voice = ['l', 'f'].includes(txtToSpeak) ? voiceEN : voiceID;
			utterThis.pitch = 1;
			utterThis.rate = 0.6;
			synth.speak(utterThis);
		}
	});
};
