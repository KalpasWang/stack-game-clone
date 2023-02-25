import * as THREE from 'three';

import PlaneMaterial from '../Materials/Plane';
import Resources from '../Resources';

export default class Materials {
  resources: Resources;
  items: {
    matcap?: {
      [key: string]: THREE.MeshMatcapMaterial;
    };
    shader?: {
      [key: string]: THREE.ShaderMaterial;
      // plane?: THREE.ShaderMaterial;
    };
  };
  constructor(_option: { resources: Resources }) {
    this.resources = _option.resources;
    this.items = {};

    this.setMaterials();
  }

  setMaterials() {
    const { matcapRed, matcapGold } = this.resources.items;

    this.items.matcap = {};
    this.items.matcap.red = new THREE.MeshMatcapMaterial({ matcap: matcapRed });
    this.items.matcap.gold = new THREE.MeshMatcapMaterial({ matcap: matcapGold });

    this.items.shader = {};
    this.items.shader.plane = PlaneMaterial();
  }
}
