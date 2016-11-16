class Agent {
	//location
	//velocity
	//acceleration
	//float maxSpeed

	constructor(x, y, z, s) {
		this.location = new Vector(x, y, z)
		this.velocity = new Vector(0, 0, 0)
		this.acceleration = new Vector(0, 0, 0)
		this.damping = 0.95
		this.maxSpeed = s
	}

	update() {
		this.velocity.add(this.acceleration)
		this.velocity.mult(1-this.damping)
		this.velocity.limit(this.maxSpeed)
		this.location.add(this.velocity)
		this.acceleration.mult(0)
	}

	force(f) {
		this.acceleration.add(f)
	}

	seek(target) {
		//desired
		const steer = Vector.sub(target, this.location)
		steer.normalize()

		//steer
		steer.sub(this.velocity)

		return steer
	}

	flee(target){
		return this.seek(target).mult(-1)
	}

	connect(a) {
		return new Connection(this, a)
	}

	distanceTo(a) {
		return this.location.dist(a.location)
	}

	draw() {
		////fill(255, 255, 0)
		//fill(0)
		//noStroke()
		//pushMatrix()
		//translate(location.x, location.y)
		//ellipseMode(CENTER)
		//ellipse(0, 0, 4, 4)
		//popMatrix()
	}
}