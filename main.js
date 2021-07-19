import express from 'express';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { lookup } from 'dns';
import { hostname } from 'os';

const PORT = 5050;
const app = express();
const __dirname = path.resolve();
app.use(express.static('public'));


app.post('/', (req, res) => {
	const form = formidable.IncomingForm();
	try {
		form.parse(req, (err, _, files) => {
			if (err) throw err;

			for (let i in files) {
				let file = files[i];
				const oldPath = file.path;
				const newPath = path.join(__dirname, 'incoming', file.name);

				fs.readFile(oldPath, (err, data) => {	// Read the file from temporary folder
					if (err) throw err;

					fs.writeFile(newPath, data, (err) => {	// Write the file to the desired folder
						if (err) throw err;
					});

					fs.unlink(oldPath, (err) => {	// Delete the file from temporary folder
						if (err) throw err;
					});
				});
			}
		});

		res.send('File(s) uploaded successfully');
	} catch(error) {
		console.log(error);
		res.send(error);
	}
});

(() => {
	return new Promise((resolve, reject) => {
		lookup(hostname(), (err, IP) => {
			err ? reject(err) : resolve(IP);
		});
	});
})().then((IP) => console.log(`Listening on http://${IP}:${PORT}`));

app.listen(PORT);