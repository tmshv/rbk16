const repulsion = 1000
const mass = 1
const k = 1
const damping = .8975
const springLength = 10

let container
let camera, scene, renderer

let interactiveObjects = []

const agents = []
const connections = []

let geometry

let backDots = new THREE.Geometry();
let backLines;
let backMaxRadius = 500
let backMaxRadiusSq = backMaxRadius * backMaxRadius
let backMinRadius = 200
let backMinRadiusSq = backMinRadius * backMinRadius

let raycaster;
let mouse;

let mainObject;

const random = (a, b) => b ? a + (b - a) * Math.random() : Math.random() * a
const click = i => sendData({id: i.id})
const interpolate = (m, n, v) => m + (n - m) * v

const data = {
	nodes: [
		{
			id: 'ROOT',
			file: 'processing-2.png',
		},
		{
			id: 'Q',
			file: 'Q.png',
		},
		{
			id: 'S',
			file: 'S.png',
		},
		{
			id: 'SQ',
			file: 'SQ.png',
		},
		{
			id: 'SQSPB',
			file: 'SQSPB.png',
		}
	],

	links: [
		{
			from: 'ROOT',
			to: 'Q'
		},
		{
			from: 'Q',
			to: 'S'
		},
		////{
		//	from: 'S',
		//	to: 'SQ'
		//},
		//{
		//	from: 'Q',
		//	to: 'SQ'
		//},
		//{
		//	from: 'Q',
		//	to: 'SQSPB'
		//},
		//{
		//	from: 'S',
		//	to: 'SQSPB'
		//},
		//{
		//	from: 'SQ',
		//	to: 'SQSPB'
		//},
	]
}

function sendData(data) {
	parent.postMessage(data, '*')
}

function init() {
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000)
	camera.position.z = 1500

	scene = new THREE.Scene()
	scene.add(camera)

	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)

	container = document.createElement('div')
	container.appendChild(renderer.domElement)
	document.body.appendChild(container)

	// Controls
	const controls = new THREE.OrbitControls(camera, renderer.domElement)
	controls.damping = 0.999
	controls.addEventListener('change', render)

	raycaster = new THREE.Raycaster()
	mouse = new THREE.Vector2()

	main(data)
}

function main(data) {
	const group = new THREE.Group()
	scene.add(group)
	mainObject = group

	data.nodes.forEach(node => {
		const d = randomSpherePoint(50)
		const agent = new Agent(...d, 5)
		agent.mass = mass
		agent.damping = damping

		const map = new THREE.TextureLoader().load(node.file)
		const material = new THREE.SpriteMaterial({map: map, color: 0xffffff, fog: true})

		const sprite = new THREE.Sprite(material)
		//sprite.position.x = x
		//sprite.position.y = y
		//sprite.position.z = z
		sprite.scale.x = 50
		sprite.scale.y = 50
		sprite.scale.z = 50

		node.object = sprite
		node.agent = agent
		agent.object = sprite

		agents.push(agent)
		group.add(sprite)
		interactiveObjects.push(sprite)
	})

	data.links.forEach(link => {
		const idIs = id => node => node.id === id
		const nodeFrom = data.nodes.find(idIs(link.from))
		const nodeTo = data.nodes.find(idIs(link.to))

		const connection = new Connection(nodeFrom.agent, nodeTo.agent)
		connection.length = springLength
		connection.k = k

		//	const material = new THREE.LineBasicMaterial({color: 0, linewidth: 2})
		//
		//	const vector = ([x, y, z]) => new THREE.Vector3(x, y, z)
		//
		//	connection.fromVector = vector([0,0,0])
		//	connection.toVector = vector([0,0,0])
		//
		//	const geometry = new THREE.Geometry()
		//	geometry.vertices.push(link.fromVector)
		//	geometry.vertices.push(link.toVector)
		//	geometry.computeLineDistances()
		//
		//	const line = new THREE.Line(geometry, material)
		//
		//	connection.line = line
		connections.push(connection)

		//	group.add(line)
	})
}

function simulateRhyzome() {
	applyCouloumbsLaw(repulsion, agents)
	applyHooksLaw(k, connections)

	agents.forEach(a => {
		a.update()

		a.object.position.x = a.location.x
		a.object.position.y = a.location.y
		a.object.position.z = a.location.z
	})

	//const iii = (v, [x1, y1, z1], [x2, y2, z2]) => [interpolate(x1, x2, v), interpolate(y1, y2, v), interpolate(z1, z2, v)]
	//
	//const r = 0.125
	//const coordFrom = iii(r, nodeFrom.coord, nodeTo.coord)
	//const coordTo = iii(1 - r, nodeFrom.coord, nodeTo.coord)
}

function applyCouloumbsLaw(repulsion, agents) {
	for (let a of agents) {
		for (let b of agents) {
			if (a != b) {
				let d = a.location.dist(b.location)
				if (d == 0) d = 0.001

				let f = a.flee(b.location)
				f.normalize()
				f.mult(repulsion)
				f.div(d * d)

				a.force(f)
				f.mult(-1)
				b.force(f)
			}
		}
	}
}

function applyHooksLaw(k, connections) {
	for (let c of connections) {
		let f = c.a.seek(c.b.location)
		const displacement = c.length - f.mag()
		f.normalize()
		f.mult(k * displacement)

		c.b.force(f)
		f.mult(-1)
		c.a.force(f)
	}
}

function calcKineticEnergy(agents) {
	let total = 0
	for (let a of agents) {
		const s = a.velocity.mag()
		total += 0.5 * a.mass * s * s
	}
	return total
}

function animate() {
	//mainObject.rotation.x += 0.001
	//mainObject.rotation.y += 0.0005

	simulateRhyzome()

	console.log(calcKineticEnergy(agents))

	requestAnimationFrame(animate)
	render()
}

function render() {
	renderer.render(scene, camera)
}

init()
animate()

/*
 Returns a random point of a sphere, evenly distributed over the sphere.
 The sphere is centered at (x0,y0,z0) with the passed in radius.
 The returned point is returned as a three element array [x,y,z].
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
