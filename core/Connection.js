class Connection {
	constructor(a, b) {
		this.a = a
		this.b = b
	}

	update() {
		const v = -2
		this.steer(this.a, this.b, v)
		this.steer(this.b, this.a, v)
	}

	steer(a, b, s) {
		const v = a.seek(b.location)
		v.limit(s)
		a.force(v)
	}
}
