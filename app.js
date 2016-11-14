document.addEventListener('DOMContentLoaded', () => {
	return fetch('data.json')
		.then(request => request.json())
		.then(main)
})

function main(data) {
	let state = null
	let index = 0

	const branch = () => data[state] || []
	const go = () => open(branch()[index])
	const home = () => open(data['HOME'][0])

	const increment = () => {
		if (index < (branch().length - 1)) {
			index++
			return true
		}

		return false
	}

	const decrement = () => {
		if (index > 0) {
			index--
			return true
		}
		return false
	}

	const next = () => {
		if (increment()) go()
	}

	const back = () => {
		if (decrement()) go()
	}

	const controls = [
		{id: 'btn_home', click: home},
		{id: 'btn_back', click: back},
		{id: 'btn_next', click: next},
	]

	controls.forEach(({id, click}) => {
		const elem = document.querySelector(`#${id}`)
		elem.addEventListener('click', click)
	})

	window.addEventListener('message', event => {
		state = event.data.id
		index = 0
		if (state) go()
	})

	home()
}

function open(state) {
	let container = document.querySelector('.state')
	container.innerHTML = `<iframe width="100%" height="100%" src="${state.url}"></iframe>`
}

