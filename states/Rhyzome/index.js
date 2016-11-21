const repulsion = 500000
const mass = 1
const k = 1
const damping = 0.0125;//.05
const springLength = 300
const velocityLimit = 10
const size = 50

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

const click = i => sendData({id: i.id})
const interpolate = (m, n, v) => m + (n - m) * v

const data = {
	nodes: [
		{
			id: 'Q',
			file: 'Q.png',
			size: 150
		},
		{
			id: 'S',
			file: 'S.png',
			size: 150
		},
		{
			id: 'SQ',
			file: 'SQ.png',
			size: 150
		},
		{
			id: 'SQSPB',
			file: 'SQSPB.png',
			size: 150
		},

		{
			id: 'QHello',
			file: 'Q.png',
		},
		{
			id: 'Q9',
			file: 'Q.png',
		},
		{
			id: 'QBars',
			file: 'Q.png',
		},
		{
			id: 'QDF',
			file: 'Q.png',
		},
		{
			id: 'QMS',
			file: 'Q.png',
		},
		{
			id: 'QEnd',
			file: 'Q.png',
		},

		{
			id: 'SHello',
			file: 'S.png',
		},
		{
			id: 'SUndstndr',
			file: 'S.png',
		},
		{
			id: 'S2',
			file: 'S.png',
		},

		{
			id: "SQSPBHello",
			file: "SQSPB.png"
		},
		{
			id: "SQSPBMap",
			file: "SQSPB.png"
		},
		{
			id: "SQSPBP",
			file: "SQSPB.png"
		},
		{
			id: "SQSPBPYellow",
			file: "SQSPB.png"
		},
		{
			id: "SQSPBPhone",
			file: "SQSPB.png"
		},
		{
			id: "SQSPBPRed",
			file: "SQSPB.png"
		},
		{
			id: "SQSPBEnd",
			file: "SQSPB.png"
		},

		{
			id: "SQF",
			file: "SQ.png"
		},

		{
			id: "SQFHello",
			file: "SQ.png"
		},

		{
			id: "SQF1",
			file: "SQ.png"
		},

		{
			id: "SQF2",
			file: "SQ.png"
		},

		{
			id: "SQI",
			file: "SQ.png"
		},

		{
			id: "SQIHello",
			file: "SQ.png"
		},

		{
			id: "SQI1",
			file: "SQ.png"
		},

		{
			id: "SQI2",
			file: "SQ.png"
		},

		{
			id: "SQI3",
			file: "SQ.png"
		},

		{
			id: "SQC",
			file: "SQ.png"
		},

		{
			id: "SQCHello",
			file: "SQ.png"
		},

		{
			id: "SQC1",
			file: "SQ.png"
		},

		{
			id: "SQC2",
			file: "SQ.png"
		},

		{
			id: "SQCGifs",
			file: "SQ.png"
		},

	],

	links: [
		{
			from: 'Q',
			to: 'S',
			k: 5
		},
		{
			from: 'S',
			to: 'SQ'
		},
		{
			from: 'Q',
			to: 'SQ'
		},
		{
			from: 'Q',
			to: 'SQSPB',
			k: 5
		},
		{
			from: 'S',
			to: 'SQSPB'
		},
		{
			from: 'SQ',
			to: 'SQSPB',
			k: 5
		},

		{
			from: 'Q',
			to: 'QHello',
			length: 100,
			k: 15
		},
		{
			from: 'QHello',
			to: 'Q9',
			length: 3,
			k: 15
		},
		{
			from: 'Q9',
			to: 'QBars',
			length: 3,
			k: 15
		},
		{
			from: 'QBars',
			to: 'QDF',
			length: 3,
			k: 15
		},
		{
			from: 'QDF',
			to: 'QMS',
			length: 3,
			k: 15
		},
		{
			from: 'QMS',
			to: 'QEnd',
			length: 3,
			k: 15
		},

		{
			from: 'S',
			to: 'SHello',
			length: 100,
			k: 15
		},
		{
			from: 'SHello',
			to: 'SUndstndr',
			length: 3,
			k: 15
		},
		{
			from: 'SUndstndr',
			to: 'S2',
			length: 3,
			k: 15
		},

		{
			from: "SQSPB",
			to: "SQSPBHello",
			length: 100,
			k: 15
		},
		{
			from: "SQSPBHello",
			to: "SQSPBMap",
			length: 3,
			k: 15
		},
		{
			from: "SQSPBMap",
			to: "SQSPBP",
			length: 3,
			k: 15
		},
		{
			from: "SQSPBP",
			to: "SQSPBPYellow",
			length: 3,
			k: 15
		},
		{
			from: "SQSPBPYellow",
			to: "SQSPBPhone",
			length: 3,
			k: 15
		},
		{
			from: "SQSPBPhone",
			to: "SQSPBPRed",
			length: 3,
			k: 15
		},
		{
			from: "SQSPBPRed",
			to: "SQSPBEnd",
			length: 3,
			k: 15
		},

		{
			from: "SQ",
			to: "SQF",
			length: 100,
			k: 15
		},

		{
			from: "SQF",
			to: "SQFHello",
			length: 3,
			k: 15
		},

		{
			from: "SQFHello",
			to: "SQF1",
			length: 3,
			k: 15
		},

		{
			from: "SQF1",
			to: "SQF2",
			length: 3,
			k: 15
		},

		{
			from: "SQF2",
			to: "SQI",
			length: 3,
			k: 15
		},

		{
			from: "SQI",
			to: "SQIHello",
			length: 3,
			k: 15
		},

		{
			from: "SQIHello",
			to: "SQI1",
			length: 3,
			k: 15
		},

		{
			from: "SQI1",
			to: "SQI2",
			length: 3,
			k: 15
		},

		{
			from: "SQI2",
			to: "SQI3",
			length: 3,
			k: 15
		},

		{
			from: "SQI3",
			to: "SQC",
			length: 3,
			k: 15
		},

		{
			from: "SQC",
			to: "SQCHello",
			length: 3,
			k: 15
		},

		{
			from: "SQCHello",
			to: "SQC1",
			length: 3,
			k: 15
		},

		{
			from: "SQC1",
			to: "SQC2",
			length: 3,
			k: 15
		},

		{
			from: "SQC2",
			to: "SQCGifs",
			length: 3,
			k: 15
		},

		//{
		//	from: "QEnd",
		//	to: "SQCGifs",
		//	length: 100,
		//	k: 15
		//},
		//
		//{
		//	from: "S2",
		//	to: "SQSPBEnd",
		//	length: 100,
		//	k: 15
		//},
	]
}

