const fs = require('fs');

class Io {
	constructor(dir) {
		this.dir = dir;
	}

	async read() {
		const data = await fs.promises.readFile(this.dir, 'utf8');

		return data ? JSON.parse(data) : [];
	}

	write(data) {
		fs.promises.writeFile(this.dir, JSON.stringify(data), 'utf8');

		return { success: true };
	}
}

module.exports = Io;
