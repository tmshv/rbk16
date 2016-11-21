class Vector {
	constructor(x, y, z) {
		this.x = x
		this.y = y
		this.z = z
	}

	set(x, y, z) {
		this.x = x
		this.y = y
		this.z = z
		return this
	}

	copy() {
		return new Vector(this.x, this.y, this.z)
	}

	mag() {
		return Math.sqrt(this.magSq())
	}

	magSq() {
		return (this.x * this.x + this.y * this.y + this.z * this.z)
	}

	add(v) {
		this.x += v.x
		this.y += v.y
		this.z += v.z
		return this
	}

	sub(v) {
		this.x -= v.x
		this.y -= v.y
		this.z -= v.z
		return this
	}

	mult(n) {
		this.x *= n
		this.y *= n
		this.z *= n
		return this
	}

	div(n) {
		this.x /= n
		this.y /= n
		this.z /= n
		return this
	}

	dist(v) {
		const dx = this.x - v.x
		const dy = this.y - v.y
		const dz = this.z - v.z
		return Math.sqrt(dx * dx + dy * dy + dz * dz)
	}

	dot(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z
	}

	cross(v) {
		const crossX = this.y * v.z - v.y * this.z
		const crossY = this.z * v.x - v.z * this.x
		const crossZ = this.x * v.y - v.x * this.y

		return new Vector(crossX, crossY, crossZ)
	}

	normalize() {
		const m = this.mag()
		if (m != 0 && m != 1) this.div(m)
		return this
	}

	limit(max) {
		if (this.magSq() > max * max) {
			this.normalize()
			this.mult(max)
		}
		return this
	}

	setMag(len) {
		this.normalize()
		this.mult(len)
		return this
	}

///**
// * ( begin auto-generated from PVector_rotate.xml )
// *
// * Rotate the vector by an angle (only 2D vectors), magnitude remains the same
// *
// * ( end auto-generated )
// *
// * @webref pvector:method
// * @usage web_application
// * @brief Rotate the vector by an angle (2D only)
// * @param theta the angle of rotation
// */
//public PVector rotate(float theta) {
//	float temp = x
//	// Might need to check for rounding errors like with angleBetween function?
//	x = x*PApplet.cos(theta) - y*PApplet.sin(theta)
//	y = temp*PApplet.sin(theta) + y*PApplet.cos(theta)
//	return this
//}
//
//
///**
// * ( begin auto-generated from PVector_rotate.xml )
// *
// * Linear interpolate the vector to another vector
// *
// * ( end auto-generated )
// *
// * @webref pvector:method
// * @usage web_application
// * @brief Linear interpolate the vector to another vector
// * @param v the vector to lerp to
// * @param amt  The amount of interpolation some value between 0.0 (old vector) and 1.0 (new vector). 0.1 is very near the old vector 0.5 is halfway in between.
// * @see PApplet#lerp(float, float, float)
// */
//public PVector lerp(PVector v, float amt) {
//	x = PApplet.lerp(x, v.x, amt)
//	y = PApplet.lerp(y, v.y, amt)
//	z = PApplet.lerp(z, v.z, amt)
//	return this
//}
//
//
///**
// * Linear interpolate between two vectors (returns a new PVector object)
// * @param v1 the vector to start from
// * @param v2 the vector to lerp to
// */
//public static PVector lerp(PVector v1, PVector v2, float amt) {
//	PVector v = v1.copy()
//	v.lerp(v2, amt)
//	return v
//}
//
//
///**
// * Linear interpolate the vector to x,y,z values
// * @param x the x component to lerp to
// * @param y the y component to lerp to
// * @param z the z component to lerp to
// */
//public PVector lerp(float x, float y, float z, float amt) {
//	this.x = PApplet.lerp(this.x, x, amt)
//	this.y = PApplet.lerp(this.y, y, amt)
//	this.z = PApplet.lerp(this.z, z, amt)
//	return this
//}
//
//
///**
// * ( begin auto-generated from PVector_angleBetween.xml )
// *
// * Calculates and returns the angle (in radians) between two vectors.
// *
// * ( end auto-generated )
// *
// * @webref pvector:method
// * @usage web_application
// * @param v1 the x, y, and z components of a PVector
// * @param v2 the x, y, and z components of a PVector
// * @brief Calculate and return the angle between two vectors
// */
//static public float angleBetween(PVector v1, PVector v2) {
//
//	// We get NaN if we pass in a zero vector which can cause problems
//	// Zero seems like a reasonable angle between a (0,0,0) vector and something else
//	if (v1.x == 0 && v1.y == 0 && v1.z == 0 ) return 0.0f
//	if (v2.x == 0 && v2.y == 0 && v2.z == 0 ) return 0.0f
//
//	double dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
//	double v1mag = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z)
//	double v2mag = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z)
//	// This should be a number between -1 and 1, since it's "normalized"
//	double amt = dot / (v1mag * v2mag)
//	// But if it's not due to rounding error, then we need to fix it
//	// http://code.google.com/p/processing/issues/detail?id=340
//	// Otherwise if outside the range, acos() will return NaN
//	// http://www.cppreference.com/wiki/c/math/acos
//	if (amt <= -1) {
//		return PConstants.PI
//	} else if (amt >= 1) {
//		// http://code.google.com/p/processing/issues/detail?id=435
//		return 0
//	}
//	return (float) Math.acos(amt)
//}

	toString() {
		return `{${this.x}, ${this.y}, ${this.z}}`
	}

//@Override
//public boolean equals(Object obj) {
//	if (!(obj instanceof PVector)) {
//		return false
//	}
//	final PVector p = (PVector) obj
//	return x == p.x && y == p.y && z == p.z
//}
}

Vector.sub = (v1, v2) => new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z)
Vector.fromAngle = a => new Vector(Math.cos(a), Math.sin(a), 0)
