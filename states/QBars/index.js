let data = {
	list: ['Размер', 'Форма', 'Микроклимат', 'Плотность', 'Деятельность', 'Архитектура', 'Улицы', 'Связность', 'Населенность', 'Дизайн'],
}

function sendData(data) {
	parent.postMessage(data, '*')
}

function main() {
	document.querySelector('ul').innerHTML = data.list
		.map(item => item.toUpperCase())
		.map(item => {
			return `<li>${item}</li>`
		})
		.join('')
}

main();