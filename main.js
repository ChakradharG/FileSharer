import express from 'express';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { lookup } from 'dns';
import { hostname } from 'os';
import qrcode from 'qrcode';

const PORT = 5050;
const app = express();
const __dirname = path.resolve();
app.use(express.static('public'));
app.use('/outgoing', express.static('outgoing'));


app.post('/upload', (req, res) => {
	const form = formidable.IncomingForm();
	form.parse(req, (err, _, files) => {
		try {
			if (err) throw err;
		
			for (let i in files) {
				let file = files[i];
				const oldPath = file.path;
				const newPath = path.join(__dirname, 'incoming', file.name);

				const data = fs.readFileSync(oldPath);
				fs.writeFileSync(newPath, data);
				fs.unlinkSync(oldPath);
			}

			res.status(200).send('<meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="./style.css"><h3>File(s) uploaded successfully</h3>');
		} catch (err) {
			console.log(err);
			res.status(500).send('<meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="./style.css"><h3>An error occured</h3><br><h3>Check the server for more details</h3>');
		}
	});
});

app.get('/files', (req, res) => {
	fs.readdir(path.join(__dirname, 'outgoing'), (err, files) => {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.status(200).send(JSON.stringify(files.filter((file) => file !== '.gitkeep').map(encodeURI)));	// Exclude .gitkeep
		}
	});
});

app.get('/upload', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

app.get('/download', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'download.html'));
});

(() => {
	return new Promise((resolve, reject) => {
		lookup(hostname(), (err, IP) => {
			err ? reject(err) : resolve(IP);
		});
	});
})().then((IP) => {
	console.log(`Listening on http://${IP}:${PORT}`);
	qrcode.toString(
		`http://${IP}:${PORT}`,
		{ type: 'terminal' },
		(err, qr) => console.log(qr)
	);
});

app.listen(PORT);
