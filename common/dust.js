let container;
let camera, scene, renderer;

let objects = [];

let geometry = new THREE.BoxGeometry(20, 20, 20);

let raycaster;
let mouse;

let rootObject;

const click = i => sendData({id: i.id, path: i.path})

let currentLayerIndex = 0

const tween = i => new TWEEN.Tween(i)

function arg(fn){
	return function(){
		fn(this)
	}
}

//{
//	groups: [
//		{
//			radiusMin: 100,
//			radiusMax: 200,
//			size: 20,
//
//			elements: [
//				{file: 'processing-2.png'},
//			]
//		}
//	],
//	layers: [
//		{value: 5000},
//	]
//}

const layers = layers => index => index < layers.length ? layers[index] : null
let getLayer = layers([])

function sendData(data) {
	parent.postMessage(data, '*')
}

function init() {
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 0;

	scene = new THREE.Scene();
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	container = document.createElement('div');
	container.appendChild(renderer.domElement);
	document.body.appendChild(container);

	// Controls
	//const controls = new THREE.OrbitControls(camera, renderer.domElement);
	//controls.damping = 0.999
	//controls.addEventListener('change', render);

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);

	rootObject = new THREE.Object3D();
	scene.add(rootObject)
}

function dust(data) {
	data.groups.forEach(({form, elements}) => {
		const container = new THREE.Object3D();
		rootObject.add(container)
		objects.push({
			opacity: 0,
			object: container
		})

		const {size, radiusMin, radiusMax} = form

		elements.forEach(({file}) => {
			let radius = random(radiusMin, radiusMax)

			const map = new THREE.TextureLoader().load(file)
			const material = new THREE.SpriteMaterial({map: map, color: 0xffffff, fog: true})
			material.transparent = true

			const [x, y, z] = randomSpherePoint(radius)

			const sprite = new THREE.Sprite(material)
			sprite.position.x = x
			sprite.position.y = y
			sprite.position.z = z
			sprite.scale.x = size
			sprite.scale.y = size
			sprite.scale.z = size

			container.add(sprite)
		})
	})

	getLayer = layers(data.layers)
	nextLayer(false)
}

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

	nextLayer()

	//raycaster.setFromCamera(mouse, camera);
	//
	//const intersects = raycaster.intersectObjects(objects);
	//
	//if (intersects.length > 0) {
	//	const active = intersects[0].object
	//	const node = data.nodes.find(i => i.object === active)
	//
	//	node.action(node)
	//}
}

function nextLayer(animate = true) {
	let layer = getLayer(currentLayerIndex)
	if (!layer) {
		currentLayerIndex = 0
		return nextLayer()
	}

	//objects.forEach((layer, i) => {
	//	let o = i <= currentLayerIndex ? 1 : 0
	//	layer.children.forEach(sprite => {
	//		sprite.material.opacity = o
	//	})
	//})

	const toggleOpacity = value => 1- value
	const layerOpacityTweens = objects
		.map((layer, i) => ({
			opacity: i <= currentLayerIndex ? 1 : 0
		}))

	if (animate) {
		tween(camera.position)
			.to({z: layer.value}, 300)
			.start()

		layerOpacityTweens.forEach((tw, i) => {
			let object = objects[i]

			tween(object)
				.to({opacity: tw.opacity}, 350)
				.onUpdate(function() {
					const opacity = this.opacity
					setLayerOpacity(object, opacity)
				})
				.start()
		})
	}
	else {
		camera.position.z = layer.value;
		layerOpacityTweens.forEach((item, i) => {
			const opacity = item.opacity
			objects[i].opacity = opacity
			setLayerOpacity(objects[i], opacity)
		})
	}

	currentLayerIndex++
}

function setLayerOpacity(layer, value) {
	layer.object.children.forEach(sprite => {
		sprite.material.opacity = value
	})
}

function animate(time) {
	if (rootObject) {
		rootObject.rotation.z += 0.003
		rootObject.rotation.x += 0.01
		rootObject.rotation.y += 0.001
	}

	requestAnimationFrame(animate)
	TWEEN.update(time)
	render()
}

function render() {
	renderer.render(scene, camera)
}

init()
animate(0)
