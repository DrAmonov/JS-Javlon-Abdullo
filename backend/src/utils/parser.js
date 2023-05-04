const parser = (req) => {
	return new Promise((resolve, reject) => {
		try {
			req.on('data', (data) => {
				resolve(JSON.parse(data));
			});
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = parser;
