// Common Props
export interface Vector3 {
    x: number
    y: number
    z: number
}

export type Vector3Name = 'position' | 'rotation' | 'scaling'

export interface Shape {
    id: number
    type: string
    name: string
    position: Vector3
    rotation?: Vector3
    scaling?: Vector3
}

export interface BoxShape extends Shape {
    type: 'box'
 
    wrap?: boolean
    height?: number
    width?: number
    depth?: number
    size?: number
}

export interface SphereShape extends Shape {
    type: 'sphere'
    diameter?: number
    diameterX?: number
    diameterY?: number
    diameterZ?: number
    segments?: number
    arc?: number
    slice?: number
    updatable?: boolean
    sideOrientation?: number
}

export type AllShapes = BoxShape | SphereShape
// export interface Jar {
//     orientation: number
//     mesh: InteractiveMesh
// }

// export interface Tile {
//     face: number
//     slot: number
//     mesh: InteractiveMesh
// }

// export interface InteractiveMesh extends BABYLON.Mesh {
//     onPointerPick?: (pointerInfo: BABYLON.PointerInfo) => void
// }

// export interface MeshOpts {
//     baseColor?: BABYLON.Color4
//     rippleColor?: BABYLON.Color4
//     frozen?: boolean
// }