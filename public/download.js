fetch('files', { method: 'GET' })
	.then(response => response.json())
	.then(toHyperLinks);

function toHyperLinks(response) {
	if (typeof response[Symbol.iterator] === 'function'){	// If the response is iterable (array of files)
		response.forEach((file) => {
			let link = document.createElement('a');

			link.href = `/outgoing/${file}`;
			link.innerText = decodeURI(file);
			link.download = decodeURI(file);

			document.body.append(link);
		});
	} else {
		document.body.innerHTML = '<h3 class="message">An error occured</h3>';
	}
}
