import * as THREE from 'three';

export default class Torus {
  material: any;
  debug: any;
  scene: THREE.Object3D<THREE.Event>;
  debugFolder: any;
  constructor(_option: { material: any; debug: any }) {
    this.material = _option.material;
    this.debug = _option.debug;

    this.scene = new THREE.Object3D();
    this.scene.matrixAutoUpdate = false;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder('torus');
      this.debugFolder.open();
    }

    this.setTorus();
  }

  setTorus() {
    const geometry = new THREE.TorusGeometry(0.25, 0.08, 32, 100);
    const material = this.material.items.matcap.gold;
    const mesh = new THREE.Mesh(geometry, material);

    this.scene.add(mesh);

    this.scene.position.set(0, 0.2, 0);
    this.scene.rotation.y = 0.6;
    this.scene.updateMatrix();

    if (this.debug) {
      this.debugFolder.add(mesh, 'visible').name('visible');
      this.debugFolder
        .add(mesh.rotation, 'y')
        .step(0.001)
        .min(-Math.PI)
        .max(Math.PI)
        .name('rotateY');
    }
  }
}
