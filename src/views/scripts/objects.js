import v4 from 'uuid'
import { BoxGeometry, MeshBasicMaterial, MeshNormalMaterial, CylinderGeometry, SphereGeometry, DoubleSide, RingGeometry, Mesh } from 'three';
import { random } from './random';

class ObjectInterface {
  constructor() {
    this.matherial = new MeshNormalMaterial()
    this.scale = scale
  }
}

class Cube extends ObjectInterface {
  constructor(...props) {
    super(props)
    this.geometry = new BoxGeometry(20, 20, 20)
    this.object = new Mesh(this.geometry, this.matherial)
  }
}

class Sphere extends ObjectInterface {
  constructor(...props) {
    super(props)
    this.geometry = new SphereGeometry( 5, 32, 32 );
    this.object = new Mesh(this.geometry, this.matherial)
  }
}


class Pyramide extends ObjectInterface {
  constructor(...props) {
    super(props)
    this.geometry = new CylinderGeometry(0, 4, 5, 4, 1)
    this.object = new Mesh(this.geometry, this.material)
  }
}

const objects = {
  'sphere': Sphere,
  'cube': Cube,
  'pyramide': Pyramide
}

class ObjectAdder {
  constructor(scene) {
    this.form = document.querySelector('.header')
    this.select = this.form.querySelector('select')
    this.input = this.form.querySelector('input')
    this.scene = scene 

    this.form.querySelector('button').addEventListener('click', () => {
      this.appendObject(this.select.value, this.input.value || 1)
    })
  }

  appendObject(object, scale) {
    const { scene } = this

    const initedObject = new objects[object]
    initedObject.object.name = v4()
    console.log(scene)
    initedObject.object.position.set(random(-120, 120), random(-60, 60), 0)
    initedObject.object.scale.set(scale, scale, scale)

    scene.add(initedObject.object)
    new DeleteElement(initedObject.object.name, scene)
  }
}

class DeleteElement {
  constructor(name, scene) {
    this.id = name
    this.scene = scene

    this.initDivs()
  }

  initDivs() {
    this.form = document.querySelector('.items')
    this.container = document.createElement('div')
    const name = document.createElement('div')
    name.innerHTML = this.id
    const del = document.createElement('div')
    del.innerHTML = 'x'
    this.container.appendChild(del)
    this.container.appendChild(name)
    this.form.appendChild(this.container)

    del.addEventListener('click', () => this.delObj())
  }

  delObj() {
    const { scene } = this

    const selectedObject = scene.getObjectByName(this.id)
    scene.remove(selectedObject)
    console.log(selectedObject)

    console.log(this.container)
    this.form.removeChild(this.container)
  }
}

export {
  Cube,
  ObjectAdder
}