function sendData(data) {
	parent.postMessage(data, '*')
}

function init() {
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000)
	camera.position.z = 2500

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

	window.addEventListener('resize', onWindowResize, false);

	main(data)
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function main(data) {
	const group = new THREE.Group()
	scene.add(group)
	mainObject = group

	data.nodes.forEach((node, i) => {
		const d = randomSpherePoint(50)
		//const d = [-500 + i * 1000, 0, 0]

		const agent = new Agent(...d, velocityLimit)
		agent.mass = mass
		agent.damping = damping

		const map = new THREE.TextureLoader().load(node.file)
		const material = new THREE.SpriteMaterial({map: map, color: 0xffffff, fog: true})

		const s = node.size || size
		const sprite = new THREE.Sprite(material)
		//sprite.position.x = x
		//sprite.position.y = y
		//sprite.position.z = z
		sprite.scale.x = s
		sprite.scale.y = s
		sprite.scale.z = s

		node.object = sprite
		node.agent = agent
		agent.object = sprite

		agents.push(agent)
		group.add(sprite)
		interactiveObjects.push(sprite)
	})

	data.links.forEach(link => {
		const idIs = id => node => node.id === id
		const from = data.nodes.find(idIs(link.from))
		const to = data.nodes.find(idIs(link.to))

		const connection = new Connection(from.agent, to.agent)
		connection.length = link.length || springLength
		connection.k = link.k || k
		connections.push(connection)

		const material = new THREE.LineBasicMaterial({color: 0xcccccc, linewidth: 1})
		const vector = ([x, y, z]) => new THREE.Vector3(x, y, z)
		//connection.fromVector = vector([0, 0, 0])
		//connection.toVector = vector([0, 0, 0])
		const geometry = new THREE.Geometry()
		geometry.dynamic = true
		//geometry.vertices.push(link.fromVector)
		//geometry.vertices.push(link.toVector)

		geometry.vertices.push(from.object.position)
		geometry.vertices.push(to.object.position)
		geometry.computeLineDistances()
		const line = new THREE.Line(geometry, material)
		connection.line = line
		group.add(line)
	})
}

function simulateRhyzome() {
	applyCouloumbsLaw(repulsion, agents)
	applyHooksLaw(connections)

	agents.forEach(a => {
		a.update()

		a.object.position.x = a.location.x
		a.object.position.y = a.location.y
		a.object.position.z = a.location.z
	})
}

function applyCouloumbsLaw(repulsion, agents) {
	for (let a of agents) {
		for (let b of agents) {
			if (a != b) {
				let d = a.location.dist(b.location)
				if (d === 0) d = 0.0000001

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

function applyHooksLaw(connections) {
	for (let c of connections) {
		let f = c.a.seek(c.b.location)
		const displacement = c.length - c.a.distanceTo(c.b)
		f.normalize()
		f.mult(c.k * displacement)

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
	mainObject.rotation.x += 0.01
	mainObject.rotation.y += 0.0005

	simulateRhyzome()

	//console.log(calcKineticEnergy(agents))
	//agents.map(a => a.location)
	//	.map(v => v.toString())
	//	.map(console.log)

	connections
		.map(link =>link.line.geometry)
		.forEach(geometry => {
			geometry.verticesNeedUpdate = true
			//geometry.computeLineDistances()
		})


	requestAnimationFrame(animate)
	render()
}

function render() {
	renderer.render(scene, camera)
}

init()
animate()
