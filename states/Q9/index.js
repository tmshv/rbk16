let data = {
	list: ['Размер', 'Форма', 'Микроклимат', 'Плотность', 'Деятельность', 'Архитектура', 'Улицы', 'Связность', 'Населенность', 'Дизайн'],
	items: [
		{image: '1.jpg', values: [0.25, 1, 1, 0.25, 0.25, 1, 1, 1, 0.25, 1]},
		{image: '2.jpg', values: [0.25, 1, 1, 0.25, 0.25, 1, 1, 1, 0.25, 1]},
		{image: '3.jpg', values: [1, 1, 0.25, 1, 1, 1, 1, 1, 0.25, 1]},
		{image: '4.jpg', values: [0.25, 1, 1, 0.25, 0.25, 1, 1, 1, 0.25, 1]},
		{image: '5.jpg', values: [1, 1, 1, 0.25, 0.25, 1, 0.25, 0.25, 0.25, 1]},
		{image: '6.jpg', values: [0.25, 1, 1, 0.25, 0.25, 1, 1, 1, 0.25, 1]},
		{image: '7.jpg', values: [0.25, 1, 0.25, 0.25, 0.25, 1, 1, 1, 0.25, 1]},
		{image: '8.jpg', values: [0.25, 1, 1, 0.25, 0.25, 1, 0.25, 0.25, 0.25, 1]},
		{image: '9.jpg', values: [0.25, 1, 1, 0.25, 0.25, 1, 1, 1, 0.25, 1]},
	]
}

function sendData(data) {
	parent.postMessage(data, '*')
}

function main() {
	document.querySelector('.images').innerHTML = data.items
		.map(item => {
			const img = item.image
			return `<div class="images__item"><img src="${img}" alt=""></div>`
		})
		.join('')

	document.querySelector('ul').innerHTML = data.list
		.map(item => item.toUpperCase())
		.map(item => {
			return `<li>${item}</li>`
		})
		.join('')

	const images = [...document.querySelectorAll('.images__item')]
	images.forEach((img, i) => {
		img.addEventListener('mouseover', update.bind(null, i))
	})
}

function update(i){
	const elements = [...document.querySelectorAll('li')]
	const selected = data.items[i]

	elements.forEach((li, i) => {
		li.style.opacity = selected.values[i]
	})
}

main();
update(0)