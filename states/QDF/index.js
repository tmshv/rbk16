let data = {
	list: ['Размер', 'Форма', 'Микроклимат', 'Плотность', 'Деятельность', 'Архитектура', 'Улицы', 'Связность', 'Населенность', 'Дизайн'],
	opacity: [0.25, 1, 0.25, 1, 0.25, 1, 0.25, 0.25, 0.25, 1],
}

function sendData(data) {
	parent.postMessage(data, '*')
}

function main() {
	const o = i => data.opacity[i]
	const f = i => data.opacity[i] === 1 ? 'FONT BOLD' : 'FONT'

	document.querySelector('ul').innerHTML = data.list
		.map(item => item.toUpperCase())
		.map((item, i) => `<li style="opacity: ${o(i)}; font-family: ${f(i)}">${item}</li>`)
		.join('')
}

main();