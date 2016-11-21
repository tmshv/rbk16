class Agent {
	constructor(x, y, z, s) {
		this.location = new Vector(x, y, z)
		this.velocity = new Vector(0, 0, 0)
		this.acceleration = new Vector(0, 0, 0)
		this.damping = 0.95
		this.maxSpeed = s
	}

	update() {
		this.velocity.add(this.acceleration)
		this.velocity.mult(this.damping)
		this.velocity.limit(this.maxSpeed)
		this.location.add(this.velocity)
		this.acceleration.mult(0)
	}

	force(f) {
		this.acceleration.add(f)
	}

	seek(target) {
		return Vector.sub(target, this.location);
		////desired
		//const steer = Vector.sub(target, this.location)
		//steer.normalize()
		//
		////steer
		//steer.sub(this.velocity)
		//
		//return steer
	}

	flee(target){
		const vector = this.seek(target)
		return vector.mult(-1)
	}

	connect(a) {
		return new Connection(this, a)
	}

	distanceTo(a) {
		return this.location.dist(a.location)
	}
}