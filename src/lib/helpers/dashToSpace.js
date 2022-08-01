export const dashToSpace = (text) => {
	if (!text) return text;
	const removedDelimiter = text.replace(/-/g, ' ').replace(new RegExp('_'), "'");
	return removedDelimiter
		.split(' ')
		.map((t) => t.charAt(0).toUpperCase() + t.slice(1))
		.join(' ');
};
