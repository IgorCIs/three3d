import v4 from 'uuid'
import { BoxGeometry, MeshBasicMaterial, SphereGeometry, DoubleSide, RingGeometry, Mesh } from 'three';
import { random } from './random';

class ObjectInterface {
  constructor() {
    this.matherial = new MeshBasicMaterial({color: 0x00ff00})
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

class Ring extends ObjectInterface {
  constructor(...props) {
    super(props)
      this.geometry = new RingGeometry( 1, 5, 32 );
      this.matherial = new MeshBasicMaterial( { color: 0xffff00, side: `DoubleSide` } );
      this.object = new Mesh( this.geometry, this.material );
  }
}

const objects = {
  'sphere': Sphere,
  'cube': Cube,
  'ring': Ring
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
    initedObject.object.position.set(random(1, 100), random(1, 100), 0)
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