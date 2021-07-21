const form = document.forms[0];
let index = 0;
const addBtn = document.querySelector('#add');


form.addEventListener('submit', () => {
	let elemIndex = 0;
	while (elemIndex < form.elements.length) {
		let elem = form.elements[elemIndex];

		if (elem.type === 'file' && elem.value === '') {	// Remove inputs with no files
			elem.parentElement.remove();
			continue;
		}

		elemIndex++;
	}
});

function addFile() {
	let container = document.createElement('div');
	container.classList = 'container fl';

	let fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.name = `file_${++index}`;	// Incrementing name by 1 (file_0 -> file_1)
	container.append(fileInput);

	let delButton = document.createElement('button');
	delButton.type = 'button';
	delButton.onclick = () => { container.remove() };
	delButton.innerHTML = '&#10799;';
	delButton.className = 'x';
	container.append(delButton);

	addBtn.parentElement.before(container);
}
