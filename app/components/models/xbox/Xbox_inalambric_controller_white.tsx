/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 -t -T -o Xbox .\xbox_inalambric_controller_white.glb
Author: DogexorRexUwU (https://sketchfab.com/oscar.lopez.riviello)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/xbox-inalambric-controller-white-f18a70fc10414ef5a39b55de68f12823
Title: Xbox Inalambric Controller (White)
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_5: THREE.Mesh
  }
  materials: {
    material: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/xbox_inalambric_controller_white-transformed.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_5.geometry} material={materials.material} position={[0, -0.25, 0.29]} rotation={[0, -Math.PI / 2, 0]} scale={0.05} />
    </group>
  )
}

useGLTF.preload('/xbox_inalambric_controller_white-transformed.glb')
