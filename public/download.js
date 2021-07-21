fetch('files', { method: 'GET' })
	.then(async (response) => {
		if (response.ok) toHyperLinks(await response.json());
		else document.body.innerHTML = '<h3>An error occured</h3><br><h3>Check the server for more details</h3>';
	});

function toHyperLinks(files) {
	if (files.length === 0) {
		document.body.innerHTML = '<h3>No files to download</h3>';
		return;
	}
	files.forEach((file) => {
		let link = document.createElement('a');

		link.href = `/outgoing/${file}`;
		link.innerText = decodeURI(file);
		link.download = decodeURI(file);

		document.body.append(link);
	});
}
