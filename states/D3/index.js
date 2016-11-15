document.addEventListener('DOMContentLoaded', event => {
	var svg = d3
		.select('body')
		.append('svg')
		.attr('width', '100%')
		.attr('height', '100%')

	d3.json('data.json', (error, data) => {
		const items = svg
			.selectAll('.item')
			.data(data)
			.enter()
			.append('g')
			.attr('class', '.item')
			.attr('transform', (x, i) => `translate(0,${30 * i})`)

		//return d3.nest().key(function(d) {
		//	return d.status;
		//}).key(function(d) {
		//	return d.priority;
		//}).entries(data);

		const names = items
			.append('text')
			.text(x => x.name)

		const years = items
			.append('g')
			.attr('transform', 'translate(80, 0)')
			.selectAll('rect')
			.data(item => item.values)
			.enter()
			.append('rect')
			.attr('x', (x, i) => i * 50)
			.attr('y', 0)
			.attr('width', x => x.value)
			.attr('height', 2)

		//var p = d3
		//	.select('body')
		//	.selectAll('div')
		//	.data(data)
		//	.enter()
		//	.append('div')
		//	.text(x => x.name);
	})

////Make an SVG Container
//var svgContainer = d3
//	.select("body")
//	.append("svg")
//	.attr("width", 200)
//	.attr("height", 200)
//
//var rectangle = svgContainer

	//var circles = svgContainer.selectAll("circle")
	//	.data(jsonCircles)
	//	.enter()
	//	.append("circle");
})
