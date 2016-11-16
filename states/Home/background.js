(function () {
	const agents = [];

	const random = v => Math.random() * v

	for (let i = 0; i < 100; i++) {
		const s = 1;//random(5);
		const a = new Agent(random(width), random(height), s);
		agents.push(a);
	}

	function draw() {
		const links = []

		const update = i => i.update()

		const width = 100;
		const height = 100

		const r = 50;//mmx(10, 100);
		for (let a of agents) {
			for (let b of agents) {
				if (a != b && a.distanceTo(b) < r) {
					links.add(a.connect(b));
				}
			}
		}

		agents.filter(a => a.location.x < 0 || a.location.x > width || a.location.y < 0 || a.location.y > height)
			.forEach(a => {
				let center = new Vector(width / 2, height / 2);
				center = a.seek(center);
				a.force(center);
			})

		links.forEach(update)
		agents.forEach(update)
	}

	//float mmx(float a, float b){
	//	return map(mouseX, 0, width, a, b);
	//}
}())