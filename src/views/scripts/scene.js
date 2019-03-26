import { Scene, AmbientLight, HemisphereLight, PerspectiveCamera,  WebGLRenderer, PointLight } from 'three'
import { ObjectAdder } from './objects';
import OrbitControlls from 'three-orbitcontrols'

const sceneElement = document.getElementById('scene')
const MainScene = new Scene()

new ObjectAdder(MainScene)

const camera = new PerspectiveCamera(75, sceneElement.offsetWidth / sceneElement.offsetHeight , 0.1, 1000 );
const renderer = new WebGLRenderer()
camera.position.set(0, 0, 100)

renderer.setPixelRatio( window.devicePixelRatio )
const light = new PointLight(0xffffff, 1, 10900, 2)

const ambientLight = new AmbientLight( '#EEEEEE' )

const controlls = new OrbitControlls(camera, sceneElement)
const hemiLight = new HemisphereLight( 0x0000ff, 0x00ff00, 0.6 ); 
MainScene.add(ambientLight, hemiLight)


light.position.set(50, 50, 50)
MainScene.add(light)

sceneElement.appendChild(renderer.domElement)
renderer.setSize(sceneElement.offsetWidth, sceneElement.offsetHeight);

const render = () => {
  requestAnimationFrame(render)
  controlls.update()
  renderer.render(MainScene, camera)
}

render()

