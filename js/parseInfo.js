const parseInfo = (info) => {
	const output = {};
	for (const line of info.trim().split("\n")) {
		const split = /([^ ]+) (.+)/.exec(line);
		output[split[1]] = split[2];
	}
	return output;
}
export default parseInfo;