export const calculateColor = (percentage) => {
	const hue = percentage * 120;
	return `color: hsl(${hue}, 100%, 45%);`;
};

export const congratulateTxt = (avg) => {
	if (avg === 100) return 'Perfect';
	if (avg > 90) return 'Fantastic';
	if (avg > 80) return 'Sangat Bagus';
	if (avg > 70) return 'Bagus';
	if (avg > 60) return 'Rata-Rata';
	if (avg > 50) return 'Cukup';
	if (avg > 30) return 'Kurang';
	if (avg > 10) return 'Sangat Kurang';
	return 'Butuh Perhatian Khusus';
};

export const saranTxt = (avg) => {
	if (avg === 100) {
		return 'Skor sempurna, Sebagai orangtua, anda tidak perlu khawatir terhadap kemampuan literasi anak anda';
	}
	if (avg > 90) return 'Hebat, Pertahankan kemampuan yang sudah dimiliki';
	if (avg > 80) {
		return 'Kemampuan literasi sudah sangat bagus, namun masih dapat ditingkatkan agar lebih baik';
	}
	if (avg > 70) {
		return 'Kemampuan di atas rata-rata, namun tetap memerlukan latihan agar kemampuan terus meningkat';
	}
	if (avg > 60) {
		return 'Latihan rutin adalah hal yang bisa dilakukan untuk meningkatkan kemampuan literasi';
	}
	if (avg > 50) {
		return 'Kemampuan cukup untuk memahami literasi di lingkungan sehari hari, namun disarankan untk tetap melakukan latihan untuk meningkatkan kemampuan';
	}
	if (avg > 30) return 'Diperlukan latihan untuk meningkatkan kemampuan literasi';
	if (avg > 10) {
		return 'Kemampuan literasi masih sangat kurang, disarankan untuk mengatur jadwal belajar dan latihan secara rutin';
	}
	return 'Kemampuan jauh di bawah rata-rata, perlu pendampingan khusus dalam proses belajar.';
};
