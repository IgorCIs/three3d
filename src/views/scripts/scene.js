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



// class MainScene {
//   constructor() {
//     this.sceneElement = document.getElementById('scene')
//     this.scene = new Scene()
//     this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//     this.renderer = new WebGLRenderer();
//     this.light = new PointLight( 0xff0000, 1, 100 );

//     this.appendScene()
//     this.appendLight()
//     this.appendObjects() 
//   }

//   appendObjects() {
//     const { scene } = this
    
//     scene.add(new Cube().cube)
//   }
  
//   appendLight() {
//     const { light, scene } = this
        
//     light.position.set( 50, 50, 50 )
//     scene.add(light)
//   }

//   appendScene() {
//     const { sceneElement, renderer} = this
//     console.log('??')
    
//     sceneElement.appendChild(renderer.domElement)
//     renderer.setSize(sceneElement.offsetWidth, sceneElement.offsetHeight);
//   }
// }