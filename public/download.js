let files;

fetch('files', { method: 'GET' }).then(response => response.json()).then(printAsLink);

function printAsLink(files) {
	files.forEach(file => {
		let link = document.createElement('a');
		link.href = `/outgoing/${file}`;
		link.innerText = decodeURI(file);
		document.body.append(link);
	});
}