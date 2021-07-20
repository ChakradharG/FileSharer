fetch('files', { method: 'GET' })
	.then(response => response.json())
	.then(toHyperLinks);

function toHyperLinks(files) {
	files.forEach((file) => {
		let link = document.createElement('a');

		link.href = `/outgoing/${file}`;
		link.innerText = decodeURI(file);
		link.download = decodeURI(file);

		document.body.append(link);
	});
}
