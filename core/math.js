/**
 * Returns a random point of a sphere, evenly distributed over the sphere.
 * The sphere is centered at (x0,y0,z0) with the passed in radius.
 * The returned point is returned as a three element array [x, y, z].
 *
 * @param radius
 * @returns {*[]}
 */
function randomSpherePoint(radius) {
	const u = Math.random()
	const v = Math.random()
	const theta = 2 * Math.PI * u
	const phi = Math.acos(2 * v - 1)
	const x = (radius * Math.sin(phi) * Math.cos(theta))
	const y = (radius * Math.sin(phi) * Math.sin(theta))
	const z = (radius * Math.cos(phi))
	return [x, y, z]
}

/**
 *
 * @param a
 * @param b
 * @returns {number}
 */
function random(a, b) {
	return b ? a + (b - a) * Math.random() : Math.random() * a
}
