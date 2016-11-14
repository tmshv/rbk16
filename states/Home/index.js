let container;
let camera, scene, renderer;

let objects = [];

let geometry = new THREE.BoxGeometry(20, 20, 20);

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
			action: click,
		},
		{
			id: 'S',
			file: 'S.png',
			action: click,
		},
		{
			id: 'SQ',
			file: 'SQ.png',
			action: click,
		},
		{
			id: 'SQSPB',
			file: 'SQSPB.png',
			action: click,
		}
	],

	links: [
		{
			from: 'Q',
			to: 'S',
			material: {color: 0x333343, linewidth: 2}
		},
		{
			from: 'S',
			to: 'SQ',
			material: {color: 0x333343, linewidth: 2}
		},
		{
			from: 'Q',
			to: 'SQ',
			material: {color: 0x333343, linewidth: 2}
		},
		{
			from: 'Q',
			to: 'SQSPB',
			material: {color: 0x333343, linewidth: 2}
		},
		{
			from: 'S',
			to: 'SQSPB',
			material: {color: 0x333343, linewidth: 2}
		},
		{
			from: 'SQ',
			to: 'SQSPB',
			material: {color: 0x333343, linewidth: 2}
		},
	]
}

function sendData(data) {
	parent.postMessage(data, '*')
}

function init() {
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 1000;

	scene = new THREE.Scene();
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x1c1f24);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	container = document.createElement('div');
	container.appendChild(renderer.domElement);
	document.body.appendChild(container);

	// Controls
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.damping = 0.999;
	controls.addEventListener('change', render);

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	initScene(createGeom(data))
}

function initScene(data) {
	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);

	const group = new THREE.Group();
	scene.add(group)
	mainObject = group

	data.nodes.forEach(node => {
		const map = new THREE.TextureLoader().load(node.file)
		const material = new THREE.SpriteMaterial({map: map, color: 0xffffff, fog: true})

		const [x, y, z] = node.coord

		const sprite = new THREE.Sprite(material)
		sprite.position.x = x
		sprite.position.y = y
		sprite.position.z = z
		sprite.scale.x = 150
		sprite.scale.y = 150
		sprite.scale.z = 150

		node.object = sprite
		group.add(sprite)
		objects.push(sprite)
	})

	data.links.forEach(link => {
		const Mat = link.type === 'dash' ? THREE.LineDashedMaterial : THREE.LineBasicMaterial

		const material = new Mat(link.material)

		const idIs = id => node => node.id === id
		const vector = ([x, y, z]) => new THREE.Vector3(x, y, z)

		const nodeFrom = data.nodes.find(idIs(link.from))
		const nodeTo = data.nodes.find(idIs(link.to))

		const iii = (v, [x1, y1, z1], [x2, y2, z2]) => [interpolate(x1, x2, v), interpolate(y1, y2, v), interpolate(z1, z2, v)]

		const r = 0.125
		const coordFrom = iii(r, nodeFrom.coord, nodeTo.coord)
		const coordTo = iii(1 - r, nodeFrom.coord, nodeTo.coord)

		const geometry = new THREE.Geometry()
		geometry.vertices.push(vector(coordFrom));
		geometry.vertices.push(vector(coordTo));
		geometry.computeLineDistances();

		const line = new THREE.Line(geometry, material);
		group.add(line);
	})

	function onDocumentTouchStart(event) {

		event.preventDefault();

		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;
		onDocumentMouseDown(event);

	}

	function onDocumentMouseDown(event) {
		event.preventDefault();

		mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
		mouse.y = -( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);

		const intersects = raycaster.intersectObjects(objects);

		if (intersects.length > 0) {
			const active = intersects[0].object
			const node = data.nodes.find(i => i.object === active)

			node.action(node)
		}
	}
}

function createGeom(data) {
	const coords = [];
	let angle = 0;
	const radius = 400;
	for (let i = 0; i < 3; i++) {
		const x = Math.cos(angle) * radius;
		const y = Math.sin(angle) * radius;
		const z = 0

		coords.push([x, y, z])
		angle += Math.PI * 2 / 3
	}

	coords.push([0, 0, 500])

	data.nodes.forEach((node, i) => {
		node.coord = coords[i]
	})
	return data;
}

function animate() {
	mainObject.rotation.x += 0.001
	mainObject.rotation.y += 0.0005

	requestAnimationFrame(animate);
	render();
}

function render() {
	renderer.render(scene, camera);
}

init();
animate();
