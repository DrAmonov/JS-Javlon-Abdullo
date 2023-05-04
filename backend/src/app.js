const http = require('http');

const Io = require('./utils/io');
const Users = new Io('./db/users.json');
const User = require('./models/user');
const parser = require('./utils/parser');

const server = http.createServer(async (req, res) => {
	res.setHeader('Content-Type', 'aplication/json');
	if (req.url === '/auth/login' && req.method === 'POST') {
		req.body = await parser(req);
		const { username, password } = req.body;

		const users = await Users.read();
		console.log(users);
		const findUser = users.find(
			(user) => user.username === username && user.password === password
		);

		if (!findUser) {
			res.writeHead(403);
			return res.end(JSON.stringify({ message: 'User not found' }));
		}

		res.writeHead(200);
		res.end(JSON.stringify({ token: findUser.id }));
	} else if (req.url === '/auth/register' && req.method === 'POST') {
		req.body = await parser(req);
		const { username, password } = req.body;

		const users = await Users.read();
		const findUser = users.find((user) => user.username === username);

		if (findUser) {
			res.writeHead(403);
			return res.end(JSON.stringify({ message: 'User already exists' }));
		}

		const id = (users[users.length - 1]?.id || 0) + 1;

		const newUser = new User(id, username, password);
		const data = users.length ? [...users, newUser] : [newUser];
		Users.write(data);

		res.writeHead(201);
		res.end(JSON.stringify({ success: 'true' }));
	}
});

server.listen(8080);
