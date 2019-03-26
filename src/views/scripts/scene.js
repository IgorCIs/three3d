import { Scene, AmbientLight, PerspectiveCamera, SphereGeometry, MeshBasicMaterial, Mesh, WebGLRenderer, PointLight } from 'three'
import { Cube, ObjectAdder } from './objects';

const sceneElement = document.getElementById('scene')
const MainScene = new Scene()

new ObjectAdder(MainScene)

const camera = new PerspectiveCamera(75, sceneElement.offsetWidth / sceneElement.offsetHeight , 0.1, 1000 );
const renderer = new WebGLRenderer()
camera.position.set(0, 0, 100)

renderer.setPixelRatio( window.devicePixelRatio )
const light = new PointLight(0xffffff, 1, 10900, 2)

const ambientLight = new AmbientLight( '#EEEEEE' )

MainScene.add(ambientLight)


light.position.set(50, 50, 50)
MainScene.add(light)

sceneElement.appendChild(renderer.domElement)
renderer.setSize(sceneElement.offsetWidth, sceneElement.offsetHeight);

// MainScene.add(new Cube().cube)

const render = () => {
  requestAnimationFrame(render)
  renderer.render(MainScene, camera)
}

render()

