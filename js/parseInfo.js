const parseInfo = (info) => {
	const output = {};
	for (const line of info.split("\n")) {
		const split = line.split(/[^ ]+ .+/);
		output[split[0]] = split[1];
	}
	return output;
}
export default parseInfo;