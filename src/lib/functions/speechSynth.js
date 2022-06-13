const synth = window.speechSynthesis;

let voiceEN;
let voiceID;

const populateVoice = () => {
	voiceEN = synth.getVoices().find(({ lang }) => lang === 'en-US');
	voiceID = synth.getVoices().find(({ lang }) => lang === 'id-ID');
};
populateVoice();
speechSynthesis.addEventListener('voiceschanged', populateVoice);

export const speak = (text) => {
	if (synth.speaking) {
		console.error('speechSynthesis.speaking');
		return;
	}

	if (text !== '') {
		const utterThis = new SpeechSynthesisUtterance(text);

		utterThis.addEventListener('end', () => {
			console.log('Audio end');
		});

		utterThis.addEventListener('error', () => {
			console.error('Audio Error');
		});

		utterThis.voice = text.toLowerCase() === 'l' ? voiceEN : voiceID;
		utterThis.pitch = 1;
		utterThis.rate = 0.6;
		synth.speak(utterThis);
	}
};
