const parseInfo = info => {
	const output = {};
	for (const line of info.trim().split("\n")) {
		const split = /((h|s|.|)+) ([^ ]+) (.*)/.exec(line);
		output[split[3].replace(/_/g, " ")] = [split[1], split[4]];
	}
	return output;
};
export default parseInfo;
