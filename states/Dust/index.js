let container;
let camera, scene, renderer;

let objects = [];

let geometry = new THREE.BoxGeometry(20, 20, 20);

let raycaster;
let mouse;

let mainObject;

const click = i => sendData({id: i.id, path: i.path})

const data = {
	nodes: [
		{
			id: '1',
			file: 'processing-2.png',
			path: '//prezi.com/embed/eoj4y8h75hko/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0&amp;landing_data=bHVZZmNaNDBIWnNjdEVENDRhZDFNZGNIUE43MHdLNWpsdFJLb2ZHanI5ejlFK1J1dEJqM2YrbExvR0ZqbldWd2N3PT0&amp;landing_sign=HUVjUZO66mutq4Dhv3xi62cXHlauPIWTpwsGvcMHJiA',
			action: click,
		},
		{
			id: '2',
			file: 'processing-2.png',
			path: '//prezi.com/embed/eoj4y8h75hko/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0&amp;landing_data=bHVZZmNaNDBIWnNjdEVENDRhZDFNZGNIUE43MHdLNWpsdFJLb2ZHanI5ejlFK1J1dEJqM2YrbExvR0ZqbldWd2N3PT0&amp;landing_sign=HUVjUZO66mutq4Dhv3xi62cXHlauPIWTpwsGvcMHJiA',
			action: click,
		},
		{
			id: '3',
			file: 'processing-2.png',
			path: '//prezi.com/embed/eoj4y8h75hko/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0&amp;landing_data=bHVZZmNaNDBIWnNjdEVENDRhZDFNZGNIUE43MHdLNWpsdFJLb2ZHanI5ejlFK1J1dEJqM2YrbExvR0ZqbldWd2N3PT0&amp;landing_sign=HUVjUZO66mutq4Dhv3xi62cXHlauPIWTpwsGvcMHJiA',
			action: click,
		},
		{
			id: '4',
			file: 'processing-2.png',
			path: '//prezi.com/embed/eoj4y8h75hko/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0&amp;landing_data=bHVZZmNaNDBIWnNjdEVENDRhZDFNZGNIUE43MHdLNWpsdFJLb2ZHanI5ejlFK1J1dEJqM2YrbExvR0ZqbldWd2N3PT0&amp;landing_sign=HUVjUZO66mutq4Dhv3xi62cXHlauPIWTpwsGvcMHJiA',
			action: click,
		}
	],

	links: [
		{
			from: '1',
			to: '2',
			material: {color: 0x666666, dashSize: 3, scale: 1}
		},
		{
			from: '2',
			to: '3',
			material: {color: 0x666666, dashSize: 3, scale: 1, linewidth: 1}
		},
		{
			from: '1',
			to: '3',
			material: {color: 0x666666}
		},
		{
			from: '1',
			to: '4',
			material: {color: 0x666666, dashSize: 3, scale: 1}
		},
		{
			from: '2',
			to: '4',
			material: {color: 0x666666, dashSize: 3, scale: 1}
		},
		{
			from: '3',
			to: '4',
			material: {color: 0x666666, dashSize: 3, scale: 1}
		},
	]
}

function sendData(data) {
	parent.postMessage(data, '*')
}

function init() {
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 1000;

	scene = new THREE.Scene();
	scene.add(camera);
	//scene.add(new THREE.AmbientLight(0xf0f0f0));

	//var light = new THREE.SpotLight(0xffffff, 1.5);
	//light.position.set(0, 1500, 200);
	//light.castShadow = true;
	//light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(70, 1, 200, 2000));
	//light.shadow.bias = -0.000222;
	//light.shadow.mapSize.width = 1024;
	//light.shadow.mapSize.height = 1024;
	//scene.add(light);
	//spotlight = light;

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x1c1f24);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	//renderer.shadowMap.enabled = true;

	container = document.createElement('div');
	container.appendChild(renderer.domElement);
	document.body.appendChild(container);

	// Controls
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.damping = 0.999002;
	controls.addEventListener('change', render);

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	initScene(data)
}

function initScene(data) {
	//document.addEventListener('mousedown', onDocumentMouseDown, false);
	//document.addEventListener('touchstart', onDocumentTouchStart, false);

	const group = new THREE.Group();
	scene.add(group)
	mainObject = group

	let n = 5
	for (let i = 0; i < 5; i++) {
		let radius = 300
		const map = new THREE.TextureLoader().load('processing-2.png')
		const material = new THREE.SpriteMaterial({map: map, color: 0xffffff, fog: true})

		//const angle = Math.random() * 2 * Math.PI
		const angle = 2 * Math.PI / n * i
		const angle2 = Math.random() * 2 * Math.PI
		const x = Math.cos(angle) * radius
		const y = Math.sin(angle) * radius
		const z = Math.cos(angle2) * radius

		const sprite = new THREE.Sprite(material)
		sprite.position.x = x
		sprite.position.y = y
		sprite.position.z = z
		sprite.scale.x = 100
		sprite.scale.y = 100
		sprite.scale.z = 100

		group.add(sprite)
		objects.push(sprite)
	}

	for (let i = 0; i < 50; i++) {
		const map = new THREE.TextureLoader().load('processing-2.png')
		const material = new THREE.SpriteMaterial({map: map, color: 0xffffff, fog: true})

		const radius = 50 + Math.random() * 100
		const angle = Math.random() * 2 * Math.PI
		const angle2 = Math.random() * 2 * Math.PI
		const x = Math.cos(angle) * radius
		const y = Math.sin(angle) * radius
		const z = Math.cos(angle2) * radius

		const sprite = new THREE.Sprite(material)
		sprite.position.x = x
		sprite.position.y = y
		sprite.position.z = z
		sprite.scale.x = 20
		sprite.scale.y = 20
		sprite.scale.z = 20

		group.add(sprite)
		objects.push(sprite)
	}

	//data.connections.forEach(link => {
	//	const Mat = link.type === 'dash' ? THREE.LineDashedMaterial : THREE.LineBasicMaterial
	//
	//	const material = new Mat(link.material)
	//
	//	const idIs = id => node => node.id === id
	//	const vector = ([x, y, z]) => new THREE.Vector3(x, y, z)
	//
	//	const nodeFrom = data.nodes.find(idIs(link.from))
	//	const nodeTo = data.nodes.find(idIs(link.to))
	//
	//	const geometry = new THREE.Geometry()
	//	geometry.vertices.push(vector(nodeFrom.coord));
	//	geometry.vertices.push(vector(nodeTo.coord));
	//	geometry.computeLineDistances();
	//
	//	const line = new THREE.Line(geometry, material);
	//	group.add(line);
	//})
	//
	//function onDocumentTouchStart(event) {
	//
	//	event.preventDefault();
	//
	//	event.clientX = event.touches[0].clientX;
	//	event.clientY = event.touches[0].clientY;
	//	onDocumentMouseDown(event);
	//
	//}
	//
	//function onDocumentMouseDown(event) {
	//	event.preventDefault();
	//
	//	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	//	mouse.y = -( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	//
	//	raycaster.setFromCamera(mouse, camera);
	//
	//	const intersects = raycaster.intersectObjects(interactiveObjects);
	//
	//	if (intersects.length > 0) {
	//		const active = intersects[0].object
	//		const node = data.nodes.find(i => i.object === active)
	//
	//		node.action(node)
	//	}
	//}
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
	mainObject.rotation.z += 0.003
	mainObject.rotation.x += 0.01
	mainObject.rotation.y += 0.001

	requestAnimationFrame(animate);
	render();
}

function render() {
	renderer.render(scene, camera);
}

init();
animate();
