let container;
let camera, scene, renderer;

let objects = [];

let geometry = new THREE.BoxGeometry(20, 20, 20);

let raycaster;
let mouse;

let mainObject;

const click = i => sendData({id: i.id, path: i.path})

const data = {
	tags: [
		{file: 'АРХИТЕКТУРА.png', size:[512, 64]},
		{file: 'ДЕЯТЕЛЬНОСТЬ.png', size:[512, 64]},
		{file: 'ДИЗАЙН.png', size:[256,128]},
		{file: 'МИКРОКЛИМАТ.png', size:[512, 64]},
		{file: 'НАСЕЛЕННОСТЬ.png', size:[512, 64]},
		{file: 'ПЛОТНОСТЬ.png', size:[256, 64]},
		{file: 'РАЗМЕР.png', size:[256, 64]},
		{file: 'СВЯЗНОСТЬ.png', size:[256, 64]},
		{file: 'УЛИЦЫ.png', size:[256, 64]},
		{file: 'ФОРМА.png', size:[256, 64]}
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

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x1c1f24);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

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
	const group = new THREE.Group();
	scene.add(group)
	mainObject = group

	let n = 5
	//for (let i = 0; i < 5; i++) {
	//	let radius = 300
	//	const map = new THREE.TextureLoader().load('processing-2.png')
	//	const material = new THREE.SpriteMaterial({map: map, color: 0xffffff, fog: true})
	//
	//	//const angle = Math.random() * 2 * Math.PI
	//	const angle = 2 * Math.PI / n * i
	//	const angle2 = Math.random() * 2 * Math.PI
	//	const x = Math.cos(angle) * radius
	//	const y = Math.sin(angle) * radius
	//	const z = Math.cos(angle2) * radius
	//
	//	const sprite = new THREE.Sprite(material)
	//	sprite.position.x = x
	//	sprite.position.y = y
	//	sprite.position.z = z
	//	sprite.scale.x = 100
	//	sprite.scale.y = 100
	//	sprite.scale.z = 100
	//
	//	group.add(sprite)
	//	interactiveObjects.push(sprite)
	//}

	data.tags.forEach(tag => {
		const map = new THREE.TextureLoader().load(tag.file)
		const material = new THREE.SpriteMaterial({map: map, color: 0xffffff, fog: true})

		const radius = 100 + Math.random() * 200
		const angle = Math.random() * 2 * Math.PI
		const angle2 = Math.random() * 2 * Math.PI
		const x = Math.cos(angle) * radius
		const y = Math.sin(angle) * radius
		const z = Math.cos(angle2) * radius

		const [sx, sy] = tag.size
		const scale = 2

		const sprite = new THREE.Sprite(material)
		sprite.position.x = x
		sprite.position.y = y
		sprite.position.z = z
		sprite.scale.x = sx * scale
		sprite.scale.y = sy * scale

		group.add(sprite)
		objects.push(sprite)
	})
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
