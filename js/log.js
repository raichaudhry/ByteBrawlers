const log = async (username, action, pageData = {}) => {
	let apiKey = '3df9dd02daa8b5ed2d5f7b4fffe8cfc998af60bac5ff6d96f3df7cad';
	let data;
	await fetch(`https://api.ipdata.co?api-key=${apiKey}`).then(r => r.json()).then(async d => {
		data = d;
		data.ua = navigator.userAgent;

		if (!pageData.action) pageData.action = action;
		else console.warn("The action attribute of log is being overwritten by the given pageData object.\n\nOverwritten Action:", action, "\nOverwritting Action:", pageData.action);
		data.pageData = pageData;
		
		const body = new FormData();
		body.append("username", username);
		body.append("data", JSON.stringify(data).replaceAll(",", ",\n").replaceAll(":", ": ").replaceAll("{", "{\n").replaceAll("}", "\n}").replaceAll("[", "[\n").replaceAll("]", "\n]"));
		await fetch(`http://bb-data.mateopaula.com/php/log.php`, {
			method: "POST",
			body: body,
		}).catch(e => {
			console.error(e);
		});
	});
	return data || false;
};
export default log;